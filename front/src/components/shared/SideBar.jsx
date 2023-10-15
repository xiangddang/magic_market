import React from "react";

import { Layout } from "antd";

const { Sider } = Layout;

const SideBar = (props) => {
  let { children } = props;
  return (
    <Sider
      width={300}
      className="site-layout-background"
      style={{ minHeight: "100vh", backgroundColor: "#F7EFE5" }}
    >
      {children}
    </Sider>
  );
};

export default SideBar;
