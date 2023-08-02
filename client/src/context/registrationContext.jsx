import { createContext, useContext, useState } from "react";

const registrationContext = createContext();

export const useRegistration = () => {
    const context = useContext(registrationContext);
    if (!context) {
        throw new Error("useRegistration must be used within a RegistrationProvider");
    }
    return context;
}

export function RegistrationProvider({ children }) {

    const [registration, setRegistration] = useState([]);
    return (
        <registrationContext.Provider value={{ registration}}>
            {children}
        </registrationContext.Provider>
    );
}

