export interface ProjectListFilterType {
  minReturnRange?: number;
  maxReturnRange?: number;
  riskRatingLevels?: string[];
  projectDeadlineStart?: number;
  projectDeadlineEnd?: number;
  nameSearch?: string;
}