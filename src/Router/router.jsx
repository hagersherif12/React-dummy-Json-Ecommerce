import { createBrowserRouter } from "react-router-dom"
import { Layout }         from "../Layout/Layout"
import { Home }           from "../pages/Home"
import { Products }       from "../pages/Products"
import { Login }          from "../pages/Login"
import { Register }       from "../pages/Register"
import { SingleProduct }  from "../pages/SingleProduct"
import { Contact }        from "../pages/Contact"
import { Profile }        from "../pages/Profile"
import { NotFound }       from "../pages/NotFound"
import { ProtectedRoute } from "../shared/ProtectedRoute"

export const Route = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            { element: <Home />,     index: true },
            { path: "products",  element: <Products /> },
            {
                path: "products/:productID",
                element: (
                    <ProtectedRoute>
                        <SingleProduct />
                    </ProtectedRoute>
                )
            },
            { path: "login",    element: <Login />    },
            { path: "register", element: <Register /> },
            { path: "contact",  element: <Contact />  },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                )
            },
            { path: "*", element: <NotFound /> },
        ]
    }
])
