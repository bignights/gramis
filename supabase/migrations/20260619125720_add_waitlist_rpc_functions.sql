-- Public function: get waitlist counts per tier
-- Callable by anon (no auth required) — only returns aggregate counts, not individual emails
CREATE OR REPLACE FUNCTION public.get_waitlist_stats()
RETURNS TABLE (founder bigint, priority bigint, early_adopter bigint, total bigint)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    COUNT(*) FILTER (WHERE tier = 'founder'),
    COUNT(*) FILTER (WHERE tier = 'priority'),
    COUNT(*) FILTER (WHERE tier = 'early_adopter'),
    COUNT(*)
  FROM waitlist_signups;
$$;

-- Public function: join the waitlist
-- Callable by anon. Handles duplicate check, tier assignment, and insert atomically.
-- Returns: { status text, tier text }
--   status = 'ok' | 'already_joined' | 'closed'
CREATE OR REPLACE FUNCTION public.join_waitlist(p_email text, p_source_button text)
RETURNS TABLE (status text, tier text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_existing_tier waitlist_signups.tier%TYPE;
  v_counts RECORD;
  v_founder_count bigint;
  v_priority_count bigint;
  v_early_adopter_count bigint;
  v_assigned waitlist_signups.tier%TYPE;
  v_founder_cap int := 69;
  v_priority_cap int := 300;
  v_early_adopter_cap int := 1000;
BEGIN
  -- Lowercase email
  p_email := lower(trim(p_email));

  -- Already joined?
  SELECT tier INTO v_existing_tier
  FROM waitlist_signups
  WHERE email = p_email
  LIMIT 1;

  IF v_existing_tier IS NOT NULL THEN
    RETURN QUERY SELECT 'already_joined'::text, v_existing_tier::text;
    RETURN;
  END IF;

  -- Current counts
  SELECT
    COUNT(*) FILTER (WHERE tier = 'founder'),
    COUNT(*) FILTER (WHERE tier = 'priority'),
    COUNT(*) FILTER (WHERE tier = 'early_adopter')
  INTO v_founder_count, v_priority_count, v_early_adopter_count
  FROM waitlist_signups;

  -- Tier assignment logic
  IF p_source_button = 'founder' AND v_founder_count < v_founder_cap THEN
    v_assigned := 'founder'::waitlist_tier;
  ELSIF p_source_button = 'priority' AND v_priority_count < v_priority_cap THEN
    v_assigned := 'priority'::waitlist_tier;
  ELSIF p_source_button = 'early_adopter' AND v_early_adopter_count < v_early_adopter_cap THEN
    v_assigned := 'early_adopter'::waitlist_tier;
  ELSE
    -- Auto-assign to lowest open tier
    IF v_founder_count < v_founder_cap THEN
      v_assigned := 'founder'::waitlist_tier;
    ELSIF v_priority_count < v_priority_cap THEN
      v_assigned := 'priority'::waitlist_tier;
    ELSIF v_early_adopter_count < v_early_adopter_cap THEN
      v_assigned := 'early_adopter'::waitlist_tier;
    ELSE
      RETURN QUERY SELECT 'closed'::text, NULL::text;
      RETURN;
    END IF;
  END IF;

  -- Insert (handle race condition via unique constraint)
  BEGIN
    INSERT INTO waitlist_signups (email, tier, source_button)
    VALUES (p_email, v_assigned, p_source_button);
    RETURN QUERY SELECT 'ok'::text, v_assigned::text;
  EXCEPTION WHEN unique_violation THEN
    RETURN QUERY SELECT 'already_joined'::text, v_assigned::text;
  END;
END;
$$;

-- Grant execute to anon (public) and authenticated
GRANT EXECUTE ON FUNCTION public.get_waitlist_stats() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.join_waitlist(text, text) TO anon, authenticated;
