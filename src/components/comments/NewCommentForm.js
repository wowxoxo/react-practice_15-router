import { useRef, useCallback } from 'react';
import { useParams } from "react-router-dom";
import classes from './NewCommentForm.module.css';
import { useFetch } from "../../hooks/useFetch";
import CommnetService from '../../api/CommentsService';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const params = useParams();

  const { quoteId } = params
  const { onAddedComment } = props

  const submitFormHandler = useCallback(async(event) => {
    event.preventDefault();

    // optional: Could validate here

    // send comment to server
    // console.log(params.quoteId)
    const response = await CommnetService.addComment(commentTextRef?.current?.value, quoteId)
    commentTextRef.current.value = ""
    if (response) {
      onAddedComment()
    }
    // history.push(`${params.quoteId}/comments`)
    // console.log(response)
  },[quoteId, onAddedComment]);

  const [, , addComment] = useFetch(submitFormHandler)


  return (
    <form className={classes.form} onSubmit={addComment}>
      <div className={classes.control} onSubmit={addComment}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
