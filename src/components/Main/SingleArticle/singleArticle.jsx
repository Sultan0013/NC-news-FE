import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './singelArticle.css';
import Loading from "../../UI/Loading";
import Error from "../../UI/error";
import ArticleComments from "./articlesComments";

function SingleArticle() {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);
    const [votes, setVotes] = useState(0);
    const [voteError, setVoteError] = useState(null);
    const [hasAgreed, setHasAgreed] = useState(false)
    const [hasDisagreed , setHasDisagreed] = useState(false)
    useEffect(() => {
        axios.get(`https://nc-news-vvdv.onrender.com/api/articles/${article_id}`)
            .then(({ data }) => {
                setArticle(data.article[0]);
                setVotes(data.article[0].votes); 
            })
            .catch((err) => setError(err));
    }, [article_id]);

    if (error) return <Error error={error} />;
    if (voteError ) return <Error error={voteError} />;
    if (!article) return <Loading />;

    const createdAt = article.created_at ? article.created_at.split("-") : [];

    const handleVote = (voteChange) => {
      
        setVoteError(null);
        voteChange === 1 ? (setHasAgreed(true), setHasDisagreed(false)) : (setHasAgreed(false) ,setHasDisagreed(true))

        const votesInfo = { inc_votes: voteChange };

        axios.patch(`https://nc-news-vvdv.onrender.com/api/articles/${article_id}`, votesInfo)
            .then(({ data }) => {
                setVotes(data.article.votes)
            })
            .catch((err) => {
                setVotes(votes); 
                setVoteError(err);
            });
    };

    return (
        <div className="article--card">
            <div className="article-body">
                <h2>{article.title}</h2>
                {article.article_img_url && <img src={article.article_img_url} alt={article.title} />}
                <p>{article.body}</p>
                <p>Author: {article.author}</p>
                <p>Topic: {article.topic}</p>
                <p>Created at: {createdAt.length === 3 ? `${createdAt[1]}/${createdAt[0]}` : 'Unknown date'}</p>
                <div className="vote-box">
                    <p>Votes: {votes}</p>
                    <button onClick={() => handleVote(1)} className="btn" disabled={hasAgreed}>Agree</button>
                    <button onClick={() => handleVote(-1)} className="btn" disabled={hasDisagreed} >Disagree</button>
                </div>
                {voteError && <p className="error-message">{voteError}</p>}
            </div>
            <div className="article-comments">
                <ArticleComments article_id={article.article_id} />
            </div>
        </div>
    );
}

export default SingleArticle;
