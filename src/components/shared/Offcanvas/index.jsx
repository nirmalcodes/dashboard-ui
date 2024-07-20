import { Box, Drawer } from '@mui/material';

const Offcanvas = ({
    children,
    open = false,
    anchorPoint = 'left',
    width = 250,
    onClose = () => {},
}) => {
    return (
        <>
            <Drawer
                anchor={anchorPoint}
                open={open}
                onClose={onClose}
                // BackdropProps={{
                //     style: {
                //         backgroundColor: 'rgba(0, 0, 0, 0)',
                //     },
                // }}
            >
                <Box
                    sx={{
                        width:
                            anchorPoint === 'top' || anchorPoint === 'bottom'
                                ? 'auto'
                                : width,
                    }}
                    role='presentation'
                >
                    {children}
                </Box>
            </Drawer>
        </>
    );
};

export default Offcanvas;
