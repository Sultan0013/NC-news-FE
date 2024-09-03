function Error({ error }) {
  return (
    <div
      role="alert"
      className="alert alert-error shadow-lg rounded-lg flex flex-col items-center space-y-4 p-6 bg-red-100 text-red-800"
    >
      <div className="text-center">
        <span className="text-xl font-semibold">Error:</span>
        <p className="mt-2 text-lg">{error.message}</p>
      </div>
    </div>
  );
}

export default Error;
