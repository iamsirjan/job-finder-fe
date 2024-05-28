export type AnyObject = Record<string, any>;
export type BTN_DEFAULT_VARIANTS = 'primary' | 'secondary' | 'ghost';
export type VARIANT =
  | BTN_DEFAULT_VARIANTS
  | 'danger'
  | 'secondary-danger'
  | 'ghost-danger'
  | 'create'
  | 'secondary-danger-create';
export type STEP_STATUS = 'current' | 'completed' | 'inactive';

export type LinkObject = {
  link: string;
  text: string;
};

export type DROPDOWN_VARIANT =
  | 'assignee'
  | 'avatar'
  | 'icon'
  | 'image'
  | 'priority';
export type TOAST_STATUS = 'info' | 'warning' | 'success' | 'error';
export type INCIDENT_STATUS_TAGS =
  | 'triggered'
  | 'acknowledged'
  | 'suppressed'
  | 'resolved';
export type ToastProps = {
  text: string;
  status: TOAST_STATUS;
};

export type DateRangeProps = { startDate: Date; endDate: Date; key: string };

export type RowType<T> = {
  data: Array<T>;
};

export type SelectOptionType = {
  value: string;
  label: string;
};

export type PRIORITY_TYPE = string | null;

export type IncidentAssignee = {
  id: string;
  type: string;
  name: string;
};
