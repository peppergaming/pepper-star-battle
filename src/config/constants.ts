/**
 * Keys
 */
import Ship from "@/game/Ship";

export const isDev = process.env.NODE_ENV === "development";

export const CHAIN_RPC_URL = "https://rpc.ankr.com/eth_goerli";
export const ETHERSCAN_URL = "https://goerli.etherscan.io/";
export const PEPPER_SHIPS_CONTRACT_ADDRESS =
  "0x446Bd77640e840DAeC081ca4112733D14e5Cc158";

export const DEFAULT_SHIP = new Ship(
  "default",
  -1,
  "/images/ships/default.png",
  {
    color: "red",
    engine: "turbo",
  }
);
