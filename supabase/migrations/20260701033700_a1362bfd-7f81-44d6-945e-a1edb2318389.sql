-- Create tier enum if missing
DO $$ BEGIN
  CREATE TYPE public.waitlist_tier AS ENUM ('founder','priority','early_adopter');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- get_waitlist_stats: public RPC returning counts per tier
CREATE OR REPLACE FUNCTION public.get_waitlist_stats()
RETURNS TABLE(founder bigint, priority bigint, early_adopter bigint, total bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    COUNT(*) FILTER (WHERE tier = 'founder')::bigint,
    COUNT(*) FILTER (WHERE tier = 'priority')::bigint,
    COUNT(*) FILTER (WHERE tier = 'early_adopter')::bigint,
    COUNT(*)::bigint
  FROM public.waitlist_signups;
$$;

REVOKE ALL ON FUNCTION public.get_waitlist_stats() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_waitlist_stats() TO anon, authenticated, service_role;

-- join_waitlist: assigns tier based on caps; bypasses RLS via SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.join_waitlist(p_email text, p_source_button text)
RETURNS TABLE(status text, tier public.waitlist_tier)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_email text := lower(trim(p_email));
  v_founder_count bigint;
  v_priority_count bigint;
  v_early_count bigint;
  v_tier public.waitlist_tier;
  v_existing public.waitlist_tier;
BEGIN
  IF v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'Invalid email';
  END IF;

  SELECT ws.tier INTO v_existing FROM public.waitlist_signups ws WHERE ws.email = v_email LIMIT 1;
  IF v_existing IS NOT NULL THEN
    RETURN QUERY SELECT 'already_joined'::text, v_existing;
    RETURN;
  END IF;

  SELECT
    COUNT(*) FILTER (WHERE ws.tier = 'founder'),
    COUNT(*) FILTER (WHERE ws.tier = 'priority'),
    COUNT(*) FILTER (WHERE ws.tier = 'early_adopter')
  INTO v_founder_count, v_priority_count, v_early_count
  FROM public.waitlist_signups ws;

  IF v_founder_count < 69 THEN
    v_tier := 'founder';
  ELSIF v_priority_count < 300 THEN
    v_tier := 'priority';
  ELSIF v_early_count < 1000 THEN
    v_tier := 'early_adopter';
  ELSE
    RETURN QUERY SELECT 'closed'::text, NULL::public.waitlist_tier;
    RETURN;
  END IF;

  INSERT INTO public.waitlist_signups (email, tier, source_button)
  VALUES (v_email, v_tier, COALESCE(p_source_button, 'hero'));

  RETURN QUERY SELECT 'ok'::text, v_tier;
END;
$$;

REVOKE ALL ON FUNCTION public.join_waitlist(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.join_waitlist(text, text) TO anon, authenticated, service_role;