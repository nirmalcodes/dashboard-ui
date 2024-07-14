import { Box } from '@mui/material';
import { SidbarHeader } from '../Sidebar';

const Main = ({ children }) => {
    return (
        <>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <SidbarHeader />
                {children}
            </Box>
        </>
    );
};

export default Main;
