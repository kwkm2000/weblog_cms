import React from "react";
import { useRegister } from "@/lib/auth";

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
