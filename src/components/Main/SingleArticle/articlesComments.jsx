import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../UI/Loading";
import Error from "../../UI/error";
import './singelArticle.css'; 
import DeleteComment from "./deleteComment";
function ArticleComments({ article_id  , comments , setComments,username }) {
   
        const [error, setError] = useState(null);
    const [deletedCommentId, setDeletedCommentId] = useState(null);

    useEffect(() => {
        axios.get(`https://nc-news-vvdv.onrender.com/api/articles/${article_id}/comments`)
            .then(({ data }) => setComments(data.comments))
            .catch((err) => {    if (err.response && err.response.status === 404) {
                    setError({ status: 404, message: "Comments not found" });
                } else {
                    setError({ status: 500, msg: "An unexpected error occurred" });
                }});
    }, [article_id, setComments]);

    const handleDelete = async (comment_id) => {
        const success = await DeleteComment(comment_id);
        if (success) {
            setTimeout(() => setComments(comments.filter(comment => comment.comment_id !== comment_id)), 1000);
            setDeletedCommentId(comment_id);
        }
    };

    if (error) return <Error error={error} />;
    if (comments.length === 0) return <Loading />;

    return (
        <div className="article-comments space-y-4">
            {comments.map((comment) => (
                <div key={comment.comment_id} className="comment card shadow-lg bg-base-100">
                    <div className="card-body">
                        <div className="comment-content">
                            <h2 className="card-title text-primary">{comment.author}</h2>
                            <p className="text-black">{comment.body}</p>
                            {deletedCommentId === comment.comment_id && <p className="text-success mt-2">Comment deleted successfully.</p>}
                        </div>
                        <div className="card-actions justify-end">
                            <button 
                                className="btn btn-outline btn-error"
                                disabled={!(comment.author === username)} 
                                onClick={() => handleDelete(comment.comment_id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default ArticleComments;
