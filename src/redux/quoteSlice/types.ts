import { FETCH_STATUS } from "../../features/quote/utils/constants";
import { Iquote } from "../../features/quote/types";

export interface QuoteState {
  data: Iquote | null;
  status: FETCH_STATUS;
}
