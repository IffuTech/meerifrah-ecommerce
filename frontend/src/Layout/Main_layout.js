import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <>
      <div className="wrapper">
        <main className="adminPage">
          <Header />
          <div className="">
            <div className="middle" style={{zIndex:"-1"}}>
              <Outlet />
              <div
                className="pageLoader"
                style={{ display: props.loaderVal ? "block" : "none" }}
              >
                <div className="spinner-border"></div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <Footer />
          </footer>
        </main>
      </div>
    </>
  );
};

export default Layout;
