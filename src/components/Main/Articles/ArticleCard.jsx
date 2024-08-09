import { NavLink } from "react-router-dom";

const ArticleCard = ({ title, topic, img_url , article_id }) => {
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
          
    
    </div>
  </div>
</NavLink>



   
  );
};

export default ArticleCard;
