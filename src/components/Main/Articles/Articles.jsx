
import  { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import './Article.css';
import Loading from '../../UI/Loading';
import Error from '../../UI/error';
import Topics from './Topics';
import { useSearchParams } from 'react-router-dom';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sort_by = searchParams.get('sort_by') || 'created_at';
    const order = searchParams.get('order') || 'desc';

    axios.get('https://nc-news-vvdv.onrender.com/api/articles', {
      params: {
        sort_by,
        order,
      },
    })
      .then(response => {
        console.log(sort_by, order);
        setArticles(response.data.articles)
      })
      .catch(error => setError(error));
  }, [searchParams]);

  if (error) return <Error error={error} />;
  if (articles.length === 0) return <Loading />;

  const handleSortChange = (e) => {
    const newSortCriteria = e.target.value;
    setSortCriteria(newSortCriteria);
    setSearchParams({ sort_by: newSortCriteria, order: sortOrder });
  };

  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    setSortOrder(newOrder);
    setSearchParams({ sort_by: sortCriteria, order: newOrder });
  };

  return (
    <div className="articles-container">
    <h1 className="text-4xl font-bold text-center text-black mb-6 decoration-primary">
  Articles
</h1>
      <div className="topics-list">
        <Topics />
      </div>
<div className="sort-controls flex items-center space-x-4 p-4 bg-base-200 rounded-lg shadow">
  <label htmlFor="sort-select" className="font-bold text-sm text-base-content">Sort by:</label>
  
  <select id="sort-select" value={sortCriteria} onChange={handleSortChange} className="select select-bordered w-full max-w-40">
    <option value="created_at">Date</option>
    <option value="votes">Votes</option>
    <option value="comment_count">Comments</option>
  </select>
<label htmlFor="order-by" className="font-bold text-sm text-base-content">Order by:</label>
    <select id="order-by" value={sortOrder} onChange={handleOrderChange} className="select select-bordered w-full max-w-40">
    <option value="asc">Ascending</option>
    <option value="desc">Descending</option>

  </select>
</div>


      <div className="articles-list">
        {articles.map(article => (
          <ArticleCard
            key={article.article_id}
            title={article.title}
            topic={article.topic}
            img_url={article.article_img_url}
            article_id={article.article_id}
            votes={article.votes}
            created_at={article.created_at}
          />
        ))}
      </div>
    </div>
  );
};

export default Articles;