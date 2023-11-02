import React from "react";
import useAuth from "@/lib/auth";
import { loginWithUsernameAndPassword } from "@/features/auth/api/login";
import { login } from "@/features/auth/repositories/index";

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login } = useAuth();

  return (
    <div>
      <form
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          try {
            // const userResponse = await login({ username, password });
            login({ username, password });
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
