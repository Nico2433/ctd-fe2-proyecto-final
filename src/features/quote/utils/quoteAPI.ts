import { API_URL } from "../../../app/constants";
import { Iquote } from "../types";

export const obtainQuote: (character?: string) => Promise<Iquote> = async (
  character
) => {
  if (character && parseInt(character)) {
    throw new Error("El nombre debe ser un texto");
  }

  const url = character ? `${API_URL}?character=${character}` : API_URL;
  const response = await fetch(url);
  const [data] = await response.json();

  const normalizedData = {
    quote: data.quote,
    character: data.character,
    image: data.image,
    characterDirection: data.characterDirection,
  };

  return normalizedData;
};
