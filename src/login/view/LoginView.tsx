interface LoginViewProps {
  handleLogin: () => void;
  handleGuestUser: () => void;
}

export default function LoginView({
  handleLogin,
  handleGuestUser,
}: LoginViewProps) {
  return (
    <>
      <h1>Maillard Recipe Manager</h1>
      <button onClick={handleLogin}>Sign In As Admin</button>
      <button onClick={handleGuestUser}>Continue As Guest</button>
    </>
  );
}
