import { concat, from, of } from "rxjs";
import { catchError, switchMap, debounceTime, map } from "rxjs/operators";
import { ofType } from "redux-observable";
import { giphyFetch } from "../action/giphyAction";
import * as Records from "../records/records";
import * as Constants from "../utils/constants";

/**
 * giphyFetchEpic - middle ware epic to fetch gifs, debounce time is set to one second.
 * */
const giphyFetchEpic = (action$, state$) =>
  action$.pipe(
    ofType(Constants.GIPHY_FETCHING),
    debounceTime(1000),
    switchMap(() => {
      const searchString = state$.value.giphy.searchString;
      const gifs = state$.value.giphy.giphyObject.gifs;
      const count = state$.value.giphy.giphyObject.pagination.count;
      const offset = state$.value.giphy.giphyObject.pagination.offset;
      const newOffSet = count + offset;

      const request = from(giphyFetch(searchString, newOffSet)).pipe(
        map((response) => {
          if (response.status !== 200) {
            throw {
              message: response.meta.msg,
            };
          } else if (
            response.status === 200 &&
            response.data &&
            response.pagination
          ) {
            const pagination = new Records.Pagination({
              totalCount:
                response.pagination && response.pagination.total_count
                  ? response.pagination.total_count
                  : 0,
              count:
                response.pagination && response.pagination.count
                  ? response.pagination.count
                  : 0,
              offset:
                response.pagination && response.pagination.offset
                  ? response.pagination.offset
                  : 0,
            });
            for (let gif of response.data) {
              const gifData = new Records.GifDataObject({
                id: gif.id || "",
                type: gif.type || "",
                url:
                  gif.images &&
                  gif.images.fixed_width &&
                  gif.images.fixed_width.webp
                    ? gif.images.fixed_width.webp
                    : "",
                size: "medium",
              });
              gifs.push(gifData);
            }

            const giphyObject = new Records.GiphyObject({
              gifs: gifs,
              pagination: pagination,
            });

            return { type: Constants.GIPHY_FETCHED, payLoad: giphyObject };
          } else {
            throw new Error(Constants.GIPHY_ERROR_MESSAGE);
          }
        }),
        catchError((err) => {
          const error = of({
            type: Constants.GIPHY_ERROR,
            payLoad: err.message,
          });
          return error;
        })
      );
      return concat(request);
    })
  );

export default giphyFetchEpic;
