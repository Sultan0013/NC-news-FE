import { NavLink } from "react-router-dom";

const ArticleCard = ({ title, topic, img_url , article_id }) => {
  return (
    <NavLink to={`/articles/${article_id}`}><div className="article-card">
      <img src={img_url} alt={`${title}`} className="article-img" />
      <h2>{title}</h2>
      <p>{topic}</p>
      </div>
          </NavLink>
  );
};

export default ArticleCard;
