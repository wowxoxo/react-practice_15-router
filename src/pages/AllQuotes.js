import React from "react";
import QuoteList from "../components/quotes/QuoteList";

export const DUMMY_QUOTES = [
  {
    id: "q1",
    author: "Jason Statham",
    text: "Learn React is fun!"
  },
  {
    id: "q2",
    author: "Jason Statham",
    text: "Learn Redux Saga is not fun"
  }
];

const AllQuotes = () => {
  return <QuoteList quotes={DUMMY_QUOTES} />;
};

export default AllQuotes;
