/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  PEPPER_ACCESS_TOKEN_KEY,
  USER_WEB3_PROFILE_KEY,
} from "../../config/constants";
import useStorage from "../../utils/storage";

export interface UserWeb3Profile {
  publicAddress?: string | null;
  name: string | null | undefined;
  email: string | null | undefined;
  typeOfLogin: string | null | undefined;
  verifier: string | null | undefined;
  verifierId: string | null | undefined;
}

export interface AuthState {
  userWeb3Profile: UserWeb3Profile | null;
  pepperAccessToken: string | null;
}

const getCachedPepperAccessToken = () => {
  const storage = useStorage();
  let cachedToken: string | null = storage.getItem(
    PEPPER_ACCESS_TOKEN_KEY,
    "local"
  );
  if (cachedToken == "null") {
    cachedToken = null;
  }
  return cachedToken;
};

const setCachedPepperAccessToken = (accessToken: string | null) => {
  const storage = useStorage();
  if (accessToken === null) {
    storage.removeItem(PEPPER_ACCESS_TOKEN_KEY, "local");
    return;
  }
  storage.setItem(PEPPER_ACCESS_TOKEN_KEY, accessToken, "local");
};

const getCachedUserWeb3Profile: () => any = () => {
  const storage = useStorage();
  let cachedProfile: string | null = storage.getItem(
    USER_WEB3_PROFILE_KEY,
    "local"
  );
  if (!cachedProfile || cachedProfile == "null") {
    cachedProfile = null;
  } else {
    cachedProfile = JSON.parse(cachedProfile);
  }

  return cachedProfile;
};

const setCachedUserWeb3Profile = (userWeb3Profile: UserWeb3Profile | null) => {
  const storage = useStorage();
  if (!userWeb3Profile) {
    storage.removeItem(USER_WEB3_PROFILE_KEY, "local");
    return;
  }
  storage.setItem(
    USER_WEB3_PROFILE_KEY,
    JSON.stringify(userWeb3Profile),
    "local"
  );
};

const slice = createSlice({
  name: "auth",
  initialState: {
    userWeb3Profile: getCachedUserWeb3Profile() || null,
    pepperAccessToken: getCachedPepperAccessToken() || null,
  } as AuthState,
  reducers: {
    setUserWeb3Profile(
      state,
      {
        payload: { userWeb3Profile },
      }: PayloadAction<{
        userWeb3Profile: UserWeb3Profile | null;
      }>
    ) {
      const cachedProfile = getCachedUserWeb3Profile();
      if (
        userWeb3Profile &&
        cachedProfile &&
        cachedProfile.typeOfLogin &&
        cachedProfile.email === userWeb3Profile.email
      ) {
        userWeb3Profile.typeOfLogin = cachedProfile.typeOfLogin;
      }
      setCachedUserWeb3Profile(userWeb3Profile);
      state.userWeb3Profile = userWeb3Profile;
    },
    setPepperAccessToken: (
      state,
      {
        payload: { accessToken },
      }: PayloadAction<{ accessToken: string | null }>
    ) => {
      setCachedPepperAccessToken(accessToken);
      state.pepperAccessToken = accessToken;
    },
  },
});

export const { setUserWeb3Profile, setPepperAccessToken } = slice.actions;

export default slice.reducer;
