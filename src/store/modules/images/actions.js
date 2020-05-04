import types from "./types";

export function setImagesPromotion(images) {
  return {
    type: types.GET_IMAGES_PROMOTION,
    payload: { images },
  };
}
