import React from "react";
import { Link } from "react-router-dom";
import { useRegister } from "@/lib/auth";
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

export const RegisterForm = ({ onSuccess }: LoginFormProps) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const register = useRegister();

  return (
    <div>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          register.mutate({ username, password });
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
          <button>Register</button>
        </div>
      </form>
    </div>
  );
};
