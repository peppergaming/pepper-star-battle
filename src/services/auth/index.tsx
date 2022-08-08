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
  signer?: PepperWallet;
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
  const [signer, setSigner] = useState<PepperWallet>()

  const [userInfo, setUserInfo] = useState<Partial<UserInfo>>()


  const initialize = async (isMobile = false) => {
    setIsLoading(true);

    const eventSubscriber: EventSubscriber = {
      async onConnected(userInfo: UserInfo, provider: Provider, signer: PepperWallet) {
        setUserInfo(userInfo)
        setIsPepperLogged(true);
        setLoginStatus(LOGIN_STATUS.CONNECTED);
        setProvider(provider);
        setSigner(signer);
        setIsLoading(false);
      },
      async onConnecting() {
        setLoginStatus(LOGIN_STATUS.WEB3_LOGIN);
      },
      async onAuthChallengeSigning() {
        setLoginStatus(LOGIN_STATUS.WEB3_LOGIN);
      },
      async onDisconnected() {
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
      chainConfig: {chainId: 4, name: "Ankr Rinkeby RPC", rpcTarget: CHAIN_RPC_URL},
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
          setProvider(web3Provider);
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
    setUserInfo(undefined);
    setProvider(undefined);
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
    signer,
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
