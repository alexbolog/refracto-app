drop function public.read_project_data
create
or replace function public.read_project_data () returns table (
  id bigint,
  title text,
  returnPercentage real,
  RiskRatingLevel public.riskratinglevel,
  crowdfundingDeadline timestamp with time zone,
  crowdfundingTarget numeric,
  crowdfundedAmount numeric,
  colorCodeHex text,
  thumbnailSrc text
) as $$
BEGIN
  RETURN QUERY SELECT p.id as id, p.title as title, p."returnPercentage" as "returnPercentage", p."RiskRatingLevel" as "RiskRatingLevel", p."crowdfundingDeadline" as "crowdfundingDeadline", p."crowdfundingTarget" as "crowdfundingTarget", p."crowdfundedAmount" as "crowdfundedAmount", p."colorCodeHex" as "colorCodeHex", p."thumbnailSrc" as "thumbnailSrc" FROM public."Projects" p
 WHERE "crowdfundingDeadline" > NOW();
END; 
$$ language plpgsql;

select
  *
from
  read_project_data ()


select * from public."Projects"