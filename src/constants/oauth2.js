const API_BASE_URL = "http://192.168.4.10.xip.io:8080";

const OAUTH2_REDIRECT_URI = "exp://192.168.4.10:19000/--/oauth2/redirect/";

const GOOGLE_AUTH_URL = API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;
const FACEBOOK_AUTH_URL = API_BASE_URL + "/oauth2/authorize/facebook?redirect_uri=" + OAUTH2_REDIRECT_URI;

export { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL };