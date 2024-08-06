
import  { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import './Article.css';
import Loading from '../../UI/Loading';
import Error from '../../UI/error';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error , setError] = useState(null)

  useEffect(() => {
    axios.get("https://nc-news-vvdv.onrender.com/api/articles")
      .then(response => setArticles(response.data.articles))
      .catch(error => setError(error));
  }, []);
  if(error) return <Error error={error}/>
 if (articles.length === 0) return <Loading/>;
  return (
    <div className="articles-container">
      <h1>Articles</h1>
      <div className="articles-list">
        {articles.map(article => (
          <ArticleCard
            key={article.article_id}
            title={article.title}
            topic={article.topic}
                img_url={article.article_img_url}
                article_id={article.article_id}
          />
        ))}
      </div>
    </div>
  );
};

export default Articles;
