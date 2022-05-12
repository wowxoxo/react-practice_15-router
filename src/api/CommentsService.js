export default class CommnetService {
  static async getAllComments(quoteId = null) {
    // const responce = await fetch(
    //   `https://react-practice-a3a21-default-rtdb.firebaseio.com/comments.json/?orderBy="quoteId"&equalTo="${quoteId}"`);

    const responce = await fetch(
      `${process.env.REACT_APP_BASE_URL}/comments/${quoteId}.json`
    );

    if (!responce.ok) {
      throw new Error("Request failed!");
    }

    const data = await responce.json();

    return data;
  }

  static async addComment(text, quoteId) {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/comments/${quoteId}.json`,
      {
        method: "Post",
        headers: {
          "Conten-type": "application/json"
        },
        body: JSON.stringify({ text: text, quoteId: quoteId })
      }
    );
    if (!response.ok) {
      throw new Error("Request failed!");
    }

    const data = await response.json();

    return data;
  }
}

export class CommentService2 {
  static async addComment(requestData) {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/comments/${requestData.quoteId}.json`,
      {
        method: "POST",
        body: JSON.stringify(requestData.commentData),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not add comment.");
    }

    return { commentId: data.name };
  }

  static async getAllComments(quoteId) {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/comments/${quoteId}.json`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not get comments.");
    }

    const transformedComments = [];

    for (const key in data) {
      const commentObj = {
        id: key,
        ...data[key]
      };

      transformedComments.push(commentObj);
    }

    return transformedComments;
  }
}
