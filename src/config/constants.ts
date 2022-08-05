/**
 * Keys
 */
export const isDev = process.env.NODE_ENV === "development";
export const PEPPER_OAUTH_TOKEN_KEY = "PEPPER_OAUTH_TOKEN_KEY";

export const PEPPER_SERVER_URL =
    process.env.NEXT_PUBLIC_PEPPER_SERVER_URL || "http://localhost:5555";

export interface IObjectKeys {
    [key: string]: any;
}

export const CHAIN_RPC_URL = "https://rpc.ankr.com/eth_rinkeby"
export const PEPPER_SHIPS_CONTRACT_ADDRESS = "0x7E0be239358a083A9202d201Ce2b5aAd900fF668"
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