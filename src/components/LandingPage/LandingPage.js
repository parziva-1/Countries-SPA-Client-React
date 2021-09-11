import { Redirect, useHistory } from "react-router";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const history = useHistory();
  return (
    <div className={styles.back}>
      <div className={styles.card}>
        <button onClick={() => history.push("/home")}>Click</button>
      </div>
    </div>
  );
};

export default LandingPage;
