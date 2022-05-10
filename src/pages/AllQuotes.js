import React from "react";
import { useCallback, useEffect, useState } from "react";
import QuoteService from "../api/QuoteService";
import QuoteList from "../components/quotes/QuoteList";
import { useFetch } from "../hooks/useFetch";


const AllQuotes = () => {
  const [quotes, setQuotes] = useState([])

  const transformAndSetQuotes = useCallback((quotesObj) => {
    const loadedQuotes = [];
    console.log(quotesObj)
    for (const quoteKey in quotesObj) {
      loadedQuotes.push({ id: quoteKey, text: quotesObj[quoteKey].text, author: quotesObj[quoteKey].author })
    }

    setQuotes(loadedQuotes)
  }, [])

  const loadQuotes = useCallback(async () => {
    const responce = await QuoteService.getAllQuotes();
    transformAndSetQuotes(responce);
  }, [transformAndSetQuotes])

  const [, , fetchQuotes] = useFetch(loadQuotes)


  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes])

  return <QuoteList quotes={quotes} />;
};

export default AllQuotes;
