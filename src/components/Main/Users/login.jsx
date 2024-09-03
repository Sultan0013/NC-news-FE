import { useState, useContext } from "react";
import { checkUser } from "../../../api/api";
import { UserContext } from "../../../../Context/userContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setLoggedUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username) {
      checkUser(username)
        .then((user) => {
          setLoggedUser(user);
          navigate("/articles");
          setUsername("");
        })
        .catch((err) => {
          if (err.status === 404) {
            setError("Username not found");
          } else {
            setError("An error occurred. Please try again.");
          }
        });
    } else {
      setError("Username is required");
    }
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
    setError(null);
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-vector/geometric-gradient-futuristic-background_23-2149116406.jpg')`,
        backgroundSize: "cover",
      }}
    >
      <div className="card w-96 bg-black bg-opacity-90 shadow-xl p-6">
        <div className="card-body">
          <h2 className="card-title text-center text-2xl font-bold">Login</h2>
          <div className="form-control">
            <label className="label" htmlFor="username">
              <span className="label-text">Username</span>
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="input input-bordered"
              value={username}
              onChange={handleInputChange}
              aria-describedby="error-message"
            />
            {error && (
              <p id="error-message" className="text-red-600 mt-2 text-sm">
                {error}
              </p>
            )}
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
