import { DateTime } from "luxon";

export interface ProjectListFilterType {
  minReturnRange?: number;
  maxReturnRange?: number;
  riskRatingLevels?: string[];
  projectDeadlineStart?: DateTime;
  projectDeadlineEnd?: DateTime;
  nameSearch?: string;
}