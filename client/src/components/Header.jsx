import { useAuth } from "../context/auth-context";
import { MessagesSquare, LogOut } from "lucide-react";
import styles from "../styles/Header.module.css";
const Header = () => {
  const { signOut } = useAuth();
  return (
    <div className={styles.container}>
      <header className={styles}>
        <div className={styles.logo}>
          <MessagesSquare />
          <h1>ConnectChat</h1>
        </div>

        <button type="button" onClick={signOut} className={styles.LogOut}>
          <LogOut />
        </button>
      </header>
    </div>
  );
};

export default Header;
