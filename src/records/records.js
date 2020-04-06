import { Record as ImmutableRecord } from "immutable";

// gif record
export const GifDataObject = ImmutableRecord({
  id: "",
  type: "",
  url: "",
  size: "medium",
});

// pagination record
export const Pagination = ImmutableRecord({
  totalCount: 0,
  count: 0,
  offset: 0,
});

// gif reconrd includes pagination and gifs
export const GiphyObject = ImmutableRecord({
  gifs: [],
  pagination: new Pagination(),
});

// gif state
export const GiphyState = ImmutableRecord({
  searchString: "",
  giphyObject: new GiphyObject(),
  isFetching: false,
  isFetched: false,
  isError: false,
  errorMessage: "",
});
