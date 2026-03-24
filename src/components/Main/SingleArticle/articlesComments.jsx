import { useEffect, useState } from "react";
import Loading from "../../UI/Loading";
import Error from "../../UI/error";
import "./singleArticle.css";

import { fetchComments, deleteComment } from "../../../api/api";

function ArticleComments({ article_id, comments, setComments, username }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deletedCommentId, setDeletedCommentId] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchComments(article_id)
      .then((data) => {
        setComments(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [article_id, setComments]);

  const handleDelete = (comment_id) => {
    const previous = comments;
    setComments(comments.filter((comment) => comment.comment_id !== comment_id));
    setDeletedCommentId(comment_id);

    deleteComment(comment_id).catch((err) => {
      setComments(previous);
      setDeletedCommentId(null);
      setError(err);
    });
  };

  if (error) return <Error error={error} />;
  if (isLoading) return <Loading />;

  return (
    <div className="article-comments space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.comment_id}
          className="card shadow-md bg-base-100 border border-gray-200 rounded-lg"
        >
          <div className="card-body p-6">
            <div className="flex justify-between items-center">
              <h2 className="card-title text-primary text-lg font-semibold">
                {comment.author}
              </h2>
            </div>
            <p className="text-gray-700 text-left mt-2 break-words">
              {comment.body}
            </p>
            {deletedCommentId === comment.comment_id && (
              <p className="text-success text-sm">
                Comment deleted successfully.
              </p>
            )}
            <div className="card-actions justify-end mt-4">
              <button
                className="btn btn-outline btn-error btn-sm"
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
