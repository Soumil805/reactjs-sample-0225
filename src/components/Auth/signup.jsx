import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient"; // Import Supabase client

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For redirecting after signup

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Sign up user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const userId = data.user?.id; // Ensure user ID exists
    if (!userId) {
      setError("Signup successful, but user ID not generated.");
      return;
    }

    // Insert user data into the 'users' table
    const { error: dbError } = await supabase
      .from("Users")
      .insert([{ id: userId, email: email, name: username }]); // Use state `username`

    if (dbError) {
      console.log("Database Insert Error:", dbError);
      setError("Signup successful, but failed to save user data.");
    } else {
      alert("Signup successful! Check your email to confirm your account.");
      navigate("/login"); // Redirect to login
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Sign up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button className="w-full bg-blue-600 text-white p-2 rounded">
            Sign up
          </button>
        </form>
        <div className="mt-4 text-center">
          Already have an account?
          <Link to={"/login"} className="text-blue-600 ml-1">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
