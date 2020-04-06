import * as Records from "../records/records";
import * as Constants from "../utils/constants";

const initialState = new Records.GiphyState({});

const reducer = (giphyState = initialState, action = {}) => {
  if (!action.type) return giphyState;
  switch (action.type) {
    case Constants.GIPHY_SEARCH_STRING:
      return giphyState.merge({
        searchString: action.payLoad,
        giphyObject: new Records.GiphyObject({
          gifs: [],
          pagination: new Records.Pagination({
            totalCount: 0,
            count: 0,
            offset: 0,
          }),
        }),
      });
    case Constants.GIPHY_FETCHING:
      return giphyState.merge({
        isFetching: true,
        isFetched: false,
        isError: false,
        errorMessage: "",
      });
    case Constants.GIPHY_FETCHED:
      return giphyState.merge({
        giphyObject: action.payLoad,
        isFetching: false,
        isFetched: true,
        isError: false,
        errorMessage: "",
      });
    case Constants.GIPHY_ERROR:
      return giphyState.merge({
        isFetching: false,
        isFetched: true,
        isError: true,
        errorMessage: action.payLoad,
      });
    default:
      return giphyState;
  }
};

export default reducer;
