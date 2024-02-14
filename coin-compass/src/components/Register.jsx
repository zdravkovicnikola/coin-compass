import React from "react";
import { Form } from "react-router-dom";
import "../Register.css";
//import '../actions/script.js';
const Register = () => {
  <>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    />
  </>;
  return (
    <>
      <title>Forma</title>
      <div className="container" id="container">
        <div className="form-container sign-up">
          <form>
            <h2>Napravi nalog</h2>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Registruj se</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <Form method = "post">
            <h1>Prijavi se</h1>
            <input
              type="text"
              name="userName"
              required
              placeholder="Unesite e-mail adresu"
              aria-label="E-mail adresa"
              autoComplete="given-name"
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Unesite lozinku"
              aria-label="Lozinka"
              autoComplete="new-password"
            />
            <a href="#">Zaboravljena lozinka?</a>
            <button type="submit">Uloguj se</button>
          </Form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h2>Dobrodosao nazad!</h2>
              <p>
                Evidentirajte svoje lične podatke kako biste mogli da koristite
                sve funkcije sajta.
              </p>
              <button className="hidden" id="login">
                Uloguj se
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h2>Poštovanje, prijatelju!</h2>
              <p>
                Registrujte se koristeći vaše lične podatke kako biste imali
                pristup svim funkcijama sajta.
              </p>
              <button type="submit" className="hidden" id="register">
                Registruj se
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
