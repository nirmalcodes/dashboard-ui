import { useContext } from 'react';
import { IconButton, useTheme } from '@mui/material';
import { ColorModeContext } from '../../../themes';

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

const ThemeToggler = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <>
            <IconButton onClick={colorMode.toggleColorMode} color='inherit'>
                {theme.palette.mode === 'dark' ? (
                    <DarkModeOutlinedIcon />
                ) : (
                    <LightModeOutlinedIcon />
                )}
            </IconButton>
        </>
    );
};

export default ThemeToggler;
