import { useContext } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { Box, Toolbar, Typography } from '@mui/material';

import { drawerWidth, drawerMin } from '../../../../constants';
import { LayoutContext } from '../../../../contexts';

import ThemeToggler from '../../ThemeToggler';

const openedMixin = (theme) => ({
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
});

const closedMixin = (theme) => ({
    marginLeft: `calc(${theme.spacing(drawerMin)} + 1px)`,
    width: `calc(100% - ${theme.spacing(drawerMin)} - 1px)`,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('sm')]: {
        marginLeft: `calc(${theme.spacing(drawerMin + 2)} + 1px)`,
        width: `calc(100% - ${theme.spacing(drawerMin + 2)} - 1px)`,
    },
});

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    // zIndex: theme.zIndex.drawer + 1,
    ...(open ? openedMixin(theme) : closedMixin(theme)),
}));

const Navbar = () => {
    const { open } = useContext(LayoutContext);

    return (
        <>
            <AppBar position='fixed' open={open} color='inherit' elevation={0}>
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        IOT Portal
                    </Typography>
                    <Box
                        sx={{
                            ml: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                        }}
                    >
                        <ThemeToggler />
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
