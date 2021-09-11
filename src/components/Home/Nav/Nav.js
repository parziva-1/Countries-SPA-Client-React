import { NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "./Nav.module.css";
import { GoThreeBars, GoX } from "react-icons/go";
import SearchBar from "./SearchBar/SearchBar";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  return (
    <div className={styles.navbar}>
      <div
        className={click ? styles.mainContainer : ""}
        onClick={() => Close()}
      />
      <nav className={styles.navbar} onClick={(e) => e.stopPropagation()}>
        <div className={styles.navContainer}>
          <div className={styles.navLogo}>
            <NavLink exact to="/home" className={styles.navLogo}>
              Countries
            </NavLink>
          </div>

          <ul
            className={
              click ? styles.navMenu + " " + styles.active : styles.navMenu
            }
          >
            <li>
              <SearchBar />
            </li>
            <li className={styles.navItem}>
              <NavLink
                exact
                to="/"
                activeClassName={styles.active}
                className={styles.navLinks}
                onClick={click ? handleClick : null}
              >
                Home
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                exact
                to="/activity"
                activeClassName={styles.active}
                className={styles.navLinks}
                onClick={click ? handleClick : null}
              >
                Add Activity
              </NavLink>
            </li>
          </ul>
          <div className={styles.navIcon} onClick={handleClick}>
            {click ? <GoX /> : <GoThreeBars />}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
