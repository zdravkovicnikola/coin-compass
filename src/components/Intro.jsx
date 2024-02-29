import React from "react";
import { Form, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="intro">
      <h1>
        <span className="accent">Orjentišite</span> svoje finasnije
      </h1>
      <p>
        Planiranje troškova je tajna finansijske slobode. Uživaj slobodu već
        danas.
      </p>
      <Link to="/register">
        <button className="button-49">
          <span className="accent">Započni ovde</span>
        </button>
      </Link>
    </div>
  );
};

export default Intro;
