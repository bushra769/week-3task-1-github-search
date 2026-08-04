import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchUser = async () => {
    if (!username) return;

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!response.ok) {
        throw new Error("User not found");
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError("GitHub user not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>GitHub User Search</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={searchUser}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {user && (
        <div className="card">
          <img src={user.avatar_url} alt={user.login} />
          <h2>{user.name || user.login}</h2>
          <p>@{user.login}</p>
          <p>{user.bio}</p>

          <div className="stats">
            <span>Followers: {user.followers}</span>
            <span>Following: {user.following}</span>
            <span>Repos: {user.public_repos}</span>
          </div>

          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default App;