import { useState, useCallback, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch"

import classes from './Comments.module.css';
import CommentsList from './CommentsList';
import NewCommentForm from './NewCommentForm';

import CommnetService from '../../api/CommentsService';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const params = useParams();
  const { quoteId } = params;

  const [commnets, setComments] = useState([])

  const transformAndSetComments = useCallback((commentsObj) => {
    const loadedQuotes = [];
    // console.log(commentsObj)
    for (const quoteKey in commentsObj) {
      loadedQuotes.push({ id: quoteKey, text: commentsObj[quoteKey].text, author: commentsObj[quoteKey].author })
    }

    setComments(loadedQuotes)
  }, [])

  const loadComments = useCallback(async () => {
    const responce = await CommnetService.getAllComments(quoteId);
    console.log(responce)
    transformAndSetComments(responce);
  }, [quoteId, transformAndSetComments])

  const [, , fetchComments] = useFetch(loadComments)


  useEffect(() => {
    fetchComments();
  }, [fetchComments])

  const addedCommentHandler  = useCallback(() => {
    fetchComments();
    setIsAddingComment(false)
  }, [fetchComments])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddedComment={addedCommentHandler} />}
      <CommentsList comments={commnets} />
    </section>
  );
};

export default Comments;
