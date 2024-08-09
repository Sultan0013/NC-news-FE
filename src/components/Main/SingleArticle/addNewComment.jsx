
import  { useState } from 'react';
import axios from 'axios';


function PostComment({ article_id , comments ,setComments}) {
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [username , setusername ] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim() === '') {
            setError({status : 400, message: "Comment cannot be empty"});
            return;
        }

        setIsSubmitting(true);
        setError(null);
    const newComment = {
      "username": username,
      "body": comment
    };
  
  
        axios.post(`https://nc-news-vvdv.onrender.com/api/articles/${article_id}/comments`, newComment)
            .then(({ data }) => {
                setComment('');
                setSuccessMessage('Comment posted successfully!');
              setIsSubmitting(false);
              const newComment = data.Comment
               setComments([newComment, ...comments])
        
                setTimeout(() => setSuccessMessage(''), 3000); 
            })
            .catch((err) => 
        {    if (err.response && err.response.status === 404) {
                    setError({ status: 404, message: "Comment not found" });
                } else {
                    setError({ status: 500, msg: "An unexpected error occurred" });
                }
        });
    };

    return (
        <div className="post-comment">
            

         
<button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>Add a new comment</button>
<dialog id="my_modal_4" className="modal">
  <div className="modal-box w-11/12 max-w-5xl">
                    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow-md bg-base-100">
                         <input className="input input-bordered w-full "
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    placeholder="Write your username here ...."
                    disabled={isSubmitting}
              />
              
              <textarea
                className="textarea textarea-bordered  w-full h-24" 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment here..."
                    disabled={isSubmitting}
              />
              
                <button type="submit" className='btn' disabled={isSubmitting}>Post Comment</button>
            </form>
            {error && <p className="error-message">"Failed to add comment : "{error.message}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
    <div className="modal-action">
      <form method="dialog">
     
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
        </div>
    );
}

export default PostComment;
