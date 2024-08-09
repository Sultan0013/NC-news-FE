import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../UI/Loading";
import Error from "../../UI/error";
import './singelArticle.css'; 
import DeleteComment from "./deleteComment";
function ArticleComments({ article_id  , comments , setComments,username }) {
   
    const [error, setError] = useState(null);
    const [deleted , setDeleted] = useState(false)
 const [deletedCommentId, setDeletedCommentId] = useState(null);
    useEffect(() => {
        axios.get(`https://nc-news-vvdv.onrender.com/api/articles/${article_id}/comments`)
            .then(({ data }) => setComments(data.comments))
        
            .catch((err) => setError(err));
    }, [article_id , setComments]);

    const handleDelete = async (comment_id) => {
        const success = await DeleteComment(comment_id);
        if (success) {
            setTimeout(() =>  setComments(comments.filter(comment => comment.comment_id !== comment_id)), 1000);
             setDeletedCommentId(comment_id);
        }
    };
    if (error) return <Error error={error} />;
    if (comments.length === 0) return <Loading />;

    return (
        <div className="article-comments">
            {comments.map((comment) => (
                <div key={comment.comment_id} className="comment">
                  
                    <div className="comment-content">
                        <p className="comment-author">{comment.author}</p>
                        <p className="comment-body">{comment.body}</p>
                        <button className="btn" disabled={!(comment.author === username)} onClick={() => handleDelete(comment.comment_id)}>Delete</button>
                        {deletedCommentId === comment.comment_id && <p className="success-message">Comment deleted successfully.</p>}
                    </div>
                    <div className="comment-votes">
                        <p>Votes: {comment.votes}</p>
                        <button onClick={() => handleVote(comment.comment_id, 1)}>Upvote</button>
                        <button onClick={() => handleVote(comment.comment_id, -1)}>Downvote</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ArticleComments;
