export default class CommnetService {
  static async getAllComments(quoteId = null) {
    // const responce = await fetch(
    //   `https://react-practice-a3a21-default-rtdb.firebaseio.com/comments.json/?orderBy="quoteId"&equalTo="${quoteId}"`);

    const responce = await fetch(
      `https://react-practice-a3a21-default-rtdb.firebaseio.com/comments.json`);

    if (!responce.ok) {
      throw new Error("Request failed!");
    }

    const data = await responce.json();

    return data;
  }

  static async addComment(text, quoteId) {
    const response = await fetch(
      "https://react-practice-a3a21-default-rtdb.firebaseio.com/comments.json", {
      method: "Post",
      headers: {
        "Conten-type": "application/json"
      },
      body: JSON.stringify({ text: text, quoteId: quoteId })
    })
    if (!response.ok) {
      throw new Error("Request failed!");
    }

    const data = await response.json();

    return data;
  }

}