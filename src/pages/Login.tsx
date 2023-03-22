import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const login = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("login");
  }, []);

  return (
    <form onSubmit={login}>
      <div className="App">login</div>
      <div>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button>Login</button>
    </form>
  );
}

export default Login;
