export default class QuoteService {
  static async getAllQuotes() {
    const responce = await fetch(
      "https://react-practice-a3a21-default-rtdb.firebaseio.com/quotes.json"
    );

    if (!responce.ok) {
      throw new Error("Request failed!");
    }

    const data = await responce.json();

    return data;
  }
  static async addNewQuote(text, author) {
    const responce = await fetch(
      "https://react-practice-a3a21-default-rtdb.firebaseio.com/quotes.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: text, author: author })
      }
    );
    if (!responce.ok) {
      throw new Error("Request failed!");
    }

    const data = await responce.json();

    return data;
  }

  static async getOneQuote(quoteId) {
    const responce = await fetch(
      `https://react-practice-a3a21-default-rtdb.firebaseio.com/quotes/${quoteId}.json`
    );

    if (!responce.ok) {
      throw new Error("Request failed!");
    }

    const data = await responce.json();

    return data;
  }
}

export class QuoteService2 {
  static async getAllQuotes() {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/quotes.json`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not fetch quotes.");
    }

    const transformedQuotes = [];

    for (const key in data) {
      const quoteObj = {
        id: key,
        ...data[key]
      };

      transformedQuotes.push(quoteObj);
    }

    return transformedQuotes;
  }

  static async addQuote(quoteData) {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/quotes.json`,
      {
        method: "POST",
        body: JSON.stringify(quoteData),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not create quote.");
    }

    return null;
  }

  static async getSingleQuote(quoteId) {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/quotes/${quoteId}.json`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not fetch quote.");
    }

    const loadedQuote = {
      id: quoteId,
      ...data
    };

    return loadedQuote;
  }
}
