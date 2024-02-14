import React from 'react'
import { Form } from 'react-router-dom'
import '../Register.css'
//import '../actions/script.js';
const Register = () => {
    <>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
/>
</>
  return (
    // <div className="containerR">
    //     <div className="headerR">
    //     <h2 className="naslov">Regstracija</h2>
    //  <div className="underline"/>
    //  </div>
    //  <Form className="form" method="post">
    //     <input
    //     type="text"
    //     name="userName"
    //     required
    //     placeholder="Unesite korisničko ime"
    //     aria-label="Korisničko ime"
    //     autoComplete="given-name"
    //   />
    //   <input
    //     type="email"
    //     name="email"
    //     required
    //     placeholder="Unesite e-mail adresu"
    //     aria-label="E-mail adresa"
    //     autoComplete="email"
    //   />
    //   <input
    //     type="password"
    //     name="password"
    //     required
    //     placeholder="Unesite lozinku"
    //     aria-label="Lozinka"
    //     autoComplete="new-password"
    //   />
    //   <input
    //     type="text"
    //     name="name"
    //     required
    //     placeholder="Unesite vaše ime"
    //     aria-label="Ime"
    //     autoComplete="name"
    //   />
    //   <button type="submit"className= "btn btn--dark">
    //     <span>Registriraj se</span>
    //   </button>
    //   <button type="submit"className= "btn btn--dark">
    //     <span>Uloguj se</span>
    //   </button>
    //     </Form> 
    //     </div>


    <>
  <title>Modern Login Page | AsmrProg</title>
  <div className="container" id="container">
    <div className="form-container sign-up">
      <form>
        <h1>Create Account</h1>
        <div className="social-icons">
          <a href="#" className="icon">
            <i className="fa-brands fa-google-plus-g" />
          </a>
          <a href="#" className="icon">
            <i className="fa-brands fa-facebook-f" />
          </a>
          <a href="#" className="icon">
            <i className="fa-brands fa-github" />
          </a>
          <a href="#" className="icon">
            <i className="fa-brands fa-linkedin-in" />
          </a>
        </div>
        <span>or use your email for registeration</span>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign Up</button>
      </form>
    </div>
    <div className="form-container sign-in">
      <form>
        <h1>Sign In</h1>
        <div className="social-icons">
          <a href="#" className="icon">
            <i className="fa-brands fa-google-plus-g" />
          </a>
          <a href="#" className="icon">
            <i className="fa-brands fa-facebook-f" />
          </a>
          <a href="#" className="icon">
            <i className="fa-brands fa-github" />
          </a>
          <a href="#" className="icon">
            <i className="fa-brands fa-linkedin-in" />
          </a>
        </div>
        <span>or use your email password</span>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <a href="#">Forget Your Password?</a>
        <button>Sign In</button>
      </form>
    </div>
    <div className="toggle-container">
      <div className="toggle">
        <div className="toggle-panel toggle-left">
          <h1>Welcome Back!</h1>
          <p>Enter your personal details to use all of site features</p>
          <button className="hidden" id="login">
            Sign In
          </button>
        </div>
        <div className="toggle-panel toggle-right">
          <h1>Hello, Friend!</h1>
          <p>Register with your personal details to use all of site features</p>
          <button className="hidden" id="register">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
</>

  )
}

export default Register