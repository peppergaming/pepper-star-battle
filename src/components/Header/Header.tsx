import React, {useEffect} from "react";
import Toolbar from "@mui/material/Toolbar";
import style from "./Header.module.scss";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Link from '@mui/material/Link';
import {UserWidget} from "./UserWidget";
import {useAuthConfig} from "@/services/auth";
import {ethers} from "ethers";
import ContractAbi from "@/assets/web3/contract_abi.json"
import {JsonRpcProvider} from "@ethersproject/providers";
import {PEPPER_SHIPS_CONTRACT_ADDRESS} from "@/config/constants";

export const Header = () => {
  const {userInfo, isPepperLogged, provider} = useAuthConfig();

  const testProvider = async () => {
    if (provider) {
      const prov = (provider as JsonRpcProvider);
      const accounts = await prov.listAccounts();
      console.debug("accounts: ", accounts)

      const contract = new ethers.Contract(
        PEPPER_SHIPS_CONTRACT_ADDRESS,
        ContractAbi,
        prov,
      )
      const balance = await contract.balanceOf(userInfo?.publicAddress);
      console.debug("balance: ", balance);

      const userTokens = await contract.walletOfOwner(userInfo?.publicAddress)
      console.debug("user tokens: ")
      for (const nft of userTokens) {
        let tokenID = nft.toNumber();

        const tokenURI = await contract.tokenURI(tokenID)
        console.debug(`> ${tokenID}:  `, tokenURI)

        console.debug()
      }
    }
  }
  useEffect(() => {
    if(userInfo){
      testProvider();
    }
  }, [userInfo])

  return (
    <AppBar
      elevation={0}
      position="static"
      enableColorOnDark={true}
      color="inherit"
      className={style.Header}
    >
      <Toolbar sx={{minHeight: "auto!important", height: "100%!important"}}>
        <div className={style.LeftBox}>
          <img src={"/images/logo_white.png"} alt={"Pepper logo"} style={{width: "100px"}}/>
          <Stack direction={"row"} spacing={3} ml={5}>
            <Link href="https://peppergaming.com" target="_blank">
              Website
            </Link>
            <Link href="https://app.peppergaming.com" target="_blank">
              App
            </Link>
            <Link href="https://github.com/peppergaming/auth" target="_blank">
              SDK
            </Link>
          </Stack>
        </div>
        <div>
          {isPepperLogged && userInfo && (
            <UserWidget user={userInfo}/>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
