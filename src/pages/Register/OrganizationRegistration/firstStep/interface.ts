export interface IOrgFirstStep {
  name: string;
  phone_number: string;
  pan_number: string;
  address: string;
  web_site_link: string;
  organization_type: OrganizationTypeEnum;
}

export enum OrganizationTypeEnum {
  PRIVATE = '1',
  PUBLIC = '2',
  MIXED = '3',
  OTHERS = '4',
}
