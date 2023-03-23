import React from "react";
import { Link } from "react-router-dom";
import { useLogin } from "@/lib/auth";
import * as z from "zod";
import { loginWithUsernameAndPassword } from "@/features/auth/api/login";

const schema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

type LoginValues = {
  username: string;
  password: string;
};

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
