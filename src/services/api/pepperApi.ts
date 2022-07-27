import { baseSplitApi as api } from "./baseApi";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postDiagnosticReport: build.mutation<
      PostDiagnosticReportApiResponse,
      PostDiagnosticReportApiArg
    >({
      query: (queryArg) => ({
        url: `/analytics/diagnostic_report`,
        method: "POST",
        body: queryArg.diagnosticReport,
      }),
    }),
    postFirstAppOpen: build.mutation<
      PostFirstAppOpenApiResponse,
      PostFirstAppOpenApiArg
    >({
      query: (queryArg) => ({
        url: `/analytics/first_open`,
        method: "POST",
        body: queryArg.deviceSpecsModel,
      }),
    }),
    postLocalHelp: build.mutation<
      PostLocalHelpApiResponse,
      PostLocalHelpApiArg
    >({
      query: (queryArg) => ({
        url: `/analytics/local_help`,
        method: "POST",
        body: queryArg.localHelpModel,
      }),
    }),
    postLocalAppStart: build.mutation<
      PostLocalAppStartApiResponse,
      PostLocalAppStartApiArg
    >({
      query: (queryArg) => ({
        url: `/analytics/local_start_app`,
        method: "POST",
        body: queryArg.localStartAppModel,
      }),
    }),
    postLocalStartMining: build.mutation<
      PostLocalStartMiningApiResponse,
      PostLocalStartMiningApiArg
    >({
      query: (queryArg) => ({
        url: `/analytics/local_start_mining`,
        method: "POST",
        body: queryArg.localStartMiningModel,
      }),
    }),
    postLocalAppStop: build.mutation<
      PostLocalAppStopApiResponse,
      PostLocalAppStopApiArg
    >({
      query: (queryArg) => ({
        url: `/analytics/local_stop_app`,
        method: "POST",
        body: queryArg.localStopAppModel,
      }),
    }),
    postLocalStopMining: build.mutation<
      PostLocalStopMiningApiResponse,
      PostLocalStopMiningApiArg
    >({
      query: (queryArg) => ({
        url: `/analytics/local_stop_mining`,
        method: "POST",
        body: queryArg.localStopMiningModel,
      }),
    }),
    postAppUninstall: build.mutation<
      PostAppUninstallApiResponse,
      PostAppUninstallApiArg
    >({
      query: (queryArg) => ({
        url: `/analytics/uninstall`,
        method: "POST",
        body: queryArg.uninstall,
      }),
    }),
    postChangePassword: build.mutation<
      PostChangePasswordApiResponse,
      PostChangePasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/change_password`,
        method: "POST",
        body: queryArg.changePassword,
      }),
    }),
    getDiscordCallback: build.query<
      GetDiscordCallbackApiResponse,
      GetDiscordCallbackApiArg
    >({
      query: () => ({ url: `/auth/discord/callback` }),
    }),
    getDiscord: build.query<GetDiscordApiResponse, GetDiscordApiArg>({
      query: (queryArg) => ({ url: `/auth/discord/${queryArg.userToken}` }),
    }),
    getGoogleCallback: build.query<
      GetGoogleCallbackApiResponse,
      GetGoogleCallbackApiArg
    >({
      query: () => ({ url: `/auth/google/callback` }),
    }),
    getGoogle: build.query<GetGoogleApiResponse, GetGoogleApiArg>({
      query: (queryArg) => ({ url: `/auth/google/${queryArg.userToken}` }),
    }),
    postLogin: build.mutation<PostLoginApiResponse, PostLoginApiArg>({
      query: (queryArg) => ({
        url: `/auth/login`,
        method: "POST",
        body: queryArg.userLogin,
      }),
    }),
    postRegister: build.mutation<PostRegisterApiResponse, PostRegisterApiArg>({
      query: (queryArg) => ({
        url: `/auth/register`,
        method: "POST",
        body: queryArg.userRegister,
      }),
    }),
    postSendChangePassword: build.mutation<
      PostSendChangePasswordApiResponse,
      PostSendChangePasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/send_change_password`,
        method: "POST",
        body: queryArg.sendChangePassword,
      }),
    }),
    getSendEmailVerificationEmail: build.query<
      GetSendEmailVerificationEmailApiResponse,
      GetSendEmailVerificationEmailApiArg
    >({
      query: () => ({ url: `/auth/send_verification_email` }),
    }),
    getTwitchCallback: build.query<
      GetTwitchCallbackApiResponse,
      GetTwitchCallbackApiArg
    >({
      query: () => ({ url: `/auth/twitch/callback` }),
    }),
    getTwitch: build.query<GetTwitchApiResponse, GetTwitchApiArg>({
      query: (queryArg) => ({ url: `/auth/twitch/${queryArg.userToken}` }),
    }),
    getValidateEmail: build.query<
      GetValidateEmailApiResponse,
      GetValidateEmailApiArg
    >({
      query: () => ({ url: `/auth/validate_email` }),
    }),
    postWeb3Init: build.mutation<PostWeb3InitApiResponse, PostWeb3InitApiArg>({
      query: (queryArg) => ({
        url: `/auth/web3/init`,
        method: "POST",
        body: queryArg.userWeb3Login,
      }),
    }),
    postWeb3Verify: build.mutation<
      PostWeb3VerifyApiResponse,
      PostWeb3VerifyApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/web3/verify`,
        method: "POST",
        body: queryArg.userWeb3Verify,
      }),
    }),
    postActivateBoost: build.mutation<
      PostActivateBoostApiResponse,
      PostActivateBoostApiArg
    >({
      query: (queryArg) => ({
        url: `/boost/activate_boost`,
        method: "POST",
        body: queryArg.boostId,
      }),
    }),
    getGetActiveBoosts: build.query<
      GetGetActiveBoostsApiResponse,
      GetGetActiveBoostsApiArg
    >({
      query: () => ({ url: `/boost/active_boosts` }),
    }),
    getGetAllUserBoosts: build.query<
      GetGetAllUserBoostsApiResponse,
      GetGetAllUserBoostsApiArg
    >({
      query: () => ({ url: `/boost/boosts` }),
    }),
    postCreateCheckoutSession: build.mutation<
      PostCreateCheckoutSessionApiResponse,
      PostCreateCheckoutSessionApiArg
    >({
      query: (queryArg) => ({
        url: `/credit_card_payment/create_checkout_session`,
        method: "POST",
        body: queryArg.creditCardPaymentAmount,
      }),
    }),
    getPossibleAmounts: build.query<
      GetPossibleAmountsApiResponse,
      GetPossibleAmountsApiArg
    >({
      query: () => ({ url: `/credit_card_payment/possible_amounts` }),
    }),
    postConfirmationPaymentWebhook: build.mutation<
      PostConfirmationPaymentWebhookApiResponse,
      PostConfirmationPaymentWebhookApiArg
    >({
      query: () => ({ url: `/credit_card_payment/webhook`, method: "POST" }),
    }),
    getGames: build.query<GetGamesApiResponse, GetGamesApiArg>({
      query: () => ({ url: `/games/` }),
    }),
    postAddGameWaitingList: build.mutation<
      PostAddGameWaitingListApiResponse,
      PostAddGameWaitingListApiArg
    >({
      query: (queryArg) => ({
        url: `/games/game_waiting_list`,
        method: "POST",
        body: queryArg.gameWaitingList,
      }),
    }),
    getGameById: build.query<GetGameByIdApiResponse, GetGameByIdApiArg>({
      query: (queryArg) => ({ url: `/games/id/${queryArg.gameId}` }),
    }),
    getGameBySlug: build.query<GetGameBySlugApiResponse, GetGameBySlugApiArg>({
      query: (queryArg) => ({ url: `/games/slug/${queryArg.slug}` }),
    }),
    postSubscribedToTheGameWaitingList: build.mutation<
      PostSubscribedToTheGameWaitingListApiResponse,
      PostSubscribedToTheGameWaitingListApiArg
    >({
      query: (queryArg) => ({
        url: `/games/subscribed_to_the_waiting_list`,
        method: "POST",
        body: queryArg.gameWaitingList,
      }),
    }),
    getGamesTokens: build.query<
      GetGamesTokensApiResponse,
      GetGamesTokensApiArg
    >({
      query: () => ({ url: `/games/tokens` }),
    }),
    getGamesWithTrial: build.query<
      GetGamesWithTrialApiResponse,
      GetGamesWithTrialApiArg
    >({
      query: () => ({ url: `/games/trial_games/` }),
    }),
    getListAvGuides: build.query<
      GetListAvGuidesApiResponse,
      GetListAvGuidesApiArg
    >({
      query: () => ({ url: `/guides/anti_virus` }),
    }),
    getAllInfluencers: build.query<
      GetAllInfluencersApiResponse,
      GetAllInfluencersApiArg
    >({
      query: () => ({ url: `/influencers/` }),
    }),
    postAddCreatorCode: build.mutation<
      PostAddCreatorCodeApiResponse,
      PostAddCreatorCodeApiArg
    >({
      query: (queryArg) => ({
        url: `/influencers/add_creator_code`,
        method: "POST",
        body: queryArg.addCreatorCode,
      }),
    }),
    postDonateToInfluencer: build.mutation<
      PostDonateToInfluencerApiResponse,
      PostDonateToInfluencerApiArg
    >({
      query: (queryArg) => ({
        url: `/influencers/donate`,
        method: "POST",
        body: queryArg.donateToInfluencer,
      }),
    }),
    getDonationsOverlay: build.query<
      GetDonationsOverlayApiResponse,
      GetDonationsOverlayApiArg
    >({
      query: () => ({ url: `/influencers/donations_overlay` }),
    }),
    getReceivedDonations: build.query<
      GetReceivedDonationsApiResponse,
      GetReceivedDonationsApiArg
    >({
      query: () => ({ url: `/influencers/received_donations` }),
    }),
    postAddItem: build.mutation<PostAddItemApiResponse, PostAddItemApiArg>({
      query: (queryArg) => ({
        url: `/item/add_item`,
        method: "POST",
        body: queryArg.addItem,
      }),
    }),
    getAllStores: build.query<GetAllStoresApiResponse, GetAllStoresApiArg>({
      query: () => ({ url: `/item/stores` }),
    }),
    postSuggestItem: build.mutation<
      PostSuggestItemApiResponse,
      PostSuggestItemApiArg
    >({
      query: (queryArg) => ({
        url: `/item/suggest`,
        method: "POST",
        body: queryArg.itemSuggestion,
      }),
    }),
    postRedeemItemByType: build.mutation<
      PostRedeemItemByTypeApiResponse,
      PostRedeemItemByTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/item/type/redeem`,
        method: "POST",
        body: queryArg.redeemItem,
      }),
    }),
    getAllTypesByStore: build.query<
      GetAllTypesByStoreApiResponse,
      GetAllTypesByStoreApiArg
    >({
      query: (queryArg) => ({ url: `/item/type/${queryArg.storeName}` }),
    }),
    getGetActiveRents: build.query<
      GetGetActiveRentsApiResponse,
      GetGetActiveRentsApiArg
    >({
      query: () => ({ url: `/rental/active_rents` }),
    }),
    postExtendRentByType: build.mutation<
      PostExtendRentByTypeApiResponse,
      PostExtendRentByTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/rental/extend_rent`,
        method: "POST",
        body: queryArg.rentItem,
      }),
    }),
    postRentByType: build.mutation<
      PostRentByTypeApiResponse,
      PostRentByTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/rental/rent`,
        method: "POST",
        body: queryArg.rentItem,
      }),
    }),
    getGetUserRents: build.query<
      GetGetUserRentsApiResponse,
      GetGetUserRentsApiArg
    >({
      query: () => ({ url: `/rental/rents` }),
    }),
    getEarnings: build.query<GetEarningsApiResponse, GetEarningsApiArg>({
      query: () => ({ url: `/task/earnings` }),
    }),
    getMiningTask: build.query<GetMiningTaskApiResponse, GetMiningTaskApiArg>({
      query: () => ({ url: `/task/mining` }),
    }),
    getAddressTokensBalance: build.query<
      GetAddressTokensBalanceApiResponse,
      GetAddressTokensBalanceApiArg
    >({
      query: (queryArg) => ({
        url: `/user/address_tokens_balance/${queryArg.address}`,
      }),
    }),
    getBalance: build.query<GetBalanceApiResponse, GetBalanceApiArg>({
      query: () => ({ url: `/user/balance` }),
    }),
    postStoreEmailContact: build.mutation<
      PostStoreEmailContactApiResponse,
      PostStoreEmailContactApiArg
    >({
      query: (queryArg) => ({
        url: `/user/contact_email`,
        method: "POST",
        body: queryArg.contactEmail,
      }),
    }),
    postCountry: build.mutation<PostCountryApiResponse, PostCountryApiArg>({
      query: (queryArg) => ({
        url: `/user/country`,
        method: "POST",
        body: queryArg.sendUserCountry,
      }),
    }),
    postEmail: build.mutation<PostEmailApiResponse, PostEmailApiArg>({
      query: (queryArg) => ({
        url: `/user/email`,
        method: "POST",
        body: queryArg.sendUserEmail,
      }),
    }),
    getIsEmailVerified: build.query<
      GetIsEmailVerifiedApiResponse,
      GetIsEmailVerifiedApiArg
    >({
      query: () => ({ url: `/user/is_email_verified` }),
    }),
    getIsSteamInventoryPublic: build.query<
      GetIsSteamInventoryPublicApiResponse,
      GetIsSteamInventoryPublicApiArg
    >({
      query: () => ({ url: `/user/is_steam_inventory_public` }),
    }),
    postStoreLogs: build.mutation<
      PostStoreLogsApiResponse,
      PostStoreLogsApiArg
    >({
      query: (queryArg) => ({
        url: `/user/log`,
        method: "POST",
        body: queryArg.logEntry,
      }),
    }),
    getLoginByToken: build.query<
      GetLoginByTokenApiResponse,
      GetLoginByTokenApiArg
    >({
      query: (queryArg) => ({ url: `/user/login_token/${queryArg.userToken}` }),
    }),
    getSteamLoginCallback: build.query<
      GetSteamLoginCallbackApiResponse,
      GetSteamLoginCallbackApiArg
    >({
      query: (queryArg) => ({
        url: `/user/openid/callback/${queryArg.userToken}`,
      }),
    }),
    getOpenIdRedirect: build.query<
      GetOpenIdRedirectApiResponse,
      GetOpenIdRedirectApiArg
    >({
      query: (queryArg) => ({
        url: `/user/openid/redirect/${queryArg.userToken}`,
      }),
    }),
    postTokensBalance: build.mutation<
      PostTokensBalanceApiResponse,
      PostTokensBalanceApiArg
    >({
      query: (queryArg) => ({
        url: `/user/owned_nfts`,
        method: "POST",
        body: queryArg.nftsByGameId,
      }),
    }),
    getProfile: build.query<GetProfileApiResponse, GetProfileApiArg>({
      query: () => ({ url: `/user/profile` }),
    }),
    postRefresh: build.mutation<PostRefreshApiResponse, PostRefreshApiArg>({
      query: (queryArg) => ({
        url: `/user/refresh_token`,
        method: "POST",
        body: queryArg.refreshToken,
      }),
    }),
    postSteamTradeUrl: build.mutation<
      PostSteamTradeUrlApiResponse,
      PostSteamTradeUrlApiArg
    >({
      query: (queryArg) => ({
        url: `/user/steam/trade_url`,
        method: "POST",
        body: queryArg.tradeUrl,
      }),
    }),
    deleteSteamTradeUrl: build.mutation<
      DeleteSteamTradeUrlApiResponse,
      DeleteSteamTradeUrlApiArg
    >({
      query: () => ({ url: `/user/steam/trade_url`, method: "DELETE" }),
    }),
    getTokensBalance: build.query<
      GetTokensBalanceApiResponse,
      GetTokensBalanceApiArg
    >({
      query: () => ({ url: `/user/tokens_balance` }),
    }),
    postRequestDownload: build.mutation<
      PostRequestDownloadApiResponse,
      PostRequestDownloadApiArg
    >({
      query: (queryArg) => ({
        url: `/website/requestdownload`,
        method: "POST",
        body: queryArg.email,
      }),
    }),
    postJoinWaitingList: build.mutation<
      PostJoinWaitingListApiResponse,
      PostJoinWaitingListApiArg
    >({
      query: (queryArg) => ({
        url: `/website/waitinglist`,
        method: "POST",
        body: queryArg.email,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as pepperApi };
export type PostDiagnosticReportApiResponse = unknown;
export type PostDiagnosticReportApiArg = {
  diagnosticReport: DiagnosticReport;
};
export type PostFirstAppOpenApiResponse = unknown;
export type PostFirstAppOpenApiArg = {
  deviceSpecsModel: DeviceSpecsModel;
};
export type PostLocalHelpApiResponse = unknown;
export type PostLocalHelpApiArg = {
  localHelpModel: LocalHelpModel;
};
export type PostLocalAppStartApiResponse = unknown;
export type PostLocalAppStartApiArg = {
  localStartAppModel: LocalStartAppModel;
};
export type PostLocalStartMiningApiResponse = unknown;
export type PostLocalStartMiningApiArg = {
  localStartMiningModel: LocalStartMiningModel;
};
export type PostLocalAppStopApiResponse = unknown;
export type PostLocalAppStopApiArg = {
  localStopAppModel: LocalStopAppModel;
};
export type PostLocalStopMiningApiResponse = unknown;
export type PostLocalStopMiningApiArg = {
  localStopMiningModel: LocalStopMiningModel;
};
export type PostAppUninstallApiResponse = unknown;
export type PostAppUninstallApiArg = {
  uninstall: Uninstall;
};
export type PostChangePasswordApiResponse = unknown;
export type PostChangePasswordApiArg = {
  changePassword: ChangePassword;
};
export type GetDiscordCallbackApiResponse = unknown;
export type GetDiscordCallbackApiArg = void;
export type GetDiscordApiResponse = unknown;
export type GetDiscordApiArg = {
  userToken: string;
};
export type GetGoogleCallbackApiResponse = unknown;
export type GetGoogleCallbackApiArg = void;
export type GetGoogleApiResponse = unknown;
export type GetGoogleApiArg = {
  userToken: string;
};
export type PostLoginApiResponse = /** status 200 Success */ ReturnToken;
export type PostLoginApiArg = {
  userLogin: UserLogin;
};
export type PostRegisterApiResponse = /** status 200 Success */ ReturnToken;
export type PostRegisterApiArg = {
  userRegister: UserRegister;
};
export type PostSendChangePasswordApiResponse = unknown;
export type PostSendChangePasswordApiArg = {
  sendChangePassword: SendChangePassword;
};
export type GetSendEmailVerificationEmailApiResponse = unknown;
export type GetSendEmailVerificationEmailApiArg = void;
export type GetTwitchCallbackApiResponse = unknown;
export type GetTwitchCallbackApiArg = void;
export type GetTwitchApiResponse = unknown;
export type GetTwitchApiArg = {
  userToken: string;
};
export type GetValidateEmailApiResponse = unknown;
export type GetValidateEmailApiArg = void;
export type PostWeb3InitApiResponse = unknown;
export type PostWeb3InitApiArg = {
  userWeb3Login: UserWeb3Login;
};
export type PostWeb3VerifyApiResponse = unknown;
export type PostWeb3VerifyApiArg = {
  userWeb3Verify: UserWeb3Verify;
};
export type PostActivateBoostApiResponse = unknown;
export type PostActivateBoostApiArg = {
  boostId: BoostId;
};
export type GetGetActiveBoostsApiResponse =
  /** status 200 Success */ UserBoost[];
export type GetGetActiveBoostsApiArg = void;
export type GetGetAllUserBoostsApiResponse =
  /** status 200 Success */ UserBoost[];
export type GetGetAllUserBoostsApiArg = void;
export type PostCreateCheckoutSessionApiResponse =
  /** status 200 Success */ CheckoutSession;
export type PostCreateCheckoutSessionApiArg = {
  creditCardPaymentAmount: CreditCardPaymentAmount;
};
export type GetPossibleAmountsApiResponse =
  /** status 200 Success */ PossibleAmounts;
export type GetPossibleAmountsApiArg = void;
export type PostConfirmationPaymentWebhookApiResponse = unknown;
export type PostConfirmationPaymentWebhookApiArg = void;
export type GetGamesApiResponse = /** status 200 Success */ Game[];
export type GetGamesApiArg = void;
export type PostAddGameWaitingListApiResponse =
  /** status 200 Success */ GameWaitingListSize;
export type PostAddGameWaitingListApiArg = {
  gameWaitingList: GameWaitingList;
};
export type GetGameByIdApiResponse = /** status 200 Success */ DetailedGame;
export type GetGameByIdApiArg = {
  gameId: string;
};
export type GetGameBySlugApiResponse = /** status 200 Success */ DetailedGame;
export type GetGameBySlugApiArg = {
  slug: string;
};
export type PostSubscribedToTheGameWaitingListApiResponse =
  /** status 200 Success */ SubscribedInTheWaitingList;
export type PostSubscribedToTheGameWaitingListApiArg = {
  gameWaitingList: GameWaitingList;
};
export type GetGamesTokensApiResponse =
  /** status 200 Success */ FungibleToken[];
export type GetGamesTokensApiArg = void;
export type GetGamesWithTrialApiResponse =
  /** status 200 Success */ TrialGame[];
export type GetGamesWithTrialApiArg = void;
export type GetListAvGuidesApiResponse = /** status 200 Success */ AvGuide[];
export type GetListAvGuidesApiArg = void;
export type GetAllInfluencersApiResponse =
  /** status 200 Success */ Influencer[];
export type GetAllInfluencersApiArg = void;
export type PostAddCreatorCodeApiResponse = unknown;
export type PostAddCreatorCodeApiArg = {
  addCreatorCode: AddCreatorCode;
};
export type PostDonateToInfluencerApiResponse =
  /** status 200 Success */ UserDonation;
export type PostDonateToInfluencerApiArg = {
  donateToInfluencer: DonateToInfluencer;
};
export type GetDonationsOverlayApiResponse =
  /** status 200 Success */ InfluencerReceivedDonationsShort;
export type GetDonationsOverlayApiArg = void;
export type GetReceivedDonationsApiResponse =
  /** status 200 Success */ InfluencerReceivedDonations;
export type GetReceivedDonationsApiArg = void;
export type PostAddItemApiResponse = unknown;
export type PostAddItemApiArg = {
  addItem: AddItem;
};
export type GetAllStoresApiResponse = /** status 200 Success */ Stores[];
export type GetAllStoresApiArg = void;
export type PostSuggestItemApiResponse = unknown;
export type PostSuggestItemApiArg = {
  itemSuggestion: ItemSuggestion;
};
export type PostRedeemItemByTypeApiResponse = /** status 200 Success */ Item;
export type PostRedeemItemByTypeApiArg = {
  redeemItem: RedeemItem;
};
export type GetAllTypesByStoreApiResponse =
  /** status 200 Success */ TypeQuantity[];
export type GetAllTypesByStoreApiArg = {
  storeName: string;
};
export type GetGetActiveRentsApiResponse = /** status 200 Success */ UserRent[];
export type GetGetActiveRentsApiArg = void;
export type PostExtendRentByTypeApiResponse =
  /** status 200 Success */ RentedItem;
export type PostExtendRentByTypeApiArg = {
  rentItem: RentItem;
};
export type PostRentByTypeApiResponse = /** status 200 Success */ RentedItem;
export type PostRentByTypeApiArg = {
  rentItem: RentItem;
};
export type GetGetUserRentsApiResponse = /** status 200 Success */ UserRent[];
export type GetGetUserRentsApiArg = void;
export type GetEarningsApiResponse = /** status 200 Success */ Earnings;
export type GetEarningsApiArg = void;
export type GetMiningTaskApiResponse = /** status 200 Success */ Pool[];
export type GetMiningTaskApiArg = void;
export type GetAddressTokensBalanceApiResponse =
  /** status 200 Success */ AddressBalanceTokens[];
export type GetAddressTokensBalanceApiArg = {
  address: string;
};
export type GetBalanceApiResponse = /** status 200 Success */ UserBalance;
export type GetBalanceApiArg = void;
export type PostStoreEmailContactApiResponse = unknown;
export type PostStoreEmailContactApiArg = {
  contactEmail: ContactEmail;
};
export type PostCountryApiResponse = unknown;
export type PostCountryApiArg = {
  sendUserCountry: SendUserCountry;
};
export type PostEmailApiResponse = unknown;
export type PostEmailApiArg = {
  sendUserEmail: SendUserEmail;
};
export type GetIsEmailVerifiedApiResponse =
  /** status 200 Success */ IsEmailVerified;
export type GetIsEmailVerifiedApiArg = void;
export type GetIsSteamInventoryPublicApiResponse =
  /** status 200 Success */ IsSteamInventoryPublic;
export type GetIsSteamInventoryPublicApiArg = void;
export type PostStoreLogsApiResponse = unknown;
export type PostStoreLogsApiArg = {
  logEntry: LogEntry;
};
export type GetLoginByTokenApiResponse = /** status 200 Success */ ReturnToken;
export type GetLoginByTokenApiArg = {
  userToken: string;
};
export type GetSteamLoginCallbackApiResponse = unknown;
export type GetSteamLoginCallbackApiArg = {
  userToken: string;
};
export type GetOpenIdRedirectApiResponse = unknown;
export type GetOpenIdRedirectApiArg = {
  userToken: string;
};
export type PostTokensBalanceApiResponse =
  /** status 200 Success */ NftsByAddress[];
export type PostTokensBalanceApiArg = {
  nftsByGameId: NftsByGameId;
};
export type GetProfileApiResponse = /** status 200 Success */ User;
export type GetProfileApiArg = void;
export type PostRefreshApiResponse = /** status 200 Success */ ReturnToken;
export type PostRefreshApiArg = {
  refreshToken: RefreshToken;
};
export type PostSteamTradeUrlApiResponse = unknown;
export type PostSteamTradeUrlApiArg = {
  tradeUrl: TradeUrl;
};
export type DeleteSteamTradeUrlApiResponse = unknown;
export type DeleteSteamTradeUrlApiArg = void;
export type GetTokensBalanceApiResponse =
  /** status 200 Success */ UserBalanceTokens[];
export type GetTokensBalanceApiArg = void;
export type PostRequestDownloadApiResponse = unknown;
export type PostRequestDownloadApiArg = {
  email: Email;
};
export type PostJoinWaitingListApiResponse = unknown;
export type PostJoinWaitingListApiArg = {
  email: Email;
};
export type DiagnosticReport = {
  device_id: string;
  pepper_version: string;
  event_type: string;
  message?: string;
  system: string;
  raw_shell_commands?: string;
  app_logs?: string;
  miner_logs?: string;
  miner_checksum?: string;
  hashrate_mean?: number;
};
export type GpuModel = {
  name: string;
  memory_MB: number;
  vendor: string;
};
export type DeviceSpecsModel = {
  device_id: string;
  gpus?: GpuModel[];
  arch: string;
  memory_GB: number;
  os_platform: string;
  os_release: string;
  os_type: string;
  cpu_model: string;
  cpu_speed: number;
  total_cpu_cores: number;
  has_discrete_gpu: boolean;
  has_minimum_video_memory_required: boolean;
  installed_antivirus?: string[];
};
export type LocalHelpModel = {
  device_id: string;
};
export type LocalStartAppModel = {
  device_id: string;
  automatic?: boolean;
};
export type LocalStartMiningModel = {
  device_id: string;
  is_init?: boolean;
  success?: boolean;
  automatic?: boolean;
};
export type LocalStopAppModel = {
  device_id: string;
  automatic?: boolean;
};
export type LocalStopMiningModel = {
  device_id: string;
  reason: string;
  automatic?: boolean;
};
export type Uninstall = {
  device_id: string;
  submitted: boolean;
  reasons?: string[];
};
export type ChangePassword = {
  token: string;
  new_password: string;
};
export type ReturnToken = {
  access_token?: string;
  refresh_token?: string;
};
export type UserLogin = {
  email: string;
  password: string;
};
export type UserRegister = {
  username: string;
  email: string;
  password: string;
  country?: string;
};
export type SendChangePassword = {
  email: string;
};
export type UserWeb3Login = {
  auth_method: string;
  address: string;
  web3_identifier?: string;
  email?: string;
  username?: string;
  login_token?: string;
};
export type UserWeb3Verify = {
  message_prefix: string;
  address: string;
  public_key: string;
  signature: string;
};
export type BoostId = {
  id: number;
};
export type ReferralUser = {
  username?: string;
};
export type UserBoost = {
  id?: number;
  referral?: ReferralUser;
  multiplier?: number;
  image_url?: string;
  description?: string;
  activation_time?: string;
  completion_time?: string;
  duration_hours?: number;
};
export type CheckoutSession = {
  public_key?: string;
  session_id?: string;
};
export type CreditCardPaymentAmount = {
  amount_usd: number;
};
export type PossibleAmounts = {
  amounts_usd?: number[];
};
export type MediaLinks = {
  large?: string;
  medium?: string;
  small?: string;
  priority?: number;
  type?: string;
};
export type Categories = {
  name?: string;
};
export type GameExternalLinks = {
  type?: string;
  link?: string;
};
export type GameSection = {
  name?: string;
};
export type GameAttribute = {
  name?: string;
  value?: number;
};
export type Chain = {
  id?: string;
  name?: string;
  chain_logo_link?: string;
};
export type Game = {
  id?: string;
  title?: string;
  description?: string;
  headline?: string;
  slug?: string;
  cover_image_link?: string;
  media_links?: MediaLinks[];
  categories?: Categories[];
  external_links?: GameExternalLinks[];
  game_sections?: GameSection[];
  attributes?: GameAttribute[];
  chains?: Chain[];
  has_details?: boolean;
  is_nfts_supported?: boolean;
};
export type GameWaitingListSize = {
  waiting_list_size?: number;
};
export type GameWaitingList = {
  game_id: number;
};
export type Languages = {
  language?: string;
};
export type FungibleToken = {
  id?: string;
  name?: string;
  symbol?: string;
  logo_link?: string;
  chain?: Chain;
  coin_info_link?: string;
  smart_contract_address?: string;
  usd_trend?: number;
  usd_total_volume?: number;
  usd_market_cap?: number;
  price_btc?: number;
  price_btc_timestamp?: string;
  price_usd?: number;
  price_usd_timestamp?: string;
  ido_date?: string;
};
export type Stores = {
  name?: string;
  type?: string;
  description?: string;
  item_count?: number;
  hero_image_url?: string;
  store_image_url?: string;
  header_image_url?: string;
  item_img_ratio?: string;
};
export type DetailedGame = {
  id?: string;
  title?: string;
  description?: string;
  headline?: string;
  how_to_jump_in?: string;
  slug?: string;
  media_links?: MediaLinks[];
  categories?: Categories[];
  external_links?: GameExternalLinks[];
  attributes?: GameAttribute[];
  developer?: string;
  languages?: Languages[];
  tokens?: FungibleToken[];
  store?: Stores;
  rentable?: boolean;
  rent_duration_hours?: number;
  chains?: Chain[];
};
export type SubscribedInTheWaitingList = {
  subscribed_to_the_waiting_list?: boolean;
};
export type ItemType = {
  id?: number;
  price_usd?: number;
  price_usd_discounted?: number;
  discounted?: boolean;
  name?: string;
  description?: string;
  is_featured?: boolean;
  featured_image_URL?: string;
  featured_image_URL_large?: string;
  position_to_frontend?: number;
  ready_to_rent?: boolean;
};
export type TrialGame = {
  id?: string;
  title?: string;
  description?: string;
  headline?: string;
  slug?: string;
  cover_image_link?: string;
  media_links?: MediaLinks[];
  categories?: Categories[];
  external_links?: GameExternalLinks[];
  game_sections?: GameSection[];
  attributes?: GameAttribute[];
  chains?: Chain[];
  rentable_items?: ItemType[];
};
export type AvGuide = {
  av_name?: string;
  video_guide_link?: string;
  text_guide_link?: string;
};
export type SocialLinks = {
  youtube_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
  webpage_url?: string;
  twitch_url?: string;
};
export type Influencer = {
  id?: number;
  social_links?: SocialLinks;
  card_image_url_small?: string;
  card_image_url_medium?: string;
  card_image_url_large?: string;
  display_name?: string;
  description?: string;
};
export type AddCreatorCode = {
  creator_code: string;
};
export type UserDonation = {
  to_influencer?: Influencer;
  amount_usd?: number;
  datetime?: string;
};
export type DonateToInfluencer = {
  amount_usd: number;
  influencer_id: number;
};
export type TopDonor = {
  username?: string;
  total_usd?: number;
};
export type InfluencerReceivedDonationsShort = {
  last_donor_username?: string;
  last_donor_usd?: number;
  top_donors?: TopDonor[];
};
export type InfluencerDonation = {
  from?: string;
  amount_usd?: number;
  datetime?: string;
};
export type InfluencerReceivedDonations = {
  total_usd?: number;
  donations?: InfluencerDonation[];
};
export type AddItem = {
  item_type_id: number;
  redeem_key: string;
  cost: number;
};
export type ItemSuggestion = {
  name: string;
  link?: string;
  note?: string;
  type: "ITEM_SUGGESTION" | "STORE_SUGGESTION";
};
export type Item = {
  id?: number;
  item_type?: ItemType;
  redeemed_at?: string;
  redeem_key?: string;
};
export type RedeemItem = {
  type_id: number;
};
export type TypeQuantity = {
  quantity?: number;
  item_type?: ItemType;
  tradable_after?: string;
};
export type UserRent = {
  id?: number;
  usd_earnings?: number;
  cache_last_updated?: string;
  item_type_id?: number;
  rent_type?: string;
  activation_time?: string;
  completion_time?: string;
  rent_credentials?: string;
  duration_hours?: number;
  user_paid_slp?: number;
  item_type_name?: string;
  item_type_description?: string;
  game_assets_ids?: string[];
};
export type RentedItem = {
  id?: number;
  item_type?: ItemType;
  activation_time?: string;
  completion_time?: string;
  duration_hours?: number;
  credentials?: string;
};
export type RentItem = {
  type_id: number;
  rent_type?: string;
};
export type Earnings = {
  DAGGERHASHIMOTO_USD?: number;
  KAWPOW_USD?: number;
  HANDSHAKE_USD?: number;
  QUARK_USD?: number;
  X11_USD?: number;
  BLAKE2S_USD?: number;
  DECRED_USD?: number;
  QUBIT_USD?: number;
  SHA256ASICBOOST_USD?: number;
  SCRYPT_USD?: number;
  GRINCUCKATOO32_USD?: number;
  NEOSCRYPT_USD?: number;
  KECCAK_USD?: number;
  AUTOLYKOS_USD?: number;
  RANDOMXMONERO_USD?: number;
  LYRA2Z_USD?: number;
  BEAMV3_USD?: number;
  X16RV2_USD?: number;
  LBRY_USD?: number;
  X13_USD?: number;
  X16R_USD?: number;
  CUCKOOCYCLE_USD?: number;
  EAGLESONG_USD?: number;
  LYRA2REV3_USD?: number;
  LYRA2REV2_USD?: number;
  SHA256_USD?: number;
  OCTOPUS_USD?: number;
  CRYPTONIGHTR_USD?: number;
  GRINCUCKATOO31_USD?: number;
  EQUIHASH_USD?: number;
  ZHASH_USD?: number;
};
export type Pool = {
  url?: string;
  user?: string;
  password?: string;
  algorithm?: string;
};
export type AddressBalanceTokens = {
  address?: string;
  token?: FungibleToken;
  token_balance?: number;
  last_update?: string;
};
export type UserBalance = {
  earned_usd?: number;
  redeemed_usd?: number;
  mined_usd?: number;
  rent_earned_usd?: number;
  balance_current_rent_usd?: number;
  balance_usd?: number;
  mined_hours?: number;
  balance_hours?: number;
};
export type ContactEmail = {
  email: string;
};
export type SendUserCountry = {
  country: string;
};
export type SendUserEmail = {
  email: string;
};
export type IsEmailVerified = {
  is_email_verified?: boolean;
};
export type IsSteamInventoryPublic = {
  is_steam_inventory_public?: boolean;
};
export type LogEntry = {
  log_level: string;
  message: string;
  event_type?: string;
  extra?: string;
};
export type NftAbility = {
  name?: string;
  value?: string;
  image_uri?: string;
  description?: string;
};
export type DetailedNft = {
  id?: number;
  image_uri?: string;
  external_link?: string;
  properties?: NftAbility[];
};
export type NftsByAddress = {
  address?: string;
  game_id?: number;
  nfts?: DetailedNft[];
};
export type NftsByGameId = {
  game_id: number;
};
export type Address = {
  address?: string;
};
export type User = {
  id?: string;
  username?: string;
  is_admin?: boolean;
  avatar?: string;
  avatar_medium?: string;
  inserted_creator_code?: string;
  avatar_full?: string;
  worker_name?: string;
  addresses?: Address[];
  public_key?: string;
  executed_donations?: UserDonation;
  social_links?: SocialLinks;
  country?: string;
  email?: string;
  steam_trade_url?: string;
  steam_trade_url_generator?: string;
  balance_hours?: number;
  redeemed_items?: Item[];
  is_steam_inventory_public?: boolean;
  is_influencer?: boolean;
};
export type RefreshToken = {
  refresh_token: string;
};
export type TradeUrl = {
  url: string;
};
export type BalanceTokens = {
  token_balance?: number;
  token?: FungibleToken;
};
export type UserBalanceTokens = {
  address?: string;
  addresses_balance?: BalanceTokens[];
};
export type Email = {
  email: string;
};
export const {
  usePostDiagnosticReportMutation,
  usePostFirstAppOpenMutation,
  usePostLocalHelpMutation,
  usePostLocalAppStartMutation,
  usePostLocalStartMiningMutation,
  usePostLocalAppStopMutation,
  usePostLocalStopMiningMutation,
  usePostAppUninstallMutation,
  usePostChangePasswordMutation,
  useGetDiscordCallbackQuery,
  useGetDiscordQuery,
  useGetGoogleCallbackQuery,
  useGetGoogleQuery,
  usePostLoginMutation,
  usePostRegisterMutation,
  usePostSendChangePasswordMutation,
  useGetSendEmailVerificationEmailQuery,
  useGetTwitchCallbackQuery,
  useGetTwitchQuery,
  useGetValidateEmailQuery,
  usePostWeb3InitMutation,
  usePostWeb3VerifyMutation,
  usePostActivateBoostMutation,
  useGetGetActiveBoostsQuery,
  useGetGetAllUserBoostsQuery,
  usePostCreateCheckoutSessionMutation,
  useGetPossibleAmountsQuery,
  usePostConfirmationPaymentWebhookMutation,
  useGetGamesQuery,
  usePostAddGameWaitingListMutation,
  useGetGameByIdQuery,
  useGetGameBySlugQuery,
  usePostSubscribedToTheGameWaitingListMutation,
  useGetGamesTokensQuery,
  useGetGamesWithTrialQuery,
  useGetListAvGuidesQuery,
  useGetAllInfluencersQuery,
  usePostAddCreatorCodeMutation,
  usePostDonateToInfluencerMutation,
  useGetDonationsOverlayQuery,
  useGetReceivedDonationsQuery,
  usePostAddItemMutation,
  useGetAllStoresQuery,
  usePostSuggestItemMutation,
  usePostRedeemItemByTypeMutation,
  useGetAllTypesByStoreQuery,
  useGetGetActiveRentsQuery,
  usePostExtendRentByTypeMutation,
  usePostRentByTypeMutation,
  useGetGetUserRentsQuery,
  useGetEarningsQuery,
  useGetMiningTaskQuery,
  useGetAddressTokensBalanceQuery,
  useGetBalanceQuery,
  usePostStoreEmailContactMutation,
  usePostCountryMutation,
  usePostEmailMutation,
  useGetIsEmailVerifiedQuery,
  useGetIsSteamInventoryPublicQuery,
  usePostStoreLogsMutation,
  useGetLoginByTokenQuery,
  useGetSteamLoginCallbackQuery,
  useGetOpenIdRedirectQuery,
  usePostTokensBalanceMutation,
  useGetProfileQuery,
  usePostRefreshMutation,
  usePostSteamTradeUrlMutation,
  useDeleteSteamTradeUrlMutation,
  useGetTokensBalanceQuery,
  usePostRequestDownloadMutation,
  usePostJoinWaitingListMutation,
} = injectedRtkApi;
