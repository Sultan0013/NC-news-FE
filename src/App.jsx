import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Header/Navbar";
import Home from "./components/Home";
import Articles from "./components/Main/Articles/Articles";
import SingleArticle from "./components/Main/SingleArticle/singleArticle";
import ListArticlesByTopic from "./components/Main/Articles/ArticlesListedByTopic";
import Footer from "./components/Header/footer";
import NotFound from "./components/UI/NotFound";
import Login from "./components/Main/Users/login";
import { UserProvider } from "../Context/userContext";
import SignUp from "./components/Main/Users/signup";
import UserProfile from "./components/User Profile/UserProfile";

function App() {
  return (
    <UserProvider>
      <Router>
        <header>
          <NavBar />
        </header>

        <main className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route
              path="/articles/topics/:topic"
              element={<ListArticlesByTopic />}
            />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/userProfile" element={<UserProfile />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
