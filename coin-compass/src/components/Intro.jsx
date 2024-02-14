import React from "react";
import { Form } from "react-router-dom";
import {Link} from "react-router-dom";


//assets
import illustration from "../assets/illustration.jpg";


const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          <span className="accent">Orjentišite</span> svoje finasnije
        </h1>
        <p>
          Planiranje troškova je tajna finansijske slobode. Uživaj slobodu već
          danas.
        </p>
        <Link to= "/register">
         <button className="button-49"><span className="accent">Započni ovde</span></button>
          </Link>
      </div>
      <img src={illustration} alt="Osoba sa novcem" />
    </div>
  );
};

export default Intro;
