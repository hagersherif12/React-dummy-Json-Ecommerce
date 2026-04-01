import { useState } from "react";
import { DataContext } from "./context";

export function ProviderContext({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem('userData')) || {}
    )

    return (
        <DataContext.Provider value={{
            token, setToken,
            userData, setUserData,
        }}>
            {children}
        </DataContext.Provider>
    )
}
