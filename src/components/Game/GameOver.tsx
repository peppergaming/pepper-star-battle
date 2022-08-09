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
  const [claimed, setClaimed] = useState(false);
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
        const tokenData = JSON.parse(result)[0];
        console.debug(tokenData)
        const attributes = tokenData?.attributes.reduce((map: any, obj: any) => {
          map[obj.type.toLowerCase()] = obj.value.toLowerCase()
          return map
        }, {})

        const ship = new Ship(tokenData.name, tokenData.edition, tokenData.image_url, attributes);

        setNFT(ship);
        setClaimed(true);
      })
      .catch((error) => console.log("error", error));
  };

  if (hasNft || !victory) {
    return <Stack alignItems={"center"} direction={"column"}>
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
      <Button
        sx={{color: "white", marginTop: "10rem"}}
        endIcon={<ReplayIcon/>}
        onClick={handleReplay}
      >
        Replay
      </Button>
    </Stack>
  }

  return claimed ? (
    <ClaimedSuccess NFT={NFT} handleReplay={handleReplay}/>
  ) : (
    <Claim claimNFT={claimNFT} handleReplay={handleReplay}/>
  );
};

const Claim = ({claimNFT, handleReplay}) => {
  return <Stack mt={10} alignItems={"center"} direction={"column"}>
    <Typography variant={"h3"} fontWeight={"bolder"} color={"white"}>
      You Won
    </Typography>
    <Stack sx={{textAlign: "center"}}>
      <Typography
        fontSize={16}
        sx={{color: "whitesmoke", marginTop: "0"}}
      >
        Click on claim to receive a new NFT Ship!
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
  </Stack>
}

const ClaimedSuccess = ({NFT, handleReplay}) => {
  return <Stack alignItems={"center"} direction={"column"}>
    <Stack
      direction={"column"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      spacing={1}
      mt={10}
    >
      <Typography variant={"subtitle1"} fontWeight={"bold"} color={"gray"}>
        Claimed
      </Typography>
      <Typography fontSize={32} fontWeight={"bolder"} color={"white"}>
        You received a new NFT!
      </Typography>
      <Typography variant={"subtitle1"} fontWeight={"bold"} color={"white"}>
        {NFT.name}
      </Typography>
    </Stack>
    <Stack spacing={2}>
      <img
        src={NFT.getNFTImage()}
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
}
