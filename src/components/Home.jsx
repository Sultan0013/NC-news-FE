import { NavLink } from "react-router-dom";

function Home() {
    return (<div
  className="hero min-h-screen"
  style={{
    backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">
      Welcome to NC News
      </p>
     <NavLink to={'/articles'}><button className="btn btn-primary">List All Articles</button></NavLink> 
    </div>
  </div>
</div>)
}

export default Home;