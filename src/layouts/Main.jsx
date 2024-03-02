// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

// assets
import wave from "../assets/wave.svg";

// components
import Nav from "../components/Nav";

//  helper functions
import { fetchData } from "../helpers"

// loader
export function mainLoader() {
  const email = fetchData("email");
  return { email }
}


const Main = () => {
  const { email } = useLoaderData()

  return (
    <div className="layout">
      <Nav email={email} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  )
}
export default Main