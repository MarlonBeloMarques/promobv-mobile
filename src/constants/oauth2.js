import { API_BASE_URL, APP_URL } from "../../config";

const OAUTH2_REDIRECT_URI = `${APP_URL}/--/oauth2/redirect/`;

const GOOGLE_AUTH_URL = API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;
const FACEBOOK_AUTH_URL = API_BASE_URL + "/oauth2/authorize/facebook?redirect_uri=" + OAUTH2_REDIRECT_URI;

export { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL };