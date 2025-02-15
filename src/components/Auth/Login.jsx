import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/Home");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4 text-yellow-700">
          Log in!
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-600 mb-3"
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-600 mb-3"
            required
          />
          <button className="w-full bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700">
            Log in
          </button>
        </form>
        <div className="mt-4 text-center">
          Don't have an account?
          <Link to={"/signup"} className="text-yellow-700 ml-1 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
