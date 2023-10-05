import { useNavigate } from "react-router-dom";
import { useAuth } from "./core/authentication/AuthProvider";
import { useEffect } from "react";

export default function App() {
  const { setAdminIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_MAILLARD_API_BASE_URI}/auth/google/admin`, {
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401) {
          setAdminIsLoggedIn(false);
          navigate("/login");
        } else {
          setAdminIsLoggedIn(true);
          navigate("/recipes");
        }
      })
      .catch((_) => {
        //TODO - show error?
      });
  }, [navigate, setAdminIsLoggedIn]);

  return (
    <>
      <p>Loading</p>
    </>
  );
}
