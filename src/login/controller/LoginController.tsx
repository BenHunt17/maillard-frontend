import { useNavigate } from "react-router-dom";
import LoginView from "../view/LoginView";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../core/auth/AuthProvider";
import { useEffect, useState } from "react";
import Loading from "../../common/components/Loading";

export default function LoginController() {
  const { bearerToken, getTokens, loading: passiveLoginLoading } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    if (bearerToken !== undefined) {
      navigate("recipes/");
    }
  }, [bearerToken, navigate]);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      const isSuccessful = await getTokens(response.code);
      if (isSuccessful) {
        navigate("/recipes");
      } else {
        setLoginError(true);
      }
    },
    flow: "auth-code",
  });

  const handleGuestUser = () => navigate("/recipes");

  if (passiveLoginLoading) {
    return <Loading />;
  }
  return (
    <LoginView
      handleLogin={login}
      handleGuestUser={handleGuestUser}
      loginError={loginError}
    />
  );
}
