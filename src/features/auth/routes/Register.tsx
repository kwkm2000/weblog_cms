import { RegisterForm } from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  return (
    <div>
      <RegisterForm onSuccess={() => navigate("/app")} />
    </div>
  );
};
