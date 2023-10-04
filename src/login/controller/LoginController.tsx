import { useNavigate } from "react-router-dom";
import { useAuth } from "../../core/authentication/AuthProvider";
import LoginView from "../view/LoginView";

export default function LoginController() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGuestUser = () => navigate("/recipes");

  return <LoginView handleLogin={login} handleGuestUser={handleGuestUser} />;
}
