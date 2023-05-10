import { DateTime } from 'luxon';
import { ProjectListItem } from 'types/projectTypes';
import { ProjectListFilterType } from './ProjectListFilterType';

export const shouldDisplayProject = (
  project: ProjectListItem,
  currentAppliedFilters: ProjectListFilterType
) => {
  let shouldDisplay = true;
  if (currentAppliedFilters.nameSearch !== undefined) {
    shouldDisplay =
      shouldDisplay &&
      project.projectTitle.includes(currentAppliedFilters.nameSearch);
  }
  if (currentAppliedFilters.minReturnRange !== undefined) {
    shouldDisplay =
      shouldDisplay &&
      project.returnPercentage * 100 >= currentAppliedFilters.minReturnRange;
  }
  if (currentAppliedFilters.maxReturnRange !== undefined) {
    shouldDisplay =
      shouldDisplay &&
      project.returnPercentage * 100 <= currentAppliedFilters.maxReturnRange;
  }
  if (
    currentAppliedFilters.riskRatingLevels !== undefined &&
    currentAppliedFilters.riskRatingLevels.length > 0 &&
    currentAppliedFilters.riskRatingLevels.length < 3
  ) {
    const riskLevelCheck =
      currentAppliedFilters.riskRatingLevels.filter((lvl: string) =>
        project.riskRatingLevel.includes(lvl)
      ).length > 0;
    shouldDisplay = shouldDisplay && riskLevelCheck;
  }

  const cfDeadline = DateTime.fromISO(project.crowdfundingDeadline);
  if (currentAppliedFilters.projectDeadlineStart !== undefined) {
    shouldDisplay =
      shouldDisplay && cfDeadline >= currentAppliedFilters.projectDeadlineStart;
  }

  if (currentAppliedFilters.projectDeadlineEnd !== undefined) {
    shouldDisplay =
      shouldDisplay && cfDeadline <= currentAppliedFilters.projectDeadlineEnd;
  }
  return shouldDisplay;
};
