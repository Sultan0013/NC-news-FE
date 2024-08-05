import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {

    axios.get("https://nc-news-vvdv.onrender.com/api/articles")
      .then(response => setArticles(response.data.articles))
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      {articles.map(article => (
        <div key={article.id}>
              <h2>{article.title}</h2>
              <p>{article.topic}</p>   
              <img src={ article.article_img_url} />
        </div>
      ))}
    </div>
  );
};

export default Articles;
