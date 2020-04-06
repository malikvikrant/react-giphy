import { GIPHY_API_URL } from "../../api.config";
import * as Constants from "../utils/constants";
/**
 * @param {string} name of the gif that needs to be search.
 * @param {int} newOffSet of the gif.
 * @return {string} getGiphyUrl URL
 * */

const getGiphyUrl = (queryString, newOffSet) => {
  const giphyApiKey = Constants.GIPHY_API_KEY;
  const giphyLimit = Constants.GIPHY_LIMIT;

  return (
    GIPHY_API_URL +
    "?" +
    "q=" +
    queryString +
    "&api_key=" +
    giphyApiKey +
    "&limit=" +
    giphyLimit +
    "&offset=" +
    newOffSet
  );
};

export default getGiphyUrl;
