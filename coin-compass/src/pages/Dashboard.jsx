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

//action
export async function dashboardAction({request}){
  const data = await request.formData();
  console.log(data,request);
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