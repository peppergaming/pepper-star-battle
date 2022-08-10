import Typography from "@mui/material/Typography";
import style from "./Login.module.scss";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import GoogleIcon from "../../assets/icons/GoogleIcon";
import TwitchIcon from "../../assets/icons/TwitchIcon";
import DiscordIcon from "../../assets/icons/DiscordIcon";
import IconButton from "@mui/material/IconButton";
import { useAuthConfig } from "@/services/auth";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorIcon from "@mui/icons-material/Error";

export interface ErrorViewProps {
  message?: string;
}

export interface LoadingViewProps {
  authorizing: boolean;
}

export interface LoginFormViewProps {
  isPepperLogged: boolean;
  onEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
  loginWithEmail: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithDiscord: () => Promise<void>;
  loginWithTwitch: () => Promise<void>;
}

export const Login = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {
    isPepperLogged,
    isLoading: isAuthConfigLoading,
    socialLogin,
  } = useAuthConfig();

  const [isLoading, setIsLoading] = useState<boolean>(isAuthConfigLoading);
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const triggerLogin = async (provider: any, hint?: string) => {
    setIsAuthorizing(true);
    try {
      await socialLogin(provider, hint);
    } catch (e) {
      setError(e as string);
    }

    setIsAuthorizing(false);
  };

  const loginWithEmail = async () => {
    if (email) {
      await triggerLogin("email_passwordless", email);
    }
  };

  const loginWithGoogle = async () => {
    await triggerLogin("google");
  };

  const loginWithTwitch = async () => {
    await triggerLogin("twitch");
  };

  const loginWithDiscord = async () => {
    await triggerLogin("discord");
  };

  useEffect(() => {
    if (!isAuthConfigLoading && isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [isAuthConfigLoading]);

  if (error) {
    return <ErrorView message={error} />;
  }

  return isLoading || isAuthConfigLoading || isAuthorizing ? (
    <LoadingView authorizing={isAuthorizing} />
  ) : (
    <LoginFormView
      isPepperLogged={isPepperLogged}
      onEmailChange={handleEmailChange}
      loginWithEmail={loginWithEmail}
      loginWithGoogle={loginWithGoogle}
      loginWithDiscord={loginWithDiscord}
      loginWithTwitch={loginWithTwitch}
    />
  );
};

const ErrorView = ({ message }: ErrorViewProps) => {
  return (
    <Stack direction={"column"} spacing={3} alignItems={"center"}>
      <ErrorIcon sx={{ fontSize: 60 }} color={"error"} />
      <Typography variant={"h5"} color={"error"}>
        Error
      </Typography>
      {message && <Typography variant={"h3"}>{message}</Typography>}
    </Stack>
  );
};

const AuthorizedView = () => {
  return (
    <Stack
      direction={"column"}
      spacing={3}
      alignItems={"center"}
      sx={{ padding: "16rem" }}
    >
      <Typography sx={{ color: "white", fontSize: "35px" }}>
        Login Successful
      </Typography>
    </Stack>
  );
};

const LoadingView = ({ authorizing }: LoadingViewProps) => {
  const loadMessage = authorizing ? "Authorizing" : "Loading";
  return (
    <Stack
      direction={"column"}
      sx={{ marginTop: "12rem" }}
      alignItems={"center"}
      spacing={3}
    >
      <CircularProgress size={"4rem"} color="primary" />
      <Typography variant={"h3"} sx={{ color: "white" }}>
        {loadMessage}
      </Typography>
    </Stack>
  );
};

const LoginFormView = ({
  isPepperLogged,
  onEmailChange,
  loginWithDiscord,
  loginWithGoogle,
  loginWithTwitch,
  loginWithEmail,
}: LoginFormViewProps) => {
  const { userInfo } = useAuthConfig();

  return isPepperLogged && userInfo ? (
    <AuthorizedView />
  ) : (
    <div className={style.Login}>
      <Typography fontWeight={600} fontSize={25} sx={{ color: "white" }}>
        Starship Battle
      </Typography>
      <Typography mt={1} mb={6} fontSize={16} sx={{ color: "white" }}>
        Demo of the capabilities of Pepper Web3 SDK
      </Typography>
      <Stack mb={3} direction={"column"} spacing={4}>
        <TextField
          className={style.EmailInput}
          id={"login-mail"}
          fullWidth
          label={"email"}
          color={"secondary"}
          InputLabelProps={{
            style: {
              color: "whitesmoke",
            },
          }}
          sx={{
            input: { color: "whitesmoke" },
            label: { color: "whitesmoke" },
          }}
          placeholder={"username@example.com"}
          onChange={onEmailChange}
          onKeyUp={async (e) => {
            if (e.key === "Enter") {
              await loginWithEmail();
            }
          }}
        />

        <Button
          size={"large"}
          className={style.EmailButton}
          fullWidth
          variant={"contained"}
          onClick={loginWithEmail}
        >
          Get Started
        </Button>
      </Stack>
      <Divider />
      <Stack direction={"column"}>
        <Typography
          mt={2}
          mb={2}
          variant={"body2"}
          sx={{ color: "whitesmoke" }}
        >
          or sign in with your favorite
        </Typography>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          direction={"row"}
          spacing={3}
          sx={{ color: "whitesmoke" }}
        >
          <IconButton
            sx={{ color: "white" }}
            onClick={loginWithGoogle}
            title="Google"
          >
            <GoogleIcon />
          </IconButton>

          <IconButton
            sx={{ color: "white" }}
            onClick={loginWithDiscord}
            title="Discord"
          >
            <DiscordIcon />
          </IconButton>

          <IconButton
            sx={{ color: "white" }}
            onClick={loginWithTwitch}
            title="Twitch"
          >
            <TwitchIcon />
          </IconButton>
        </Stack>
      </Stack>
    </div>
  );
};
