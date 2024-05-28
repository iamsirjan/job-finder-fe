export const BUTTON_VARIANTS = {
  primary: {
    p: {
      color: 'brand.white',
    },
    bg: 'brand.blue',
    border: '1.5px solid',
    borderColor: 'brand.blue',

    _hover: {
      bg: 'brand.lightBlue',
      borderColor: 'primary.400',
    },

    _disabled: {
      bg: 'brand.blueInactive',
      borderColor: 'brand.blueInactive',
      pointerEvents: 'none',
    },

    _active: {
      bg: '#0D75EB',
      borderColor: 'primary.400',
    },
  },
  secondary: {
    p: {
      color: 'brand.blue',
    },
    bg: 'brand.white',
    border: '0.75px solid',
    borderColor: 'primary.500',

    _hover: {
      bg: 'primary.100',
    },

    _disabled: {
      borderColor: 'brand.blueInactive',
      p: {
        color: 'brand.blueInactive',
      },
      pointerEvents: 'none',
    },

    _active: {
      bg: 'primary.200',
    },
  },
  create: {
    height: '36px',
    p: {
      color: 'brand.white',
    },
    bg: 'brand.blue',
    border: '1.5px solid',
    borderColor: 'brand.blue',

    _hover: {
      bg: 'brand.lightBlue',
      borderColor: 'primary.400',
    },

    _disabled: {
      bg: 'brand.blueInactive',
      borderColor: 'brand.blueInactive',
      pointerEvents: 'none',
    },

    _active: {
      bg: '#0D75EB',
      borderColor: 'primary.400',
    },
  },
  ghost: {
    bg: 'brand.white',
    p: {
      color: 'brand.blue',
    },

    _hover: {
      bg: 'primary.100',
    },

    _disabled: {
      bg: 'brand.white',
      p: {
        color: 'brand.blueInactive',
      },
      pointerEvents: 'none',
    },

    _active: {
      bg: 'primary.200',
    },
  },
  danger: {
    bg: 'brand.red',
    p: {
      color: 'brand.white',
    },

    _hover: {
      bg: 'brand.red',
    },

    _disabled: {
      opacity: 0.5,
      pointerEvents: 'none',
    },

    _active: {
      bg: 'brand.red',
    },
  },
  'secondary-danger': {
    p: {
      color: 'brand.red',
    },
    bg: 'brand.white',
    border: '1px solid',
    borderColor: 'brand.red',

    _disabled: {
      borderColor: 'brand.red',
      p: {
        color: 'brand.red',
      },
      pointerEvents: 'none',
    },
    _hover: {
      boxShadow: '0 0 1.5px 1.5px #fad7c3',
      WebkitBoxShadow: ' 0 0 1.5px 1.5px #fad7c3',
    },

    _active: {
      bg: 'brand.white',
    },
  },
  'secondary-danger-create': {
    height: '36px',
    p: {
      color: 'brand.red',
    },
    bg: 'brand.white',
    border: '1px solid',
    borderColor: 'brand.red',

    _disabled: {
      borderColor: 'brand.red',
      p: {
        color: 'brand.red',
      },
      pointerEvents: 'none',
    },
    _hover: {
      boxShadow: '0 0 1.5px 1.5px #fad7c3',
      WebkitBoxShadow: ' 0 0 1.5px 1.5px #fad7c3',
    },

    _active: {
      bg: 'brand.white',
    },
  },
  'outline-danger': {
    p: {
      color: 'brand.red',
    },
    bg: 'brand.white',
    border: '1px solid',
    borderColor: 'brand.red',

    _disabled: {
      borderColor: 'brand.red',
      p: {
        color: 'brand.red',
      },
      pointerEvents: 'none',
    },
    _hover: {
      boxShadow: '0 0 1.5px 1.5px #fad7c3',
      WebkitBoxShadow: ' 0 0 1.5px 1.5px #fad7c3',
    },

    _active: {
      bg: 'brand.white',
    },
  },
  'ghost-danger': {
    bg: 'brand.white',
    p: {
      color: 'brand.red',
    },

    _hover: {
      bg: 'brand.white',
    },

    _active: {
      bg: 'brand.white',
    },
  },
};
