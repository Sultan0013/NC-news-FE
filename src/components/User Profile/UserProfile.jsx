import { UserContext } from "../../../Context/userContext";
import { useContext } from "react";

function UserProfile() {
  const { loggedUser } = useContext(UserContext);

  return (
    <div className="hero bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen flex items-center justify-center">
      <div className="hero-content flex flex-col lg:flex-row-reverse items-center lg:items-start gap-12 p-10 bg-white rounded-lg shadow-xl">
        <img
          src={loggedUser.avatar_url}
          alt="User Avatar"
          className="w-48 h-48 lg:w-72 lg:h-72 rounded-full shadow-lg border-4 border-gray-200"
        />
        <div className="text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-800">
            {loggedUser.name}
          </h1>
          <p className="mt-6 text-lg text-gray-700">
            Welcome to your profile, {loggedUser.name}!
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
