import {CHAIN_RPC_URL, isDev, LOGIN_STATUS} from "@/config/constants";
import {createContext, useContext, useEffect, useState} from "react";
import {
  ADAPTER_STATUS,
  EventSubscriber,
  PepperLogin,
  PepperLoginOptions,
  PepperWallet,
  UserInfo,
} from "@peppergaming/auth";

import {Provider} from "@ethersproject/abstract-provider";
import {ethers} from "ethers";

export type OauthStatus = "none" | "pending" | "success";

export interface AuthConfigContextInterface {
  userInfo?: Partial<UserInfo>;
  isLoading: boolean;
  isPepperLogged: boolean;
  loginStatus: { key: string; loading: boolean; message: string };
  socialLogin: (
    provider: string,
    hint?: string,
    loginToken?: string
  ) => Promise<Provider | null>;
  refreshLogin: (loginToken?: string) => Promise<PepperWallet | null>;
  metaMaskLogin: () => Promise<void>;
  walletConnectLogin: () => Promise<void>;
  provider?: Provider;
  logout: () => Promise<void>;
}

export const AuthConfigContext = createContext<AuthConfigContextInterface>({
  isLoading: false,
  isPepperLogged: false,
  loginStatus: LOGIN_STATUS.DISCONNECTED,
  metaMaskLogin: async () => {
  },
  walletConnectLogin: async () => {
  },
  socialLogin: async () => null,
  refreshLogin: async () => null,
  logout: async () => {
  },
});

export const useAuthConfig = () => useContext(AuthConfigContext);

interface AuthConfigProviderProps {
  children?: any;
}

export const AuthConfigProvider = ({children}: AuthConfigProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isPepperLogged, setIsPepperLogged] = useState<boolean>(false);
  const [loginStatus, setLoginStatus] = useState<any>(
    LOGIN_STATUS.DISCONNECTED
  );
  const [loginSdk, setLoginSdk] = useState<PepperLogin | null>(null);

  const [provider, setProvider] = useState<Provider>()

  const [userInfo, setUserInfo] = useState<Partial<UserInfo>>()


  const initialize = async (isMobile = false) => {
    setIsLoading(true);
    const provider = new ethers.providers.JsonRpcProvider(
      CHAIN_RPC_URL,
      {
        chainId: 4, name: "Ankr Rinkeby RPC",
      })
    setProvider(provider);

    const eventSubscriber: EventSubscriber = {
      async onConnected(userInfo: UserInfo, pepperAccessToken?: string) {
        setUserInfo({
          publicAddress: userInfo.publicAddress,
          name: userInfo.name,
          email: userInfo.email,
          typeOfLogin: userInfo.typeOfLogin,
          verifier: userInfo.verifier,
          verifierId: userInfo.verifierId,
        })

        setIsPepperLogged(true);
        setLoginStatus(LOGIN_STATUS.CONNECTED);
        setIsLoading(false);
      },
      async onConnecting() {
        setLoginStatus(LOGIN_STATUS.WEB3_LOGIN);
      },
      async onAuthChallengeSigning() {
        setLoginStatus(LOGIN_STATUS.WEB3_LOGIN);
      },
      async onDisconnected() {
        console.debug();
        setLoginStatus(LOGIN_STATUS.DISCONNECTED);
      },
      async onErrored(error: any) {
        console.error("Error from pepper sdk: ", error);
        // HINT: handle here the errors in your preferred way,
        // here we simply log out the auth session. However,for certain errors,
        // you may want to perform custom actions (e.g. user notification)

        await pepperSdk?.logout();
      },
    };

    let options: PepperLoginOptions = {
      isDevelopment: isDev,
      isMobile: isMobile,
      logLevel: isDev ? "debug" : "info",
      eventSubscriber,
    };

    const pepperSdk = new PepperLogin(options);

    await pepperSdk.init();

    setLoginSdk(pepperSdk);

    setIsLoading(false);
  };

  const socialLogin = async (
    provider: any,
    hint?: string,
    loginToken?: string
  ) => {
    let web3Provider: Provider | null = null;
    if (loginSdk && loginSdk.status === ADAPTER_STATUS.READY) {
      try {
        setIsLoading(true);
        setLoginStatus(LOGIN_STATUS.WEB3_LOGIN);
        web3Provider = await loginSdk.connectTo(
          provider,
          hint,
          loginToken || undefined
        );
        if (web3Provider) {
          // const pepperAccessToken = loginSdk.pepperAccessToken;

        }
      } catch (e) {
        console.log(e);
        await logout();
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("Login sdk not ready!");
    }
    return web3Provider;
  };

  const refreshLogin = async (loginToken?: string) => {
    if (loginSdk) {
      return await loginSdk.refreshPepperLogin(loginToken);
    }
    return null;
  };

  const metaMaskLogin = async () => {
    setIsLoading(true);
    await loginSdk?.connectToMetaMask();
  };

  const walletConnectLogin = async () => {
    setIsLoading(true);
    await loginSdk?.connectToWalletConnect();
  };

  const logout = async () => {
    await loginSdk?.logout();
    setIsPepperLogged(false);
    setLoginStatus(LOGIN_STATUS.DISCONNECTED);
    setUserInfo(undefined)
    setIsLoading(false);
  };

  useEffect(() => {
    initialize();
  }, []);


  const contextProvider = {
    userInfo,
    isLoading,
    isPepperLogged,
    loginStatus,
    provider,
    socialLogin,
    refreshLogin,
    metaMaskLogin,
    walletConnectLogin,
    logout,
  };
  return (
    <AuthConfigContext.Provider value={contextProvider}>
      {children}
    </AuthConfigContext.Provider>
  );
};
