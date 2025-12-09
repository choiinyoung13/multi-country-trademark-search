import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import { MainPage } from "./MainPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },

    {
        path: "*",
        element: <Navigate to="/" replace={true} />,
    },
]);

export const Routes = () => {
    return <RouterProvider router={router} />;
};