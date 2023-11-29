CREATE
OR REPLACE FUNCTION public.get_project_details_by_id (p_id bigint) RETURNS TABLE (
  id bigint,
  title text,
  returnPercentage real,
  RiskRatingLevel public.riskratinglevel,
  crowdfundingDeadline timestamp with time zone,
  crowdfundingTarget numeric,
  crowdfundedAmount numeric,
  colorCodeHex text,
  thumbnailSrc text,
  loanDeadline timestamp with time zone,
  images text[],
  ProjectDeveloperId bigint,
  assetClass public.assetclass,
  investmentType public.investmenttype,
  shortDescription text,
  executiveSummary text,
  details text,
  location point,
  sponsorInfo text,
  analysis public.swot_analysis,
  refractoRating refracto_rating_item[],
  capitalStructure capital_structure_item[],
  financingDetails text,
  attachmentUrls text[]
) AS $$
DECLARE 
    current_uid UUID;
BEGIN
    current_uid := auth.uid();

    IF current_uid IS NULL THEN
       RETURN QUERY SELECT p.id, p.title, p."returnPercentage", p."RiskRatingLevel", p."crowdfundingDeadline", 
                    p."crowdfundingTarget", p."crowdfundedAmount", p."colorCodeHex", p."thumbnailSrc", 
                    p."loanDeadline", p.images, p."ProjectDeveloperId", p."assetClass", p."investmentType", 
                    p."shortDescription", p."executiveSummary", p.details, NULL::point, NULL::text, NULL::public.swot_analysis, 
               NULL::refracto_rating_item[], NULL::capital_structure_item[], NULL::text, 
               NULL::text[]
FROM public."Projects" p WHERE p.id = p_id;
    ELSE
        RETURN QUERY SELECT p.id, p.title, p."returnPercentage", p."RiskRatingLevel", p."crowdfundingDeadline", 
                    p."crowdfundingTarget", p."crowdfundedAmount", p."colorCodeHex", p."thumbnailSrc", 
                    p."loanDeadline", p.images, p."ProjectDeveloperId", p."assetClass", p."investmentType", 
                    p."shortDescription", p."executiveSummary", p.details, p.location, p."sponsorInfo", 
                    p.analysis, p."refractoRating", p."capitalStructure", p."financingDetails", 
                    p."attachmentUrls" 
FROM public."Projects" p WHERE p.id = p_id;
    END IF;
END; 

$$ LANGUAGE plpgsql;