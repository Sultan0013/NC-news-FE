const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-200 text-center">
      <div className="max-w-md p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-extrabold text-red-500">404</h1>
        <p className="mt-4 text-lg text-base-content">Page not found.</p>
        <p className="text-sm text-base-content">Please check the URL and try again.</p>
        <a href="/" className="mt-6 inline-block px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;
