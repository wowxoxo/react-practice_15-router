export default class QuoteService {
  static async getAllQuotes() {

    const responce = await fetch(
      "https://react-practice-a3a21-default-rtdb.firebaseio.com/quotes.json"
    );

    if (!responce.ok) {
      throw new Error("Request failed!");
    }

    const data = await responce.json();

    return data
  }
  static async addNewQuote(text, author) {
    const responce = await fetch(
      "https://react-practice-a3a21-default-rtdb.firebaseio.com/quotes.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: text, author: author })
    })
    if (!responce.ok) {
      throw new Error("Request failed!");
    }

    const data = await responce.json();

    return data
  }

  static async getOneQuote(quoteId) {
    const responce = await fetch(
      `https://react-practice-a3a21-default-rtdb.firebaseio.com/quotes/${quoteId}.json`
    );

    if (!responce.ok) {
      throw new Error("Request failed!");
    }

    const data = await responce.json();

    return data
  }

}