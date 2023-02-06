import { CHAIN_RPC_URL, isDev } from "@/config/constants";
import { createContext, useContext, useEffect, useState } from "react";
import {
  ADAPTER_STATUS,
  EventSubscriber,
  PepperLogin,
  PepperLoginOptions,
  PepperWallet,
  UserInfo,
} from "@peppergaming/auth";

import { Provider } from "@ethersproject/abstract-provider";

export interface AuthConfigContextInterface {
  userInfo?: Partial<UserInfo>;
  isLoading: boolean;
  isPepperLogged: boolean;
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
  metaMaskLogin: async () => {},
  walletConnectLogin: async () => {},
  socialLogin: async () => null,
  refreshLogin: async () => null,
  logout: async () => {},
});

export const useAuthConfig = () => useContext(AuthConfigContext);

interface AuthConfigProviderProps {
  children?: any;
}

export const AuthConfigService = ({ children }: AuthConfigProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isPepperLogged, setIsPepperLogged] = useState<boolean>(false);

  const [loginSdk, setLoginSdk] = useState<PepperLogin | null>(null);

  const [provider, setProvider] = useState<Provider>();
  const [signer, setSigner] = useState<PepperWallet>();

  const [userInfo, setUserInfo] = useState<Partial<UserInfo>>();

  const initialize = async (isMobile = false) => {
    setIsLoading(true);

    const eventSubscriber: EventSubscriber = {
      async onConnected(
        userInfo: UserInfo,
        provider: Provider,
        signer: PepperWallet
      ) {
        setUserInfo(userInfo);
        setIsPepperLogged(true);
        setProvider(provider);
        setSigner(signer);
        setIsLoading(false);
        console.debug("Connected");
      },
      onDeepHydrationCompleted: async function (success) {
        if (!success) {
          setIsLoading(false);
        }
      },
      async onConnecting() {
        console.debug("Connecting");
      },
      async onAuthChallengeSigning() {
        console.debug("AuthChallengeSingning");
      },
      async onDisconnected() {
        console.debug("Disconnected");
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
      chainConfig: {
        chainId: "5",
        name: "Ankr Goerli RPC",
        rpcTarget: CHAIN_RPC_URL,
      },
      isDevelopment: isDev,
      isMobile: isMobile,
      logLevel: isDev ? "debug" : "info",
      eventSubscriber,
      deepHydration: true,
    };

    const pepperSdk = new PepperLogin(options);

    const initInfo = await pepperSdk.init();
    console.debug("Pepper login init info: ", initInfo);

    setLoginSdk(pepperSdk);
    if (!initInfo.willDeepHydrate) {
      setIsLoading(false);
    }
  };

  const socialLogin = async (
    provider: any,
    hint?: string,
    loginToken?: string
  ) => {
    let web3Provider: Provider | null = null;
    console.debug(loginSdk);
    if (loginSdk && loginSdk.status === ADAPTER_STATUS.READY) {
      try {
        setIsLoading(true);
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
