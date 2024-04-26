"use client";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="my-2">
      <p style={{ color: "red" }}>
        {error.name}:{error.message}
      </p>
      <button
        onClick={() => resetErrorBoundary()}
        className="my-2 text-center bg-orange-500 hover:bg-orange-600 text-white
                py-2 px-5 rounded-md"
      >
        Reset
      </button>
    </div>
  );
}
