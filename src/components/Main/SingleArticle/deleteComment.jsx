import axios from 'axios';

const DeleteComment = async (comment_id) => {
   
    try {
        await axios.delete(`https://nc-news-vvdv.onrender.com/api/comments/${comment_id}`);
        return true;  
    } catch (error) {
        console.error('Error deleting comment:', error);
        return false;  
    }
};

export default DeleteComment;
