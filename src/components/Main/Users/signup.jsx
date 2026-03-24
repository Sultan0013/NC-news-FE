import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../api/api";
import { UserContext } from "../../../../Context/userContext";

const SignUp = () => {
  const { setLoggedUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (username && name && avatarUrl) {
      const newUser = {
        username,
        name,
        avatar_url: avatarUrl,
      };

      createUser(newUser)
        .then((user) => {
          setLoggedUser(user);
          setUsername("");
          setName("");
          setAvatarUrl("");
          navigate("/articles");
        })
        .catch((err) => {
          setError("Failed to create account. Please try again.");
        });
    } else {
      setError("All fields are required.");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-vector/futuristic-background-design_23-2148503793.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="card w-96 bg-black bg-opacity-90 shadow-xl p-6">
        <div className="card-body">
          <h2 className="card-title text-center text-2xl font-bold">Sign Up</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input input-bordered"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(null);
              }}
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Avatar URL</span>
            </label>
            <input
              type="text"
              placeholder="Enter your avatar URL"
              className="input input-bordered"
              value={avatarUrl}
              onChange={(e) => {
                setAvatarUrl(e.target.value);
                setError(null);
              }}
            />
          </div>

          {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}

          <div className="form-control mt-6">
            <button className="btn btn-primary" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
