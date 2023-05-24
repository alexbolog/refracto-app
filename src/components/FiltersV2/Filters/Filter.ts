export interface Filter {
  id: string;
  defaultState: any;
  filterComponent: (
    state: any,
    onFilterChange: (newState: any) => void
  ) => JSX.Element;
  appliedFilterComponent: (state: any, resetState: () => void) => JSX.Element;
  shouldDisplay: (item: any, state: any) => boolean;
}
