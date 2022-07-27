import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PEPPER_API_URL } from "../../config/constants";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "@/store/store";

// initialize an empty api service that will be injected with endpoints later as needed
export const baseSplitApi = createApi({
  reducerPath: "pepperApi",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as AppState).auth.pepperAccessToken;
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
    baseUrl: `${PEPPER_API_URL}`,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: () => ({}),
});
