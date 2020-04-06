import getGiphyUrl from "../service/giphyService";
import { GIPHY_FETCHING, GIPHY_SEARCH_STRING } from "../utils/constants";

/**
 * fetchGiphyHelper - helper function for fetching gifs
 * @param {Bool} checks if the search string is changed or not
 * @param {string} search string entered by user
 * @return {null} calls the epic to fetch results
 * */
const fetchGiphyHelper = (isSearchStringChanged, searchString) => (
  dispatch
) => {
  if (isSearchStringChanged) {
    dispatch({ type: GIPHY_SEARCH_STRING, payLoad: searchString });
  }
  dispatch({ type: GIPHY_FETCHING });
};

/**
 * fetchGiphy - calls the helper function
 * @param {Bool} checks if the search string is changed or not
 * @param {string} search string entered by user
 * @return {null} calls the fetch giphy helper function with dispatch
 * */
export const fetchGiphy = (isSearchStringChanged = false, searchString) => {
  return (dispatch) => {
    dispatch(fetchGiphyHelper(isSearchStringChanged, searchString));
  };
};

/**
 * @param {string} search string entered by user
 * @param {string} new off set to fetch the next set of gifs for same search string
 * @return {string} return the response from gifs service to epic
 * */
export const giphyFetch = async (searchString, newOffSet) => {
  try {
    const giphyUrl = getGiphyUrl(searchString, newOffSet);
    let response = await fetch(giphyUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    return response.json().then((json) => ({
      ...json,
      status: response.status,
    }));
  } catch (error) {
    return error;
  }
};
