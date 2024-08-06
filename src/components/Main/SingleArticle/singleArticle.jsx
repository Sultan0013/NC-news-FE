import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './singelArticle.css'
import Loading from "../../UI/Loading";
import Error from "../../UI/error";
import ArticleComments from "./articlesComments";

function SingleArticle() {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://nc-news-vvdv.onrender.com/api/articles/${article_id}`)
            .then(({ data }) => setArticle(data.article[0]))
            .catch((err) => setError(err));
    }, [article_id]);

    if (error) return <Error error={error} />;
    if (!article) return <Loading />;

    const createdat = article.created_at ? article.created_at.split("-") : [];

    return (
        <div className="article--card">
            <div className="article-body">
                <h2>{article.title}</h2>
                {article.article_img_url && <img src={article.article_img_url} alt={article.title} />}
                <p>{article.body}</p>
                <p>Author: {article.author}</p>
                <p>Topic: {article.topic}</p>
                <p>Created at: {createdat.length === 3 ? `${createdat[1]}/${createdat[0]}` : 'Unknown date'}</p>
                <div className="vote-box">
                    <p>Votes: {article.votes}</p>
                    <button type="button">Vote</button>
                </div>
            </div>
            <div className="article-comments">
                <ArticleComments article_id={article.article_id} />
            </div>
        </div>
    );
}

export default SingleArticle;
