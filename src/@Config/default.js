/**
 * Created By Sukumar Abhijeet
 */
import { Platform } from "react-native";

import { TestIds } from "react-native-google-mobile-ads";
import { name, version } from "../../package.json";
//MAIN ENVIRONMENT

const env = process.env.NODE_ENV;

//SET ENVIRONMENT
const setEnv = env !== "development";
const PRODUCTIONADS_ID =
  Platform.OS == "android"
    ? {
        BANNER_ADS: "ca-app-pub-8343266125913768/1612418193",
        INTERSTITIAL_ADS: "ca-app-pub-8343266125913768/5894196565",
      }
    : {
        BANNER_ADS: "ca-app-pub-8343266125913768/2766385019",
        INTERSTITIAL_ADS: "ca-app-pub-8343266125913768/7479655643",
      };
const APPLE_STORE_ID = "id284882215";
const ANDROID_PACKAGE_NAME = "com.spenowr";

export default {
  BASE_PATH: "https://backend.spenowr.com", //setEnv ? 'https://spnbknd.krescitus.com' : 'https://backend.spenowr.com',

  CASHFREE_BASE_PATH: "https://api.cashfree.com", //setEnv ? 'https://test.cashfree.com' : 'https://api.cashfree.com',

  NEW_IMG_BASE: "https://media.spenowr.com", //setEnv ? 'https://spnbknd.krescitus.com' : 'https://media.spenowr.com',

  CASHFREE_APPID: "4789938881789b1dbe385c44399874", //setEnv ? '148350132124a6b84295715f353841' : '4789938881789b1dbe385c44399874',

  CASHFREE_SECRETKEY: "8302dc38fac22d104da627ea85e58353fb40a60b", //setEnv ? '9b746ada70bf201049d8ff5f435d5a9505d5ab1a' : '8302dc38fac22d104da627ea85e58353fb40a60b',

  CASHFREE_ENV: "PROD", //setEnv ? 'TEST' : 'PROD',

  SPENOWR_AsyncStorageKey: "NEWASYNCKEY",

  SPENOWR_IMG_BASE: "https://spenowr.com/",

  CASHFREE_API: "/api/v2/cftoken/order",

  DUMMY_IMAGE_URL:
    "https://media.spenowr.com/images/theme/default/dummyimages.jpg",

  DEFAULT_PROFILE: "/images/theme/default/profile-detail.jpg",

  APPSTORE_LINK: `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`,

  PLAYSTORE_LINK: `market://details?id=${ANDROID_PACKAGE_NAME}`,

  SHARABLE_BASE_URL: "https://www.spenowr.com/",

  NOTIFICATION_CHANNEL_ID: "SpenowrNotifications2021",

  NOTIFICATION_CHANNEL_NAME: "SpenowrNotifications2021",

  API_VERSIONING: "/api/v1",

  USER_AGENT: `${name}/${version} Dalvik/${version} (Unix; U; ${
    Platform.OS === "ios" ? "Ios" : "Android"
  } ;  Build/)`,

  BANNERID: setEnv ? PRODUCTIONADS_ID.BANNER_ADS : TestIds.BANNER,
  INTERSTITIALID: setEnv
    ? PRODUCTIONADS_ID.INTERSTITIAL_ADS
    : TestIds.INTERSTITIAL,

  PAYMENTS: {
    APPLE_PAY: {
      OPTIONS: {
        requestPayerName: true,
        requestPayerPhone: true,
        requestPayerEmail: true,
        requestShipping: true,
      },
      METHOD_DATA: [
        {
          supportedMethods: ["apple-pay"],
          data: {
            merchantIdentifier: "merchant.com.krescitus.spenowr",
            supportedNetworks: ["visa", "mastercard", "amex"],
            countryCode: "US",
            currencyCode: "USD",
          },
        },
      ],
    },
  },

  COLOR: {
    APP_THEME_COLOR: "#414756",
    APP_PINK_COLOR: "#EF2D56",
    PINK_LIGHT: "#fcccd7",
    ORANGE: "#ED4E05",
    DARKBLUE: "#0562f7",
    LIGHTBLUE: "#769ef5",
    DARKGRAY: "#b0b0b0",
    LIGHTGREY: "#d4d4d4",
    WHITE: "#FFFFFF",
    DARK_BLACK: "#2A3A49",
    YELLOW: "#FFA303",
    APP_GREEN_COLOR: "#00A0AB",
    LIGHT_VIOLET: "#3F4E79",
    DARK_VIOLET: "#16285E",
    RED: "#cd2121",
    SUBNAME: "#555555",
    LIGHTGREYSHADE: "#9191911C",
    BLACK: "#000000",
    GREEN: "#32a852",
    GOLD: "#FFD700",
  },

  GRADIENT_COLORS: {
    PIGGY: ["#ee9ca7", "#ffdde1"],
    SKY: ["#2980B9", "#FFFFFF"],
    OCEAN: ["#3f2b96", "#a8c0ff"],
    ORANGE: ["#f7b733", "#FFFFFF"],
    NETFLIX: ["#8E0E00", "#FFFF"],
    VISION: ["#ffd89b", "#1CB5E0"],
    INSTA: ["#dae2f8", "#d6a4a4"],
  },

  LANGUAGES: [
    {
      language_id: "1",
      label: "English",
      value: "English",
      status: "1",
      short_name: "EN",
      short_name2: "en-IN",
    },
    {
      language_id: "2",
      label: "Hindi",
      value: "Hindi",
      status: "1",
      short_name: "HI",
      short_name2: "hi-IN",
    },
    {
      language_id: "3",
      label: "Urdu",
      value: "Urdu",
      status: "1",
      short_name: "UR",
      short_name2: "",
    },
    {
      language_id: "4",
      label: "Gujarati",
      value: "Gujarati",
      status: "1",
      short_name: "GU",
      short_name2: "",
    },
    {
      language_id: "5",
      label: "Telugu",
      value: "Telugu",
      status: "1",
      short_name: "TE",
      short_name2: "",
    },
    {
      language_id: "6",
      label: "Tamil",
      value: "Tamil",
      status: "1",
      short_name: "TA",
      short_name2: "",
    },
    {
      language_id: "7",
      label: "Malayalam",
      value: "Malayalam",
      status: "1",
      short_name: "ML",
      short_name2: "",
    },
    {
      language_id: "8",
      label: "Kannada",
      value: "Kannada",
      status: "1",
      short_name: "KN",
      short_name2: "",
    },
    {
      language_id: "9",
      label: "Punjabi",
      value: "Punjabi",
      status: "1",
      short_name: "PA",
      short_name2: "",
    },
    {
      language_id: "10",
      label: "Bengali",
      value: "Bengali",
      status: "1",
      short_name: "BN",
      short_name2: "",
    },
    {
      language_id: "11",
      label: "Odia",
      value: "Odia",
      status: "1",
      short_name: "OD",
      short_name2: "",
    },
    {
      language_id: "12",
      label: "Nepali",
      value: "Nepali",
      status: "1",
      short_name: "NE",
      short_name2: "",
    },
    {
      language_id: "13",
      label: "Thai",
      value: "Thai",
      status: "1",
      short_name: "TH",
      short_name2: "",
    },
    {
      language_id: "14",
      label: "French",
      value: "French",
      status: "1",
      short_name: "FR",
      short_name2: "",
    },
    {
      language_id: "15",
      label: "Spanish",
      value: "Spanish",
      status: "1",
      short_name: "ES",
      short_name2: "",
    },
    {
      language_id: "16",
      label: "Japanese",
      value: "Japanese",
      status: "1",
      short_name: "JA",
      short_name2: "",
    },
    {
      language_id: "17",
      label: "Chinese",
      value: "Chinese",
      status: "1",
      short_name: "ZH",
      short_name2: "",
    },
    {
      language_id: "18",
      label: "German",
      value: "German",
      status: "1",
      short_name: "DE",
      short_name2: "",
    },
    {
      language_id: "19",
      label: "Italian",
      value: "Italian",
      status: "1",
      short_name: "IT",
      short_name2: "",
    },
    {
      language_id: "20",
      label: "Russian",
      value: "Russian",
      status: "1",
      short_name: "RU",
      short_name2: "",
    },
    {
      language_id: "21",
      label: "Swedish",
      value: "Swedish",
      status: "1",
      short_name: "SW",
      short_name2: "",
    },
    {
      language_id: "22",
      label: "Turkish",
      value: "Turkish",
      status: "1",
      short_name: "TR",
      short_name2: "",
    },
  ],
};
