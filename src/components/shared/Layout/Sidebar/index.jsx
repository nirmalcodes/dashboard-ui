import { useContext } from 'react';

import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { alpha, Box, ButtonBase } from '@mui/material';
import { grey } from '@mui/material/colors';
import { NavLink } from 'react-router-dom';

import { drawerWidth, drawerMin } from '../../../../constants';
import { LayoutContext } from '../../../../contexts';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(drawerMin)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(drawerMin + 2)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

export const SidbarHeader = styled('div', {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    ...(open && {
        padding: theme.spacing(1.25, 0, 1, 1.75),
    }),
    ...(!open && {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(1.25, 0),
    }),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Sidebar = () => {
    const { open, handleToggleDrawer } = useContext(LayoutContext);

    return (
        <>
            <Drawer variant='permanent' open={open}>
                <ToggleButton open={open} onClick={handleToggleDrawer}>
                    {open ? (
                        <ChevronLeftIcon
                            sx={{ width: '16px', height: '16px' }}
                        />
                    ) : (
                        <ChevronRightIcon
                            sx={{ width: '16px', height: '16px' }}
                        />
                    )}
                </ToggleButton>

                <SidbarHeader open={open}>
                    <DashboardIcon
                        color='success'
                        sx={{ width: '40px', height: '40px' }}
                    />
                </SidbarHeader>
                <CustomList component={'nav'} open={open}>
                    <CustomLink open={open} to={'/'}>
                        <DashboardIcon />
                        <CustomLinkText open={open}>Home</CustomLinkText>
                    </CustomLink>
                    <CustomLink open={open} to={'/dashboard'}>
                        <DashboardIcon />
                        <CustomLinkText open={open}>Dashboard</CustomLinkText>
                    </CustomLink>
                </CustomList>
            </Drawer>
        </>
    );
};

export default Sidebar;

const openedBtnMixin = (theme) => ({
    left: drawerWidth,
    transition: theme.transitions.create('left', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
});

const closedBtnMixin = (theme) => ({
    transition: theme.transitions.create('left', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    left: `calc(${theme.spacing(drawerMin)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        left: `calc(${theme.spacing(drawerMin + 2)} + 1px)`,
    },
});

const ToggleButton = styled(ButtonBase, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    left: drawerWidth,
    flex: '0 0 auto',
    ...(open && { ...openedBtnMixin(theme) }),
    ...(!open && { ...closedBtnMixin(theme) }),
    position: 'fixed',
    transform: 'translateX(-50%)',
    padding: theme.spacing(0.5),
    top: '24px',
    borderRadius: '50%',
    backgroundColor:
        theme.palette.mode === 'dark'
            ? theme.palette.grey[800]
            : theme.palette.common.white,
    color:
        theme.palette.mode === 'dark'
            ? theme.palette.common.white
            : theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    fontSize: '1.125rem',
    zIndex: theme.zIndex.appBar + 1,
    '&:hover': {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? theme.palette.grey[700]
                : theme.palette.grey[100],
    },
}));

const openedListMixin = (theme) => ({
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        borderRadius: '6px',
        backgroundColor:
            theme.palette.mode === 'dark'
                ? alpha(grey[200], 0.2)
                : alpha(grey[500], 0.2),
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? alpha(grey[200], 0.4)
                : alpha(grey[500], 0.4),
    },
});

const closedListMixin = (theme) => ({
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
});

const CustomList = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
    flex: '1 1 auto',
    overflowY: 'auto',
    padding: theme.spacing(0, 0.5, 2),
    ...(open && { ...openedListMixin(theme) }),
    ...(!open && { ...closedListMixin(theme) }),
}));

const openedLinkMixin = (theme) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: '0.875rem',
    minHeight: `calc(${theme.spacing(5.5)})`,
    padding: theme.spacing(0.5, 1, 0.5, 1.5),
    gap: 12,
    fontWeight: 500,
    '&.active': {
        fontWeight: 600,
        color: alpha(theme.palette.primary.main, 1),
        backgroundColor: alpha(theme.palette.primary.main, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
        },
    },
    '&:hover': {
        backgroundColor: alpha(grey[500], 0.1),
    },
});

const closedLinkMixin = (theme) => ({
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '0.625rem',
    minHeight: `calc(${theme.spacing(7)})`,
    padding: theme.spacing(1, 0.5),
    gap: 6,
    fontWeight: 600,
    '&.active': {
        fontWeight: 700,
        color: alpha(theme.palette.primary.main, 1),
        backgroundColor: alpha(theme.palette.primary.main, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
        },
    },
    '&:hover': {
        backgroundColor: alpha(grey[500], 0.1),
    },
});

const CustomLink = styled(NavLink, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    display: 'inline-flex',
    borderRadius: 8,
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    ...(open && { ...openedLinkMixin(theme) }),
    ...(!open && { ...closedLinkMixin(theme) }),
    transition:
        'color 150ms ease-in-out, background-color 150ms ease-in-out, font-weight 150ms ease-in-out',
}));

const CustomLinkText = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: '100%',
    maxWidth: '100%',
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    lineHeight: 1,
    ...(open && { textAlign: 'left' }),
    ...(!open && { textAlign: 'center' }),
}));
