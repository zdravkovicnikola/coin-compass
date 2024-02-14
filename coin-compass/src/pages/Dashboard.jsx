// rrd imports
import { useLoaderData } from "react-router-dom";

//components
import Intro from "../components/Intro";

//  helper functions
import { fetchData } from "../helpers"

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  return { userName }
}

const Dashboard = () => {
  const { userName } = useLoaderData()

  return (
    <>
      {userName?(<p>{userName}</p>):<Intro/>}
    </>
  )
}
export default Dashboard