import React from "react";
import Sidebar from "../components/shared/sidebar";
import MobileNav from "../components/shared/mobile-nav";

const Layout = ({ children }) => {
  return (
    <main className="root">
      <Sidebar />;
      <MobileNav />
      <div className="root">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
