import { Box } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Main from './Main';
import { LayoutProvider } from '../../../contexts';

const Layout = ({ children }) => {
    return (
        <>
            <LayoutProvider>
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <Navbar />
                    <Sidebar />
                    <Main>{children}</Main>
                </Box>
            </LayoutProvider>
        </>
    );
};

export default Layout;
