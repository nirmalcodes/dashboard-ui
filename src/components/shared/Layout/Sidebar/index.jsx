import { useContext } from 'react';

import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { ButtonBase, Divider, List } from '@mui/material';

import { sidebarWidth } from '../../../../constants';
import { LayoutContext } from '../../../../contexts';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import DashboardIcon from '@mui/icons-material/Dashboard';

const drawerWidth = sidebarWidth;

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
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
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
                <List></List>
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
    left: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        left: `calc(${theme.spacing(8)} + 1px)`,
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
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.divider}`,
    fontSize: '1.125rem',
    zIndex: theme.zIndex.appBar + 1,
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));
