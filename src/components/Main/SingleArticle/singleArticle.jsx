import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './singelArticle.css';
import Loading from "../../UI/Loading";
import Error from "../../UI/error";
import ArticleComments from "./articlesComments";
import handleVote from "./handleVote.jsx";
import PostComment from "./addNewComment.jsx";

function SingleArticle() {
   const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);
    const [votes, setVotes] = useState(0);
    const [comments, setComments] = useState([]);
    const [username, setUsername] = useState('grumpy19');

    useEffect(() => {
        axios.get(`https://nc-news-vvdv.onrender.com/api/articles/${article_id}`)
            .then(({ data }) => {
                setArticle(data.article[0]);
                setVotes(data.article[0].votes);
            })
            .catch((err) => setError(err));
    }, [article_id]);

    if (error) return <Error error={error} />;
    if (!article) return <Loading />;

    const convertToLocalTime = (created_at) => {
        const date = new Date(created_at);
        return date.toLocaleString().split(',')[0];
    };

    return (
        <div className="card w-full bg-base-100 shadow-xl p-6">
            <div className="article-body">
                <h2 className="text-3xl font-bold mb-4 text-primary">{article.title}</h2>
                {article.article_img_url && (
                    <img src={article.article_img_url} alt={article.title} className="w-full rounded-lg mb-4" />
                )}
                <p className="text-lg mb-2">{article.body}</p>
                <p className="text-sm text-black mb-2">Author: {article.author}</p>
                <p className="text-sm text-black mb-2">Topic: {article.topic}</p>
                <p className="text-sm text-black mb-2">Created at: {convertToLocalTime(article.created_at)}</p>
                <p className="text-sm text-black mb-4">Comments: {article.comment_count}</p>
                <div className="badge badge-outline">Votes: {votes}</div>
            </div>
              
            <PostComment article_id={article.article_id} comments={comments} setComments={setComments} />
            
            <div className="article-comments mt-8">
                <ArticleComments article_id={article.article_id} comments={comments} setComments={setComments} username={username} />
            </div>
        </div>
    );
}

export default SingleArticle;
