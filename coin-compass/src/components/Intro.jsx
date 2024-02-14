import React from "react";
import { Form } from "react-router-dom";

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
        <Form className="formica" method="post">
        <input
        type="text"
        name="userName"
        required
        placeholder="Unesite korisničko ime"
        aria-label="Korisničko ime"
        autoComplete="given-name"
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Unesite e-mail adresu"
        aria-label="E-mail adresa"
        autoComplete="email"
      />
      <input
        type="password"
        name="password"
        required
        placeholder="Unesite lozinku"
        aria-label="Lozinka"
        autoComplete="new-password"
      />
      <input
        type="text"
        name="name"
        required
        placeholder="Unesite vaše ime"
        aria-label="Ime"
        autoComplete="name"
      />
        </Form>
      </div>
    </div>
  );
};

export default Intro;
