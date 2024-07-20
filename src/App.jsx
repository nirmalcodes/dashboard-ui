import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './themes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ErrorFallback from './components/shared/ErrorFallback';
import Layout from './components/shared/Layout';

import Home from './pages/Home';

const App = () => {
    const [theme, colorMode] = useMode();

    return (
        <>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<div>Loading...</div>}>
                    <ColorModeContext.Provider value={colorMode}>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <BrowserRouter>
                                <Routes>
                                    <Route
                                        path='/'
                                        element={
                                            <Layout>
                                                <Home />
                                            </Layout>
                                        }
                                    />
                                    <Route
                                        path='/dashboard'
                                        element={
                                            <Layout>
                                                <Home />
                                            </Layout>
                                        }
                                    />
                                </Routes>
                            </BrowserRouter>
                        </ThemeProvider>
                    </ColorModeContext.Provider>
                </Suspense>
            </ErrorBoundary>
        </>
    );
};

export default App;
