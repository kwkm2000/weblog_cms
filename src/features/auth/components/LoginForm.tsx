import React from "react";
import { useLogin } from "@/lib/auth";
import { loginWithUsernameAndPassword } from "@/features/auth/api/login";

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const login = useLogin();

  return (
    <div>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          // useLogin({ username, password });
          login.mutate({ username, password });
          loginWithUsernameAndPassword({ username, password });
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
