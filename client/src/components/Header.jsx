import { useAuth } from "../context/auth-context";
import { MessagesSquare, LogOut } from "lucide-react";
const Header = () => {
  const { signOut } = useAuth();
  return (
    <header>
      <MessagesSquare />
      <h1>ConnectChat</h1>
      <button type="button" onClick={signOut}>
        <LogOut />
      </button>
    </header>
  );
};

export default Header;
