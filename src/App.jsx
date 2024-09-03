import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Header/Navbar";
import Home from "./components/Home";
import Articles from "./components/Main/Articles/Articles";
import SingleArticle from "./components/Main/SingleArticle/singleArticle";
import Topics from "./components/Main/Articles/Topics";
import Users from "./components/Main/Users/Users";
import ListArticlesByTopic from "./components/Main/Articles/ArticlesListedByTopic";
import Footer from "./components/Header/footer";
import NotFound from "./components/UI/NotFound";
import Login from "./components/Main/Users/login";
import { UserProvider } from "../Context/userContext";
import SignUp from "./components/Main/Users/singup";
function App() {
  return (
    <UserProvider>
      <Router>
        <header>
          <NavBar />
        </header>

        <main className="flex-grow container mx-auto bg-black-100 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route
              path="/articles/topics/:topic"
              element={<ListArticlesByTopic />}
            />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
