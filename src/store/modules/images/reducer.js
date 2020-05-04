import types from "./types";

const INITIAL_STATE = {
  images: []
};

export default function images(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_IMAGES_PROMOTION:
      return {
        images: action.payload.images
      };
    default:
      return state;
  }
}
