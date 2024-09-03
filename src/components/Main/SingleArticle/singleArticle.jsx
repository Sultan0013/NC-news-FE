import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./singelArticle.css";
import Loading from "../../UI/Loading";
import Error from "../../UI/error";
import ArticleComments from "./articlesComments";
import handleVote from "./handleVote.jsx";
import PostComment from "./addNewComment.jsx";
import { fetchArticle } from "../../../api/api.jsx";
import { useContext } from "react";
import { UserContext } from "../../../../Context/userContext.jsx";

function SingleArticle() {
  const { article_id } = useParams();
  const { loggedUser } = useContext(UserContext);
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState(0);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [hasDisagreed, setHasDisagreed] = useState(false);
  const [comments, setComments] = useState([]);
  console.log(loggedUser);
  useEffect(() => {
    fetchArticle(article_id)
      .then((article) => {
        setArticle(article);
        setVotes(article.votes);
      })
      .catch(setError);
  }, [article_id, loggedUser]);

  if (error) return <Error error={error} />;
  if (!article) return <Loading />;

  const convertToLocalTime = (created_at) => {
    const date = new Date(created_at);
    return date.toLocaleString().split(",")[0];
  };

  return (
    <div className="container mx-auto p-4">
      <div className="card w-full bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-4xl font-bold mb-6 text-primary">
          {article.title}
        </h2>
        {article.article_img_url && (
          <img
            src={article.article_img_url}
            alt={article.title}
            className="w-full rounded-lg mb-6 object-cover h-full®"
          />
        )}
        <p className="text-lg text-gray-800 leading-relaxed mb-4">
          {article.body}
        </p>
        <div className="text-sm text-gray-600 mb-4">
          <p>
            <span className="font-semibold">Author:</span> {article.author}
          </p>
          <p>
            <span className="font-semibold">Topic:</span> {article.topic}
          </p>
          <p>
            <span className="font-semibold">Created at:</span>{" "}
            {convertToLocalTime(article.created_at)}
          </p>
          <p>
            <span className="font-semibold">Comments:</span>{" "}
            {article.comment_count}
          </p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="badge badge-outline text-black">Votes: {votes}</div>
          <div className="flex space-x-4">
            <button
              onClick={() =>
                handleVote(
                  1,
                  article.article_id,
                  setVotes,
                  votes,
                  setError,
                  setHasAgreed,
                  setHasDisagreed
                )
              }
              className="btn btn-success btn-sm"
              disabled={hasAgreed || loggedUser ? false : true}
            >
              Agree
            </button>
            <button
              onClick={() =>
                handleVote(
                  -1,
                  article.article_id,
                  setVotes,
                  votes,
                  setError,
                  setHasAgreed,
                  setHasDisagreed
                )
              }
              className="btn btn-error btn-sm"
              disabled={hasDisagreed || loggedUser ? false : true}
            >
              Disagree
            </button>
          </div>
        </div>
        <PostComment
          article_id={article.article_id}
          comments={comments}
          setComments={setComments}
          username={loggedUser ? loggedUser.username : null}
        />
      </div>

      <div className="mt-8">
        <ArticleComments
          article_id={article.article_id}
          comments={comments}
          setComments={setComments}
          username={loggedUser ? loggedUser.username : null}
        />
      </div>
    </div>
  );
}

export default SingleArticle;
