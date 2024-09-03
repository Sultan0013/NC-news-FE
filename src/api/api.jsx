// src/api/api.jsx
import axios from "axios";

const API_BASE_URL = "https://nc-news-vvdv.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error.response) {
      if (error.response.status === 404) {
        return Promise.reject({
          status: 404,
          message:
            "404 : Sorry, we couldn't find the recourse you were looking for. It might have been moved, deleted, or never existed. Please check the URL or visit our homepage to find what you need. If you think this is a mistake, contact support for assistance.",
        });
      }
      if (error.response.status === 400) {
        return Promise.reject({
          status: 404,
          message:
            "400 : Sorry, there was a problem with your request. Please check the details and try again. If you need assistance, contact support.",
        });
      }
      if (error.response.status === 500) {
        return Promise.reject({
          status: 500,
          message:
            "500 : Oops! Something went wrong on our end. We're working hard to fix it. Please try again later. If the problem persists, feel free to contact support for more help.",
        });
      }
    }

    return Promise.reject({
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred. Please try again later or contact support if the issue persists.",
    });
  }
);

const fetchArticles = (sort_by = "created_at", order = "desc", topic) => {
  return api
    .get("/articles", {
      params: { sort_by, order, topic },
    })
    .then((response) => response.data.articles);
};

const fetchArticle = (article_id) => {
  return api
    .get(`/articles/${article_id}`)
    .then((response) => response.data.article[0]);
};

const fetchTopics = () => {
  return api.get("/topics").then((response) => response.data.topics);
};

const updateVotes = (article_id, vote_info) => {
  return api
    .patch(`/articles/${article_id}`, vote_info)
    .then((response) => response.data.votes);
};

const fetchComments = (article_id) => {
  return api
    .get(`/articles/${article_id}/comments`)
    .then((response) => response.data.comments);
};

const AddComment = (article_id, newComment) => {
  return api
    .post(`/articles/${article_id}/comments`, newComment)
    .then((response) => response.data.Comment);
};

const deleteComment = (comment_id) => {
  return api.delete(`/comments/${comment_id}`).then((response) => true);
};

const checkUser = (username) => {
  return api.get(`/users/${username}`).then((response) => {
    return response.data;
  });
};

const createUser = (user) => {
  return api.post("/users/signup", user).then((response) => {
    response.data;
  });
};

export {
  fetchArticles,
  fetchTopics,
  AddComment,
  fetchArticle,
  fetchComments,
  deleteComment,
  updateVotes,
  checkUser,
  createUser,
};
