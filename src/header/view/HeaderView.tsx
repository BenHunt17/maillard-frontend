import { NavLink, Outlet } from "react-router-dom";

export default function HeaderView() {
  return (
    <>
      <h1>Maillard Recipe Manager</h1>
      <header>
        <nav>
          <NavLink to="/recipes">Recipes</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
