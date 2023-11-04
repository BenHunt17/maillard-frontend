import { Outlet } from "react-router-dom";
import HeaderView from "./header/view/HeaderView";

export default function App() {
  return (
    <>
      <HeaderView />
      <Outlet />
    </>
  );
}
