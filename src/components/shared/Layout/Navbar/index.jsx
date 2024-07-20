import { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';

import { drawerWidth, drawerMin } from '../../../../constants';
import { LayoutContext } from '../../../../contexts';

import ThemeToggler from '../../ThemeToggler';
import Offcanvas from '../../Offcanvas';

import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';

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
    const [isOffcanvaOpen, setOffcanvaOpen] = useState(false);

    // const handleToggleOffcanvas = (isOpen) => {
    //     setOffcanvaOpen(isOpen);
    // };

    const handleToggleOffcanvas = (newOpen) => () => {
        setOffcanvaOpen(newOpen);
    };

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
                        <IconButton
                            onClick={handleToggleOffcanvas(true)}
                            color='inherit'
                        >
                            <SettingsIcon />
                        </IconButton>
                        <ThemeToggler />
                    </Box>
                </Toolbar>
            </AppBar>
            <Offcanvas
                anchorPoint='right'
                width={360}
                open={isOffcanvaOpen}
                onClose={handleToggleOffcanvas(false)}
            >
                <Box
                    sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        padding: theme.spacing(2, 1, 2, 2.5),
                    })}
                >
                    <Typography
                        variant='h6'
                        fontWeight={600}
                        sx={{
                            flexGrow: 1,
                            width: '100%',
                            maxWidth: '100%',
                            display: 'block',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        Settings
                    </Typography>
                    <Tooltip title='Close'>
                        <IconButton
                            onClick={handleToggleOffcanvas(false)}
                            color='text.secondary'
                            size='small'
                        >
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Offcanvas>
        </>
    );
};

export default Navbar;
