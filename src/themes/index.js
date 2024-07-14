import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

// mui theme settings
export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            common: {
                black: '#000000',
                white: '#FFFFFF',
            },
            ...(mode === 'dark' ? {} : {}),
        },
        components: {},
        typography: {
            fontFamily: ['Poppins', 'sans-serif'].join(','),
        },
    };
};

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => {},
});

export const useMode = () => {
    const storedMode = localStorage.getItem('themeMode');
    const [mode, setMode] = useState(storedMode || 'light');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                const newMode = mode === 'light' ? 'dark' : 'light';
                setMode(newMode);
                localStorage.setItem('themeMode', newMode);
            },
        }),
        [mode]
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
};
