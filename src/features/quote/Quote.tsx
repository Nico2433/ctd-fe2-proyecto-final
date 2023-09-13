import { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { clear, obtainQuoteFromAPI } from "../../redux/quoteSlice/quoteSlice";

import { obtainMessage } from "./utils/utils";

import { Button } from "../../app/styled";
import { Input, QuoteAuthor, QuoteContainer, QuoteText } from "./styled";

const Quote = () => {
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState("");

  const { quote = "", character = "" } =
    useAppSelector((state) => state.quote.data) || {};
  const quoteStatus = useAppSelector((state) => state.quote.status);

  const onClickObtainQuote = () => dispatch(obtainQuoteFromAPI(inputValue));

  const onClickClear = () => {
    dispatch(clear());
    setInputValue("");
  };

  return (
    <QuoteContainer>
      <QuoteText aria-label="quote text">
        {obtainMessage(quote, quoteStatus)}
      </QuoteText>
      <QuoteAuthor aria-label="quote author">{character}</QuoteAuthor>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ingresa el nombre del autor"
      />
      <Button
        aria-label={inputValue ? "obtain quote" : "obtain random quote"}
        onClick={onClickObtainQuote}
        contained
        active
      >
        {inputValue ? "Obtener Cita" : "Obtener cita aleatoria"}
      </Button>
      <Button aria-label="clear" onClick={onClickClear} contained secondary>
        Borrar
      </Button>
    </QuoteContainer>
  );
};

export default Quote;
