import { useCallback, useEffect, useState } from "react";
import CommnetService from '../../api/CommentsService';
import CommentItem from './CommentItem';
import classes from './CommentsList.module.css';
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch"

const CommentsList = (props) => {
  const [commnets, setComments] = useState([])
  const params = useParams();

  const transformAndSetComments = useCallback((commentsObj) => {
    const loadedQuotes = [];
    // console.log(commentsObj)
    for (const quoteKey in commentsObj) {
      loadedQuotes.push({ id: quoteKey, text: commentsObj[quoteKey].text, author: commentsObj[quoteKey].author })
    }

    setComments(loadedQuotes)
  }, [])

  const loadComments = useCallback(async () => {
    const responce = await CommnetService.getAllComments(params.quoteId);
    console.log(responce)
    transformAndSetComments(responce);
  }, [params.quoteId, transformAndSetComments])

  const [, , fetchComments] = useFetch(loadComments)


  useEffect(() => {
    fetchComments();
  }, [fetchComments])


  return (
    <ul className={classes.comments}>
      {commnets.map((comment) => (
        <CommentItem key={comment.id} text={comment.text} />
      ))}
    </ul>
  );
};

export default CommentsList;
