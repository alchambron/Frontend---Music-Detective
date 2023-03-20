import React from "react";
import { NavLink } from "react-router-dom";

export default function ButtonMyAccount() {
  return (
    <div className="button-my-account">
      <NavLink to="/profile">
        <h3>Mon compte</h3>
      </NavLink>
    </div>
  );
}
