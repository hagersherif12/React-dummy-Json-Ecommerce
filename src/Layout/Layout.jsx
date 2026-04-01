import { Outlet } from "react-router-dom"
import { Navbar } from "../shared/Navbar"
import { Footer } from "../shared/Footer"
import { TopBanner } from "../shared/TopBanner"

export const Layout = () => {
    return (
        <>
            <TopBanner />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}
