/**
 * Keys
 */
import Ship from "@/game/Ship";

export const isDev = process.env.NODE_ENV === "development";

export const CHAIN_RPC_URL = "https://rpc.ankr.com/eth_rinkeby";
export const ETHERSCAN_URL = "https://rinkeby.etherscan.io/";
export const PEPPER_SHIPS_CONTRACT_ADDRESS =
  "0x90A96FCa895860A945515c39d5945E854f17e95f";

export const DEFAULT_SHIP = new Ship(
  "default",
  -1,
  "/images/ships/default.png",
  {
    color: "red",
    engine: "turbo",
  }
);
