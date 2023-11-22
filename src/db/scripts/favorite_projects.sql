--  RLS Config

ALTER TABLE public."FavoriteProjects" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."FavoriteProjects" FORCE ROW LEVEL SECURITY;

CREATE POLICY user_can_access_own_favorite_projects
  ON public."FavoriteProjects"
  FOR ALL
  USING (
    wallet_address = split_part(current_setting('auth.uid'), '@', 1)
  );


ALTER TABLE public."FavoriteProjects" ALTER POLICY user_can_access_own_favorite_projects USING (wallet_address = split_part(current_setting('auth.uid'), '@', 1));

-- INSERT
CREATE OR REPLACE FUNCTION add_favorite_project(wallet text, proj_id bigint)
RETURNS void AS $$
BEGIN
  INSERT INTO public."FavoriteProjects" (wallet_address, "projectId")
  VALUES (wallet, proj_id);
END;
$$ LANGUAGE plpgsql;


-- DELETE
CREATE OR REPLACE FUNCTION remove_favorite_project(wallet text, proj_id bigint)
RETURNS void AS $$
BEGIN
  DELETE FROM public."FavoriteProjects"
    WHERE wallet_address = wallet AND "projectId" = proj_id;
END;
$$ LANGUAGE plpgsql;


-- READ
CREATE OR REPLACE FUNCTION get_favorite_projects(p_wallet_address text)
RETURNS TABLE(
  projectId bigint,
  returnPercentage real,
  crowdfundingDeadline timestamp with time zone,
  thumbnailSrc text,
  projectTitle text
) AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    p.id, 
    p."returnPercentage", 
    p."crowdfundingDeadline", 
    p."thumbnailSrc", 
    p.title 
  FROM 
    public."FavoriteProjects" f
  JOIN 
    public."Projects" p ON f."projectId" = p.id
  WHERE 
    f.wallet_address = p_wallet_address;
END;
$$ LANGUAGE plpgsql;


