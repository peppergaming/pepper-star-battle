import Ship from "@/game/Ship"
import {createContext, useContext, useState} from "react";

export interface GameConfigContextInterface {
  ships: Ship[]
  refreshShips: () => Promise<void>
}

export const GameConfigContext = createContext<GameConfigContextInterface>({
  ships: [],
  refreshShips: async () => {
  }
})

export const useGameConfig = () => useContext(GameConfigContext);

export const GameConfigProvider = ({children}: any) => {

  const [ships, setShips] = useState<Ship[]>([]);

  const refreshShips = async () => {

  }

  const contextProvider = {
    ships,
    refreshShips
  }

  return (
    <GameConfigContext.Provider value={contextProvider}>
      {children}
    </GameConfigContext.Provider>
  )

}