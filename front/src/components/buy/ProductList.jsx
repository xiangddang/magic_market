import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Col, Row, Container, Card } from "react-bootstrap";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import Layout from "antd/es/layout/layout.js";
import qs from "qs";
import ProductListSidebar from "./ProductListSidebar";
import ProductDataService from "../../services/product.js";
import { updateUser } from "../../utils/user/user.utils.js";
import { selectCurrentUser } from "../../store/user/user.selector";
import "./ProductList.css";

const ProductsList = () => {
  let location = useLocation();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const queryObj = useMemo(
    () => ({
      category: query.category,
      condition: query.condition,
      price: query.price,
      title: query.title,
    }),
    [query.category, query.condition, query.price, query.title]
  );

  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const retrieveProducts = useCallback(() => {
    ProductDataService.getProducts(queryObj)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [queryObj]);

  useEffect(() => {
    retrieveProducts();
  }, [retrieveProducts]);

  const toggleFavorite = async (productId) => {
    if (!user) {
      return;
    }
    const updateFavorites = user.favorites.includes(productId)
      ? user.favorites.filter((id) => id !== productId)
      : [...user.favorites, productId];

    const updatedUser = { ...user, favorites: updateFavorites };

    try {
      await updateUser(updatedUser, dispatch);
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  return (
    <Layout>
      <ProductListSidebar />
      <Layout>
        <div className="App">
          <Container className="main-container">
            <Row className="listRow">
              {products.map((product) => {
                return (
                  <Col key={product._id} xs={12} sm={6} md={4}>
                    <Link to={`/product/${product._id}`} className="linkStyle">
                      <Card className="cardBodyContainer">
                        <div
                          className="heartContainer"
                          onClick={(e) => {
                            // Check if the click is not on the heart icon
                            if (!e.target.classList.contains("heartIcon")) {
                              e.preventDefault(); // Prevent link navigation
                              toggleFavorite(product._id);
                            }
                          }}
                        >
                          {user && user.favorites.includes(product._id) ? (
                            <HeartFilled className="heartIcon" />
                          ) : (
                            <HeartOutlined className="heartIcon" />
                          )}
                        </div>
                        <Card.Img
                          className="productImage"
                          src={product.image[0] || "/images/default_desk.jpg"}
                          onError={(e) => {
                            e.target.src = "/images/default_desk.jpg";
                          }}
                          style={{
                            maxHeight: "300px",
                            maxWidth: "100%",
                            objectFit: "contain",
                            objectPosition: "center",
                          }}
                        />
                        <Card.Body>
                          <Card.Title> ${product.price}</Card.Title>
                          <Card.Text
                            className="cardTitle"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {product.title}
                          </Card.Text>
                          <Card.Text
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {product.description}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      </Layout>
    </Layout>
  );
};

export default ProductsList;
