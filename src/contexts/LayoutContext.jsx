import { createContext, useState } from 'react';

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const [open, setOpen] = useState(false);

    const handleToggleDrawer = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <LayoutContext.Provider value={{ open, handleToggleDrawer }}>
            {children}
        </LayoutContext.Provider>
    );
};
