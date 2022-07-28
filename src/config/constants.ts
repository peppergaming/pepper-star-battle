/**
 * Keys
 */
export const isDev = process.env.NODE_ENV === "development";
export const PEPPER_ACCESS_TOKEN_KEY = "PEPPER_ACCESS_TOKEN";
export const PEPPER_OAUTH_TOKEN_KEY = "PEPPER_OAUTH_TOKEN_KEY";
export const PEPPER_OAUTH_SUCCESS = "PEPPER_OAUTH_SUCCESS";
export const USER_WEB3_PROFILE_KEY = "USER_WEB3_PROFILE";
export const WEB3AUTH_CACHED_ADAPTER_KEY = "Web3Auth-cachedAdapter";
export const WALLET_CONNECT_KEY = "walletconnect";
export const PEPPER_SERVER_URL =
    process.env.NEXT_PUBLIC_PEPPER_SERVER_URL || "http://localhost:5555";
export const PEPPER_API_URL = `${PEPPER_SERVER_URL}/api`;

export const GOOGLE_CLIENT_ID =
    process.env.NEXT_PUBLIC_PEPPER_GOOGLE_CLIENT_ID || "";

export const GOOGLE_VERIFIER =
    process.env.NEXT_PUBLIC_PEPPER_GOOGLE_VERIFIER || "";

export const WEB3AUTH_CLIENT_ID =
    process.env.NEXT_PUBLIC_PEPPER_WEB3AUTH_CLIENT_ID ||
    "BDxiHUo7CjOaj58Y1Zea9cASZs66-WCb28O5c_D6X246JBkViSwbPaET48DFlBLBiPQ1mVxBRjWmTmFL4PseD2I";

export interface IObjectKeys {
    [key: string]: any;
}


export const LOGIN_STATUS = {
    DISCONNECTED: {
        key: "DISCONNECTED",
        loading: false,
        message: "DISCONNECTED",
    },

    WEB3_LOGIN: {
        key: "WEB3_LOGIN",
        loading: true,
        message: "AUTHORIZING",
    },

    MESSAGE_SIGNING: {
        key: "WEB3_LOGIN",
        loading: true,
        message: "SIGNING MESSAGE",
    },

    CONNECTED: {
        key: "CONNECTED",
        loading: false,
        message: "CONNECTED",
    },
};