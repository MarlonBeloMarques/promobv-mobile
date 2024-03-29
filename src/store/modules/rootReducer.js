import { combineReducers } from "redux";

import auth from "./auth/reducer";
import category_promotions from "./category/promotions/reducer";
import category_updateAndInsert from "./category/updateAndInsert/reducer";
import images from "./images/reducer";

export default combineReducers({
  auth,
  category_promotions,
  category_updateAndInsert,
  images
});
