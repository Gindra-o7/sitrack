import Keycloak from "keycloak-js";

const keycloakConfig = {
    url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || "",
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "",
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || ""
};

let keycloak: Keycloak | null = null;

export const initKeycloak = () => {
    if (typeof window !== 'undefined') {
        console.log('Initializing Keycloak with config:', {
            url: keycloakConfig.url,
            realm: keycloakConfig.realm,
            clientId: keycloakConfig.clientId
        });

        keycloak = new Keycloak(keycloakConfig)
    }
    return keycloak;
};

export const getKeycloak = () => {
    if (!keycloak) {
        throw new Error('Keycloak not initialized');
    }
    return keycloak;
};