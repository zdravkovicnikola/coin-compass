import React from 'react'
import { useRouteError, Link, useNavigate } from "react-router-dom"

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="error">
      <h1>Ups! Imamo problem.</h1>
      <p>{error.message || error.statusText}</p>
      <div className="flex-md">
        <button
          className="btn btn--dark"
          onClick={() => navigate(-1)}
        >
          <span>Nazad</span>
        </button>
        <Link
          to="/"
          className="btn btn--dark"
        >
          <span>Pocetna strana</span>
        </Link>
      </div>
    </div>
  )
}

export default Error