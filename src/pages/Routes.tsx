import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import { SearchPage } from "./SearchPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <SearchPage />,
    },

    {
        path: "*",
        element: <Navigate to="/" replace={true} />,
    },
]);

export const Routes = () => {
    return <RouterProvider router={router} />;
};