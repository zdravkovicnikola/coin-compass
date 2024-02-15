// rrd imports
import { Form, NavLink } from "react-router-dom"


// assets
import logomark from "../assets/logomark.svg"

const Nav = ({ userName }) => {
  return (
    <>
    <div className="empty-div"/>
    <nav>
      
      <NavLink
        to="/"
        aria-label="Go to home"
      >
        <img src={logomark} alt="" height={40} />
        <span> <span style={{ color: 'gold'}}>Coin</span>Compass</span>
      </NavLink>
      {
        userName && (
          <Form
            method="post"
            action="logout"
            onSubmit={(event) => {
              if (!confirm("Delete user and all data?")) {
                event.preventDefault()
              }
            }}
          >
            <button type="submit" className="btn btn--warning">
              <span>Izbrisi korisnika</span>
            </button>

          </Form>
        )
      }
    </nav>
    </>
  )
}
export default Nav