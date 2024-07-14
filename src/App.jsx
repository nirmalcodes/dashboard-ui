import { ColorModeContext, useMode } from './themes';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Layout from './components/shared/Layout';

const App = () => {
    const [theme, colorMode] = useMode();

    return (
        <>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Layout>
                        <Box sx={{ flexGrow: 1, p: 2 }}>App</Box>
                    </Layout>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </>
    );
};

export default App;
