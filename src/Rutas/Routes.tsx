import { createBrowserRouter } from "react-router";
import App from "../App";
import CargoOrdrz from "../Paginas/CargoOrders/CargoOrdrz";
import CargoDetails from "../Paginas/CargoDetails/CargoDetails";
import NoHay from "../Paginas/404/NoHay";

export const router = createBrowserRouter([

    {
        path:"/",
        element:<App/>,
        children:[
            {path:"",element:<CargoOrdrz/>},
            {path:"/details/:id",element:<CargoDetails/>},
            {path:"oops!",element:<NoHay/>}

        ]
    }

])