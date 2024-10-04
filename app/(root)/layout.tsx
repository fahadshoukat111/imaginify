import React from "react";
import Sidebar from "../components/shared/sidebar";
import MobileNav from "../components/shared/mobile-nav";

import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }) => {
  return (
      <main className="root">
        <Sidebar /> <MobileNav />
        <div className="root-container">
          <div className="wrapper">{children}</div>
        </div>
        <Toaster />
      </main>
  );
};

export default Layout;
