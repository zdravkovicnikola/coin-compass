import React , { useState } from "react";

import { Form, useNavigate  } from "react-router-dom";
import "../pages/Register.css";
import Slika from '../assets/formaslika.png';


const Register = () => {
  <>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    />
  </>;

const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    const container = document.getElementById('container');
    container.classList.add("active");
  };

  const handleLoginClick = () => {
    const container = document.getElementById('container');
    container.classList.remove("active");
  };
  return (
    <>
      <title>Forma  </title>
      <div className="container" id="container">
        <div className="form-container sign-up">
        <Form method = "post" >
            <p>...</p>
            <h1>Registruj se</h1>
            <p>...</p>
            <input
              type="text"
              name="userName"
              required
              placeholder="Unesite korisničko ime"
              aria-label="Username"
              autoComplete="given-name"
            />
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
            <input type="hidden" name= '_action' value = 'newUser'/>
            <button type="submit">Registruj se</button>
            </Form>
        </div>
        <div className="form-container sign-in">
          <Form method = "post" >
            <p>...</p>
            <h1>Prijavi se</h1>
            <p>...</p>
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
            <input type="hidden" name= '_action' value = 'newUser'/>
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
              <button className="hidden" id="login"onClick={handleLoginClick}>
                Uloguj se
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h2>Poštovanje, prijatelju!</h2>
              <p>
                Registrujte se koristeći vaše lične podatke kako biste imali
                pristup svim funkcijama sajta.
              </p>
              <button type="submit" className="hidden" id="register"onClick={handleRegisterClick}>
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
