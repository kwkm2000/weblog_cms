import React from "react";
import { useLogin } from '@/features/auth/hooks/useLogin';
import { useNavigate } from "react-router-dom";

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login } = useLogin();
  const navigate = useNavigate();

  return (
    <div>
      <form
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          try {
            // const userResponse = await login({ username, password });
             await login({ username, password });

            navigate("/");
          } catch (error) {
            console.error("login failed", error);
          }
        }}
      >
        <input
          type="text"
          placeholder="Username"
          onInput={(e) => {
            setUsername(e.currentTarget.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          onInput={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <div>
          <button>Log in</button>
        </div>
      </form>
    </div>
  );
};
