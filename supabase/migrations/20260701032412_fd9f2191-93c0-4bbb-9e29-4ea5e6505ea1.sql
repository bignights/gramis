
-- Move has_role to a non-exposed schema so it can't be called via the Data API
CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

REVOKE EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- Recreate policies to reference the private function
DROP POLICY IF EXISTS "Admins read all signups" ON public.waitlist_signups;
DROP POLICY IF EXISTS "Admins update signups" ON public.waitlist_signups;

CREATE POLICY "Admins read all signups" ON public.waitlist_signups
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update signups" ON public.waitlist_signups
  FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

-- Drop the exposed public.has_role now that policies no longer need it
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- Make INSERT/UPDATE/DELETE intent explicit on waitlist_signups.
-- All writes flow through the SECURITY DEFINER public.join_waitlist RPC,
-- which runs as the function owner and bypasses these grants/policies.
-- Direct table writes from anon/authenticated must be denied.
REVOKE INSERT, DELETE ON public.waitlist_signups FROM authenticated;

-- Explicit deny policies to make intent unambiguous for the scanner and readers.
CREATE POLICY "Deny direct inserts" ON public.waitlist_signups
  FOR INSERT TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "Deny direct deletes" ON public.waitlist_signups
  FOR DELETE TO anon, authenticated
  USING (false);
