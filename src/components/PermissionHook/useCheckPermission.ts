import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    permissions: string[];
}

function useCheckPermission(permission: string) {
    const auth0 = useAuth0();
    const [response, setResponse] = useState({ isAdmin: false, loading: true }); 

    useEffect(() => {
        const getToken = async () => {
            try {
                const token = await auth0.getAccessTokenSilently();
                const decoded = jwtDecode<DecodedToken>(token);
                const isAdmin = decoded.permissions.includes(permission);
                setResponse({ isAdmin, loading: false }); 
            } catch (error) {
                console.error("Error getting token:", error);
                setResponse({ isAdmin: false, loading: false }); 
            }
        };

        getToken();
    }, [auth0, permission]);

    return response;
}

export default useCheckPermission;