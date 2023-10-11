// @mui
import { alpha, styled } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
//
import { NavItemProps, NavConfigProps } from '../types';

// ----------------------------------------------------------------------

type StyledItemProps = Omit<NavItemProps, 'item'> & {
  config: NavConfigProps;
};

export const StyledItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<StyledItemProps>(({ active, depth, config, theme }) => {
  const subItem = depth !== 1;

  const deepSubItem = depth > 2;

  const activeStyles = {
    root: {
      color: '#0059a7',
        // theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.light,
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      '&:hover': {
        backgroundColor: '#0059a724',
      }
    },
    sub: {
      color: '#005a97',
      backgroundColor: '#0059a724',
      '&:hover': {
        backgroundColor: '#0059a724',
      },
    },
  };

  return {
    // Root item
    padding: config.itemPadding,
    marginBottom: config.itemGap,
    borderRadius: config.itemRadius,
    minHeight: config.itemRootHeight,
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: '#0059a724',
      color: '#0059a7'
    },                              
    // Active root item
    ...(active && {
      ...activeStyles.root,
    }),

    // Sub item
    ...(subItem && {
      minHeight: config.itemSubHeight,
      '&:hover': {
        backgroundColor: '#0059a724',
        color: '#0059a7'
      },
      // Active sub item
      ...(active && {
        ...activeStyles.sub,
      }),
    }),

    // Deep sub item
    ...(deepSubItem && {
      paddingLeft: theme.spacing(depth),
    }),
  };
});

// ----------------------------------------------------------------------

type StyledIconProps = {
  size?: number;
};

export const StyledIcon = styled(ListItemIcon)<StyledIconProps>(({ size }) => ({
  width: size,
  height: size,
  alignItems: 'center',
  justifyContent: 'center',
  // '&:hover': {
  //   backgroundColor: '#0059a724',
  //   color:'#0059a7'
  // },
}));

type StyledDotIconProps = {
  active?: boolean;
};

export const StyledDotIcon = styled('span')<StyledDotIconProps>(({ active, theme }) => ({
  width: 4,
  height: 4,
  borderRadius: '50%',
  backgroundColor: theme.palette.text.disabled,
  transition: theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.shorter,
  }),
  ...(active && {
    transform: 'scale(2)',
    backgroundColor: '#005a97',
    color:'#0059a7'
  }),
}));

// ----------------------------------------------------------------------

type StyledSubheaderProps = {
  config: NavConfigProps;
};

export const StyledSubheader = styled(ListSubheader)<StyledSubheaderProps>(({ config, theme }) => ({
  ...theme.typography.overline,
  fontSize: 11,
  cursor: 'pointer',
  display: 'inline-flex',
  padding: config.itemPadding,
  paddingTop: theme.spacing(2),
  marginBottom: config.itemGap,
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.disabled,
  transition: theme.transitions.create(['color'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    color: '#0059a7',
  },
}));
