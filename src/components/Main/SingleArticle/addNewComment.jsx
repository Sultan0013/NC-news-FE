import { useState } from "react";
import { AddComment } from "../../../api/api";

function PostComment({ article_id, comments, setComments, username }) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      setError({ status: 400, message: "Comment cannot be empty" });
      return;
    }

    setIsSubmitting(true);
    setError(null);
    const newComment = {
      username: username,
      body: comment,
    };

    AddComment(article_id, newComment)
      .then((newComment) => {
        setComment("");
        setSuccessMessage("Comment posted successfully!");
        setIsSubmitting(false);
        setComments([newComment, ...comments]);
      })
      .catch((err) => {
        setError(err);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="post-comment">
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_4").showModal()}
        disabled={!username}
      >
        Add a new comment
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 p-4 border rounded-md shadow-md bg-base-100"
          >
            <textarea
              className="textarea textarea-bordered  w-full h-24"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
              disabled={isSubmitting}
            />

            <button type="submit" className="btn" disabled={isSubmitting}>
              Post Comment
            </button>
          </form>
          {error && (
            <p className="error-message">
              "Failed to add comment : "{error.message}
            </p>
          )}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
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
