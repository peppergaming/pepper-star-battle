import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ReplayIcon from "@mui/icons-material/Replay";
import Link from "@mui/material/Link";
import React, {useState} from "react";
import {useAuthConfig} from "@/services/auth";
import Ship from "@/game/Ship";
import {DEFAULT_SHIP} from "@/config/constants";

interface GameOverProps {
  handleReplay: () => void;
  victory: boolean;
  hasNft: boolean;
}

export const GameOver = ({victory, handleReplay, hasNft}: GameOverProps) => {
  const [claimed, setClaimed] = useState(hasNft);
  /* Change default ship with Ship read onchain #8 */
  const [NFT, setNFT] = useState<Ship>(DEFAULT_SHIP);
  const {userInfo} = useAuthConfig();

  const claimNFT = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      address: userInfo?.publicAddress,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(
      "https://demo.peppergaming.com/api/nfts/claim_demo_nft",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const JSONObject = JSON.parse(result);
        setNFT(JSONObject[0]);
        setClaimed(true);
      })
      .catch((error) => console.log("error", error));
  };

  const checkIpfs = (value: string) => {
    if (value.includes("ipfs")) {
      return value.replace("ipfs://", "https://ipfs.io/ipfs/");
    } else {
      return value;
    }
  };

  return claimed && victory ? (
    <Stack alignItems={"center"} direction={"column"}>
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        spacing={1}
        mt={10}
      >
        <Typography variant={"subtitle1"} fontWeight={"bold"} color={"gray"}>
          Yeeeeeeeh
        </Typography>
        <Typography fontSize={32} fontWeight={"bolder"} color={"white"}>
          You Won {NFT.name}!
        </Typography>
        <Typography variant={"subtitle1"} fontWeight={"bold"} color={"white"}>
          Claimed!
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <img
          src={checkIpfs(NFT.getNFTImage())}
          height={"180px"}
          width={"180px"}
          alt={"claimed_ship"}
          style={{
            alignSelf: "center",
            marginTop: "2rem",
            border: "2px solid gold",
          }}
        />
        <Link href={"https://etherscan.com"}>Check it on EtherScan</Link>
        <Button
          sx={{color: "white", marginTop: "10rem"}}
          endIcon={<ReplayIcon/>}
          onClick={handleReplay}
        >
          Replay
        </Button>
      </Stack>
    </Stack>
  ) : (
    <Stack alignItems={"center"} direction={"column"}>
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        spacing={1}
        mt={10}
      >
        <Typography variant={"subtitle1"} fontWeight={"bold"} color={"gray"}>
          {victory ? "Yeeeh" : "Nooo"}
        </Typography>
        <Typography variant={"h3"} fontWeight={"bolder"} color={"white"}>
          {victory ? "You Won" : "Game Over"}
        </Typography>
      </Stack>
      {victory ? (
        <Stack sx={{textAlign: "center"}}>
          <Typography
            fontSize={16}
            sx={{color: "whitesmoke", marginTop: "0"}}
          >
            Click on claim to receive it in your wallet
          </Typography>
          <img
            alt={"default_ship"}
            src={"/images/ship1.jpg"}
            height={"180px"}
            width={"180px"}
            style={{alignSelf: "center", marginTop: "2rem"}}
          />
          <Stack mt={6} direction={"column"}>
            <Button
              size={"large"}
              fullWidth
              variant={"contained"}
              onClick={claimNFT}
            >
              Claim
            </Button>
            <Button
              sx={{color: "white", marginTop: "1rem"}}
              endIcon={<ReplayIcon/>}
              onClick={handleReplay}
            >
              Replay
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Button
          sx={{color: "white", marginTop: "10rem"}}
          endIcon={<ReplayIcon/>}
          onClick={handleReplay}
        >
          Replay
        </Button>
      )}
    </Stack>
  );
};
