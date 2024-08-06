// handleVote.js
import axios from "axios";

const handleVote = (voteChange, article_id, setVotes, votes, setVoteError, setHasAgreed, setHasDisagreed) => {
    
    setVoteError(null);

    const newVotes = votes + voteChange;
    setVotes(newVotes);

    voteChange === 1 ? (setHasAgreed(true), setHasDisagreed(false)) : (setHasAgreed(false), setHasDisagreed(true));

    const votesInfo = { inc_votes: voteChange };

    axios.patch(`https://nc-news-vvdv.onrender.com/api/articles/${article_id}`, votesInfo)
        .then(({ data }) => {
            setVotes(data.article.votes); 
        })
        .catch((err) => {
            setVotes(votes); 
            setVoteError(err);
            setHasAgreed(false);
            setHasDisagreed(false);
        });
};

export default handleVote;
