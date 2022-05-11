import React from "react";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import QuoteForm from "../components/quotes/QuoteForm";
import { useFetch } from "../hooks/useFetch";
import QuoteService from "../api/QuoteService";

const NewQuote = () => {
  const history = useHistory();


  const addQuoteHandler = useCallback(async (quoteData) => {
    console.log(quoteData);
    // console.log(process.env.REACT_APP_BASE_URL);
    await QuoteService.addNewQuote(quoteData.text, quoteData.author)
    history.push("/quotes");
  }, [history]);

  const [, , enterQuoteHandler] = useFetch(addQuoteHandler)


  return <QuoteForm onAddQuote={enterQuoteHandler} />;
};

export default NewQuote;
