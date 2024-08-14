export interface IJobFilter {
  key: string;
  label: string;
  value: string;
}

export interface IJobFilterApply {
  key: string;
  label: string;
  value: string;
}

export interface FilterState {
  jobFilter: IJobFilter[];
  jobFilterApply: IJobFilterApply[];
}
