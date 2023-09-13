import {
  FETCH_STATUS,
  INVALID_NAME,
  LOADING_MESSAGE,
  NOT_FOUND,
} from "./constants";

export const obtainMessage: (
  quote: string,
  quoteStatus: FETCH_STATUS
) => string = (quote, quoteStatus) => {
  switch (quoteStatus) {
    case FETCH_STATUS.LOADING:
      return LOADING_MESSAGE;

    case FETCH_STATUS.ERROR:
      return INVALID_NAME;
  }

  return quote ? `${quote}` : NOT_FOUND;
};
