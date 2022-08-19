import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ReplayIcon from "@mui/icons-material/Replay";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { useAuthConfig } from "@/services/auth";
import Ship from "@/game/Ship";
import { DEFAULT_SHIP, ETHERSCAN_URL } from "@/config/constants";
import { useGameConfig } from "@/services/game";

interface GameOverProps {
  handleReplay: () => void;
  victory: boolean;
  hasNft: boolean;
}

export const GameOver = ({ victory, handleReplay, hasNft }: GameOverProps) => {
  const [claimed, setClaimed] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [NFT, setNFT] = useState<Ship>(DEFAULT_SHIP);
  const [transactionId, setTransactionId] = useState<string>();
  const { userInfo } = useAuthConfig();

  const claimNFT = async () => {
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

    setLoading(true);

    const response = await fetch(
      "https://demo.peppergaming.com/api/nfts/claim_demo_nft",
      requestOptions
    );

    const json = await response.json();

    if (json.attributes != null) {
      const attributes = json?.attributes.reduce((map: any, obj: any) => {
        map[obj.type.toLowerCase()] = obj.value.toLowerCase();
        return map;
      }, {});

      const ship = new Ship(
        json.name,
        json.edition,
        json.image_url,
        attributes
      );
      setTransactionId(json.transactions[0].hex);
      setNFT(ship);
      setLoading(false);
      setClaimed(true);
    }
  };

  if (hasNft || !victory) {
    return (
      <Stack alignItems={"center"} direction={"column"}>
        <Stack
          direction={"column"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          spacing={1}
          mt={10}
        >
          <Typography variant={"overline"}>
            {victory ? "WAGMI" : "NGMI"}
          </Typography>
          <Typography variant={"h1"}>
            {victory ? "You Won" : "Game Over"}
          </Typography>
          <Typography variant={"body2"}>
            {victory ? "" : "Don't worry, we know it's not easy to win"}
          </Typography>
        </Stack>
        <Button
          sx={{ color: "white", marginTop: "10rem" }}
          endIcon={<ReplayIcon />}
          onClick={handleReplay}
        >
          Replay
        </Button>
      </Stack>
    );
  }

  return claimed ? (
    <ClaimedSuccess
      NFT={NFT}
      handleReplay={handleReplay}
      transactionId={transactionId}
    />
  ) : (
    <Claim
      claimNFT={claimNFT}
      isLoading={isLoading}
      handleReplay={handleReplay}
    />
  );
};

interface ClaimProps {
  claimNFT: () => void;
  handleReplay: () => void;
  isLoading: boolean;
}

const Claim = ({ claimNFT, handleReplay, isLoading }: ClaimProps) => {
  return (
    <Stack mt={10} alignItems={"center"} direction={"column"}>
      <Typography variant={"h1"}>You Won</Typography>
      <Stack sx={{ textAlign: "center" }}>
        <Typography variant={"h4"}>
          {!isLoading
            ? "Click on claim to receive a new NFT Ship!"
            : "Getting your nft..."}
        </Typography>
        <img
          alt={"default_ship"}
          src={"/images/claim_placeholder.png"}
          height={"180px"}
          width={"180px"}
          style={{ alignSelf: "center", marginTop: "2rem" }}
        />
        <Stack mt={6} direction={"column"}>
          <Button
            size={"large"}
            fullWidth
            variant={"contained"}
            onClick={claimNFT}
            disabled={isLoading}
          >
            <span style={{ color: "white" }}>
              {isLoading ? <CircularProgress color={"inherit"} /> : "Claim"}
            </span>
          </Button>
          <Button
            sx={{ color: "white", marginTop: "1rem" }}
            endIcon={<ReplayIcon />}
            onClick={handleReplay}
          >
            Replay
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

interface ClaimSuccessProps {
  NFT: Ship;
  handleReplay: () => void;
  transactionId?: string;
}

const ClaimedSuccess = ({
  NFT,
  handleReplay,
  transactionId,
}: ClaimSuccessProps) => {
  const { refreshShips } = useGameConfig();

  useEffect(() => {
    refreshShips();
  }, []);
  return (
    <Stack alignItems={"center"} direction={"column"}>
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        spacing={1}
        mt={10}
      >
        <Typography variant={"overline"}>Claimed</Typography>
        <Typography variant={"h1"}>You received a new NFT!</Typography>
        <Typography variant={"h4"}>{NFT.name}</Typography>
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
        <Link href={`${ETHERSCAN_URL}/tx/${transactionId}`} target="_blank">
          Check it on EtherScan
        </Link>
        <Button
          sx={{ color: "white", marginTop: "10rem" }}
          endIcon={<ReplayIcon />}
          onClick={handleReplay}
        >
          Replay
        </Button>
      </Stack>
    </Stack>
  );
};
