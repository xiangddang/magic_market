import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Layout } from "antd";
import { selectCurrentUser } from "../../store/user/user.selector";
import ProductDataService from "../../services/product.js";

import "../buy/ProductList.css";

const Favorites = () => {
  const user = useSelector(selectCurrentUser);
  const favorites = user.favorites;
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchFavProducts = async () => {
      const productsData = await Promise.all(
        favorites.map(async (productId) => {
          try {
            const response = await ProductDataService.getProductById(productId);
            return response.data;
          } catch (error) {
            console.error("Error fetching product:", error);
            return null;
          }
        })
      );
      setProducts(productsData.filter((product) => product != null));
    };
    fetchFavProducts();
  }, [favorites]);

  return (
    <Layout>
      <div className="App">
        <Container className="main-container">
          <Row className="listRow">
            {products &&
              products.map((product) => {
                return (
                  <Col key={product._id} xs={12} sm={6} md={3}>
                    <Link to={`/product/${product._id}`} className="linkStyle">
                      <Card className="cardBodyContainer">
                        <Card.Img
                          className="productImage"
                          src={product.image[0]}
                          onError={(e) => {
                            e.target.src = "/images/default_desk.jpg";
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
  );
};

export default Favorites;
