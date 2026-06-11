
-- Tier enum
CREATE TYPE public.waitlist_tier AS ENUM ('founder', 'priority', 'early_adopter');

-- Role enum
CREATE TYPE public.app_role AS ENUM ('admin');

-- Waitlist signups
CREATE TABLE public.waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  tier public.waitlist_tier NOT NULL,
  source_button text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX waitlist_signups_tier_idx ON public.waitlist_signups(tier);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.waitlist_signups TO authenticated;
GRANT ALL ON public.waitlist_signups TO service_role;
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- User roles
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- has_role security definer
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Policies
CREATE POLICY "Users see their own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins read all signups" ON public.waitlist_signups FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update signups" ON public.waitlist_signups FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
