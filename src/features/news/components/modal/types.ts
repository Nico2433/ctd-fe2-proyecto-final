import { Dispatch, SetStateAction } from "react";
import { InormalizedNews } from "../../types";

export interface Imodal {
  news: InormalizedNews;
  setter: Dispatch<SetStateAction<InormalizedNews | null>>;
}
