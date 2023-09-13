import { Dispatch, SetStateAction } from "react";
import { InormalizedNews } from "../../types";

export interface Icard {
  news: InormalizedNews;
  setter: Dispatch<SetStateAction<InormalizedNews | null>>;
}
