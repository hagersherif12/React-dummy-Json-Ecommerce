import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { DataContext } from "../context/context"

// Wrap any route that requires the user to be logged in.
// Usage in router: element: <ProtectedRoute><Products /></ProtectedRoute>
export const ProtectedRoute = ({ children }) => {
    const { token } = useContext(DataContext)

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return children
}
