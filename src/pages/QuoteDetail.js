import React, { Fragment } from "react";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import { Route, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import QuoteService from "../api/QuoteService";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { useFetch } from "../hooks/useFetch";

const QuoteDetail = () => {
  const match = useRouteMatch();
  // console.log(match);
  const params = useParams();
  const [quote, setQuote] = useState({})
  // const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  const loadQuote = useCallback(async () => {
    const responce = await QuoteService.getOneQuote(params.quoteId);
    // console.log(params.quoteId)
    // console.log(responce)
    setQuote({ text: responce.text, author: responce.author })
  }, [params.quoteId])

  const [, , fetchQuote] = useFetch(loadQuote)

  useEffect(() => {
    fetchQuote()
  }, [fetchQuote])


  if (!quote) {
    return <p>No quote found</p>;
  }

  return (
    <Fragment>
      <h1>Quote detail</h1>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link to={`${match.url}/comments`} className="btn--flat">
            Load comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`} exact>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
