/**
 * Keys
 */
import Ship from "@/game/Ship";

export const isDev = process.env.NODE_ENV === "development";

export const CHAIN_RPC_URL = "https://rpc.ankr.com/eth_rinkeby"
export const ETHERSCAN_URL = "https://rinkeby.etherscan.io/"
export const PEPPER_SHIPS_CONTRACT_ADDRESS = "0x90A96FCa895860A945515c39d5945E854f17e95f"
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

export const DEFAULT_SHIP = new Ship("default", -1, "/images/ships/default.png", {
    color: "red",
    engine: "turbo"
});