import React, {Fragment} from "react";
import Navbar from "../components/Fragments/Navbar";
import Sidebar from "../components/Fragments/Sidebar";

const Layout = ({ children }) => {
    return (
        <Fragment>
            <Navbar />
            <div className="columns mt-6" style={{ minHeight: "100vh" }}>
                <div className="column is-3 max-w-80">
                    <Sidebar />
                </div>
                <div className="column has-background-light">
                    <main>{children}</main>
                </div>
            </div>
        </Fragment>
    )
}

export default Layout