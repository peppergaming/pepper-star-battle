/**
 * Keys
 */

export const PEPPER_ACCESS_TOKEN_KEY = "PEPPER_ACCESS_TOKEN";
export const PEPPER_OAUTH_TOKEN_KEY = "PEPPER_OAUTH_TOKEN_KEY";
export const PEPPER_OAUTH_SUCCESS = "PEPPER_OAUTH_SUCCESS";
export const USER_WEB3_PROFILE_KEY = "USER_WEB3_PROFILE";
export const WEB3AUTH_CACHED_ADAPTER_KEY = "Web3Auth-cachedAdapter";
export const WALLET_CONNECT_KEY = "walletconnect";



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