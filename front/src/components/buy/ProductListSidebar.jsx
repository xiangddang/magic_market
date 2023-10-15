import React from "react";
import { Layout, Menu } from "antd";
import Search from "antd/es/input/Search";
import SideBar from "../shared/SideBar";
import { useNavigate } from "react-router-dom";
import "./ProductListSidebar.css";

const { Content } = Layout;
function getItem(label, key, children, type) {
  return {
    label,
    key,
    children,
    type,
  };
}

const items = [
  getItem("All", "all", null, "all"),

  { type: "divider" },

  getItem("Category", "sub2", [
    getItem("Furniture", "furniture", null, "furniture"),
    getItem("Electronic", "electronic", null, "electronic"),
    getItem("Fashion", "fashion", null, "fashion"),
    getItem("School", "school", null, "school"),
  ]),

  { type: "divider" },

  getItem("Condition", "condition", [
    getItem("Brand New", "BrandNew", null, "BrandNew"),
    getItem("Like New", "LikeNew", null, "LikeNew"),
    getItem("Very Good", "VeryGood", null, "VeryGood"),
    getItem("Good", "Good", null, "Good"),
    getItem("Acceptable", "Acceptable", null, "Acceptable"),
  ]),

  { type: "divider" },

  getItem("Price", "price", [
    getItem("< $10", "price1", null, "price1"),
    getItem("$10 - $50", "price2", null, "price2"),
    getItem("$50 - $100", "price3", null, "price3"),
    getItem("$100 - $500", "price4", null, "price4"),
    getItem("> $500", "price5", null, "price5"),
  ]),
];

const ProductListSidebar = () => {
  const navigate = useNavigate();
  let category = React.useRef("");
  let condition = React.useRef("");
  let price = React.useRef("");
  let title = React.useRef("");
  const handleOnClick = ({ key }) => {
    const categories = ["furniture", "electronic", "fashion", "school"];
    const conditions = [
      "BrandNew",
      "LikeNew",
      "VeryGood",
      "Good",
      "Acceptable",
    ];
    const prices = ["price1", "price2", "price3", "price4", "price5"];

    const resetFilters = () => {
      title.current = "";
      category.current = "";
      condition.current = "";
      price.current = "";
    };

    const buildQuery = () => {
      let queryParts = [];
      if (title.current) {
        queryParts.push(`title=${title.current}`);
      }
      if (category.current) {
        queryParts.push(`category=${category.current}`);
      }
      if (condition.current) {
        queryParts.push(`condition=${condition.current}`);
      }
      if (price.current) {
        queryParts.push(`price=${price.current}`);
      }
      return queryParts.join("&");
    };

    if (key === "all") {
      resetFilters();
      return navigate("/product/");
    }

    if (categories.includes(key)) {
      category.current = key;
    } else if (conditions.includes(key)) {
      condition.current = key;
    } else if (prices.includes(key)) {
      price.current = key;
    }

    const query = buildQuery();
    if (query) {
      return navigate(`/product/?${query}`);
    }
  };
  return (
    <SideBar>
      <Search
        placeholder="Search for items"
        allowClear
        enterButton="Search"
        size="large"
        style={{ marginTop: 15, marginLeft: 10, width: 285, marginBottom: 15 }}
        className="custom-search-bar"
        onSearch={(value) => {
          if (value === "") {
            title.current = "";
            category.current = "";
            condition.current = "";
            price.current = "";
            return navigate("/product/");
          } else {
            title.current = value;
            category.current = "";
            condition.current = "";
            price.current = "";
            return navigate(`/product/?title=${title.current}`);
          }
        }}
      />
      <Content style={{ minHeight: 280 }}>
        <Menu
          style={{
            marginLeft: 10,
            width: 285,
            height: "100%",
            borderRadius: 8, // Adjust the value (e.g., 8) to control the amount of rounding
            overflow: "hidden",
            // backgroundColor: "blue"
          }}
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[category.current, condition.current, price.current]}
          items={items}
          onClick={handleOnClick}
        ></Menu>
      </Content>
    </SideBar>
  );
};

export default ProductListSidebar;
