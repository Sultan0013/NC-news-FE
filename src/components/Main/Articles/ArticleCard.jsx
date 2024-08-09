import { NavLink } from "react-router-dom";

const ArticleCard = ({ title, topic, img_url, article_id, votes, created_at }) => {
  
      
const convertToLocalTime = (created_at) => {
  const date = new Date(created_at);
  return date.toLocaleString().split(',')[0]
};

  return (
    
<NavLink to={`/articles/${article_id}`} className="block mb-4">
  <div className="card lg:card-side bg-black text-gray-100 shadow-xl">
    <figure className="w-full lg:w-1/3 ">
      <img
        src={img_url}
        alt={title}
        className="h-48 w-full object-cover"
      />
    </figure>
    <div className="card-body">
          <h2 className="card-title">{title}</h2>
        
          <p>{topic}</p>
          <p>Votes : { votes}</p>
    <p>Created at: {convertToLocalTime(created_at)}</p>
    </div>
  </div>
</NavLink>



   
  );
};

export default ArticleCard;
