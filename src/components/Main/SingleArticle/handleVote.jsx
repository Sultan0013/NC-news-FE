import axios from "axios";
import { useEffect } from "react";

function HandleVote(vote , article_id , article_votes , setVotes){
    const votes_info= {
     "inc_votes" : vote
    }

        axios.patch(`https://nc-news-vvdv.onrender.com/api/articles/${article_id}`, votes_info)
            .then(({ data }) => console.log(data))
        .catch((err)=> console.log(err))
 
    
}


export default HandleVote;