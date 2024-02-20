import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/">
          <p>Wealth Health</p>
        </NavLink>
      </div>
      <div className={styles.navigation}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activeLink : undefined
          }
        >
          Create
        </NavLink>
        <NavLink
          to="/view"
          className={({ isActive }) =>
            isActive ? styles.activeLink : undefined
          }
        >
          View
        </NavLink>
      </div>
    </header>
  );
}
