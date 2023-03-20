import { Link } from "react-router-dom";
import * as z from "zod";
import { useAuth } from "@/lib/auth";

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
  const { login, isLoggingIn } = useAuth();

  return (
    <div>
      <form action="" onSubmit={}>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="password" />
        <div>
          <button>Log in</button>
        </div>
      </form>
    </div>
  );
};
