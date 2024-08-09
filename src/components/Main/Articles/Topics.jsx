import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Topics() {
    const [topics, setTopics] = useState([])


    useEffect(() => {
        axios.get('https://nc-news-vvdv.onrender.com/api/topics')
        .then(({ data }) => {
            console.log(data.topics);
        setTopics(data.topics)
        }).catch((err) => {
        console.log(err);
        })},[])

    
    return (
  <div className="dropdown dropdown-right">
  <div tabIndex={0} role="button" className="btn m-1 bg-yellow-400 text-black">Topics</div>
  <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-30 p-2 shadow bg-yellow-100 text-black">
    {topics.map((topic , index) => {
      return (
        <NavLink to={`/articles/topics/${topic.slug}`} key={index}>
          <li className="btn bg-yellow-200 hover:bg-yellow-300 text-black">{topic.slug}</li>
        </NavLink>
      );
    })}
  </ul>
</div>

    )
}

export default Topics;