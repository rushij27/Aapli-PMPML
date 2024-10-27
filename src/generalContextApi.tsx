import { createContext, useContext, useState } from "react";

const GeneralContext = createContext({});

export const useGeneralContext = () => {
    return useContext(GeneralContext);
}

const GeneralProvider = ({ children }: any) => {
    const [state, setState] = useState({
        isSessionExpired: false,
        route: {}
    });
    return (
        <GeneralContext.Provider value={{state, setState}}>{children}</GeneralContext.Provider>
    );
};

export { GeneralContext, GeneralProvider };
