
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Header/Navbar';
import Home from './components/Home';
import Articles from './components/Main/Articles/Articles';
import SingleArticle from './components/Main/SingleArticle/singleArticle';
import Topics from './components/Main/Topics/Topics';
import Users from './components/Main/Users/Users';

function App() {
  return (
    <Router>
      <header>  <NavBar />
      </header>
     
     
      <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/users" element={<Users />} />
      </Routes>
      <p>2024 NC -news</p>
    </Router>
  );
}

export default App;
