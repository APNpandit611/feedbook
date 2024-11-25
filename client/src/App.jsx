import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./components/shared/Landing";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import ViewPost from "./components/ViewPost";
import EditPost from "./components/EditPost";


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/post/detail/:id",
        element: <ViewPost/>
    },
    {
        path: "/post/edit/:id",
        element: <EditPost/>
    }
]);

function App() {
    return (
        <>
            <RouterProvider router={appRouter} />
        </>
    );
}

export default App;
