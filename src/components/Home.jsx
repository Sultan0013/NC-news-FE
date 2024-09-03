import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?cs=srgb&dl=pexels-stywo-1261728.jpg&fm=jpg)",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-70"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-lg">
          <h1 className="mb-5 text-6xl font-extrabold text-white drop-shadow-lg">
            Welcome to NC News
          </h1>
          <p className="mb-8 text-lg font-light text-gray-200 drop-shadow-md">
            Stay updated with the latest news
          </p>
          <div className="flex justify-center gap-4">
            <NavLink to="/login">
              <button className="btn btn-primary btn-wide">Sign In</button>
            </NavLink>
            <NavLink to="/signup">
              <button className="btn btn-secondary btn-wide">Sign Up</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
