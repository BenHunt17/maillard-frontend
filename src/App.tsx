import { useEffect, useState } from "react";
import "./App.css";

const uri = process.env.REACT_APP_MAILLARD_API_BASE_URI;

function App() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    fetch(`${uri}/`, { method: "get" }).then((response) =>
      response.text().then((v) => setData(v))
    );
  }, []);

  return <p>{data}</p>;
}

export default App;
