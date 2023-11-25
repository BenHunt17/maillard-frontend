import { Outlet } from "react-router-dom";
import HeaderView from "./header/view/HeaderView";
import { MainGutter } from "./common/layout/MainGutter";

export default function App() {
  return (
    <>
      <HeaderView />
      <MainGutter style={{ height: "90vh" }}>
        <Outlet />
      </MainGutter>
    </>
  );
}
