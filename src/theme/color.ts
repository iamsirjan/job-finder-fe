export const THEME_COLORS = {
  primary: {
    100: '#F3F9FF',
    200: '#E5F2FF',
    300: '#DCEEFF',
    400: '#C8E2FF',
    500: '#A5CBFA',
    900: '#4370A0',
    1000: '#172A46',
  },
  secondary: {
    100: '#F1F3F6',
    150: '#ECEFF3',
    200: '#E1E6EB',
    300: '#A7B4C3',
    400: '#91A2B5',
    600: '#899DB2',
    700: '#627C98',
    900: '#1D426B',
    950: '#09325E',
    1000: '#09305A',
    1100: '#0A192F',
    1200: '#8890A2',
    1300: '#3D6DD8',
    1400: '#F2F2F2',
  },
  brand: {
    accentBlue: '#44C9D1',
    accentPink: '#EE5BC4',
    accentYellow: '#FDCF2D',
    black: '#000000',
    blue: '#1B7FF1',
    gray: '#B8B8B8',
    darkGreen: '#438820',
    green: '#209628',
    red: '#D14C44',
    white: '#FFFFFF',
    // colors which are used in atoms but not available in Figma
    lightBlue: '#127DF6',
    blueInactive: '#C5DFFB',
    blueActive: '#0D75EB',
    layoutBg: '#EEF0F6',
    selectedRow: '#EDFBE5',
    oldStyleLabel: '#8690A4',
  },
  severity: {
    1: '#D14C44',
    2: '#F1A016',
    3: '#899DB2',
  },
  settings: {
    pageBackgroundColor: '#E2E8F0',
    transferOwnerHint: '#09305A',
    permissions_user_name: '#09305A',
  },
  override: {
    bg: '#09305A',
  },
  entityPopover: {
    heading: '#677B95',
  },
  incidentStatusTag: {
    triggered: '#A951ED',
    acknowledged: '#FDCF2D',
    suppressed: '#899DB2',
    resolved: '#209628',
  },
  healthStatus: {
    healthy: '#EDFBE5',
    unhealthy: '#FFEEE6',
    on_maintenance: '#ECEFF3',
  },
  container: {
    background: '#FFFFFF',
  },
  pageLevelMessage: {
    background: '#FFF6BF',
  },
  form: {
    invalid: '#E05000',
    error: '#E53E3E',
  },
};

// these colors are used for tags and squad avatar
export const TERTIARY_COLORS = [
  '#18A897',
  '#18A86D',
  '#438820',
  '#706EC4',
  '#A09FC8',
  '#E05677',
  '#FC164E',
  '#E0A426',
  '#EF5D1E',
  '#A25321',
  '#7E7E7E',
  '#C668FF',
  '#5484CC',
];

export const PRIORITY_COLORS = (val?: string | null) => {
  switch (val) {
    case 'P1':
      return '#FC164E';
    case 'P2':
      return '#EF5D1E';
    case 'P3':
      return '#E0A426';
    case 'P4':
      return '#5484CC';
    case 'P5':
      return '#7E7E7E';
    default:
      return THEME_COLORS.secondary[200];
  }
};
