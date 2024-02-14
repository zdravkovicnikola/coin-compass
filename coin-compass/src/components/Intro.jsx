import React from "react";
import { Form, NavLink } from "react-router-dom"
import {Link} from "react-router-dom";


//assets
import illustration from "../assets/illustration.jpg";
import Register from "./Register";


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

        {/* <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your name?" 
            aria-label="Your Name" 
            autoComplete="given-name"
          />
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
          </button>
        </Form> */}
         <button className="button-49"><span className="accent">Započni ovde</span></button>
      </div>
      <Register />
    </div>
  );
};

export default Intro;
