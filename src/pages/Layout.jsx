import React from "react";
import Navbar from "../components/Fragments/Navbar";
import Sidebar from "../components/Fragments/Sidebar";

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Navbar />
            <div className="columns mt-6" style={{ minHeight: "100vh" }}>
                <div className="column is-3">
                    <Sidebar />
                </div>
                <div className="column has-background-light">
                    <main>{children}</main>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Layout