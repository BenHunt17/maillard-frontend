import "./App.css";

function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const success = searchParams.get("success");

  const login = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_MAILLARD_API_BASE_URI}/auth/google/login`,
      { credentials: "include" }
    );
    const data = await response.json();
    window.location.href = data.url;
  };

  const test = () => {
    fetch(`${process.env.REACT_APP_MAILLARD_API_BASE_URI}/test`, {
      credentials: "include",
    }).then((res) => {
      console.log(res.json);
    });
  };

  return (
    <div>
      <button onClick={login}>Login</button>
      <button onClick={test}>Test</button>
      {success === "true" && <p style={{ color: "green" }}>Success</p>}
      {success === "false" && <p style={{ color: "red" }}>Failed</p>}
    </div>
  );
}

export default App;
