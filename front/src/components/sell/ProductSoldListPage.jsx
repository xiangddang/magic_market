import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Layout, Divider } from "antd";
import { Col, Row, Container, Card as BootstrapCard, Button } from "react-bootstrap";
import ProductDataService from "../../services/product.js";
import { selectCurrentUser } from "../../store/user/user.selector";
import { Link } from "react-router-dom";
import DeleteProductButton from "./sell-buttons/DeleteProductButton.jsx";
import SellProductButton from "./sell-buttons/SellProductButton.jsx";
import "./ProdSoldList.css";

const ProductSoldListPage = () => {
  const user = useSelector(selectCurrentUser);
  const isLoggedIn = !!user;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const sold = user?.sold || [];
    const fetchSoldProducts = async () => {
      const productsData = await Promise.all(
        sold.map(async (productId) => {
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
    fetchSoldProducts();
  }, [user]);

  return (
    isLoggedIn && (
      <Layout>
        <div className="App">
          <Container className="main-container">
            {products.length === 0 ? (
              <div className="pageContainer">
                <div className="contentContainer">
                  <p>Let's sell products!</p>
                </div>
              </div>
            ) : (
              <div className="prod-list">
                {products.map((product) => {
                  return (
                    <div key={product._id} className="prod-item">
                      <div className="prod-container">
                        <BootstrapCard className="bootstrap-card">
                          <BootstrapCard.Body>
                            <BootstrapCard.Title className="prod-title">
                              {product.title}
                            </BootstrapCard.Title>
                            <Divider></Divider>
                            <div className="row">
                              <div className="col-md-3">
                                <div className="image-container">
                                  <img
                                    className="sellProd-image"
                                    src={
                                      product.image[0] ||
                                      "/images/default_desk.jpg"
                                    }
                                    alt="show product"
                                    onError={(e) => {
                                      e.target.src = "/images/default_desk.jpg";
                                    }}
                                    style={{ width: "150px", height: "150px" }}
                                  />
                                </div>
                              </div>
                              <div className="col-md-9">
                                <div className="sold-descrip">
                                  {product.description}
                                </div>
                                <div className="sold-status">
                                  Product status: {product.status.toUpperCase()}
                                </div>

                                <Row className="align-items-center">
                                  <Col>
                                    <SellProductButton
                                      product={product}
                                      products={products}
                                      setProducts={setProducts}
                                    />
                                  </Col>
                                  <Col>
                                    <DeleteProductButton
                                      product={product}
                                      products={products}
                                      setProducts={setProducts}
                                      user={user}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to={"/sell/edit"}
                                      state={{ product: product }}
                                    >
                                      <Button
                                        variant="primary"
                                        className="del-sold-button"
                                      >
                                        Edit
                                      </Button>
                                    </Link>
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </BootstrapCard.Body>
                        </BootstrapCard>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        </div>
      </Layout>
    )
  );
};

export default ProductSoldListPage;
