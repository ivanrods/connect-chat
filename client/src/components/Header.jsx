import { useAuth } from "../context/auth-context";
const Header = () => {
  const { signOut } = useAuth();
  return (
    <header>
      <h1>ConnectChat</h1>
      <button type="button" onClick={signOut}>
        Sair
      </button>
    </header>
  );
};

export default Header;
