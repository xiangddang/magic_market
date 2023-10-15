import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Carousel, Container } from "react-bootstrap";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import ProductItemSidebar from "./ProductItemSidebar";
import UserDataService from "../../services/user.js";
import ProductDataService from "../../services/product.js";
import "./ProductItem.css";

const ProductItem = () => {
  const user = useSelector(selectCurrentUser);
  let params = useParams();

  const [product, setProduct] = useState({
    _id: null,
    title: "",
    category: "",
    description: "",
    image: [],
    date: null,
    price: null,
    condition: "",
    seller: "",
  });

  const [seller, setSeller] = useState({
    first_name: "Unknown",
    last_name: "",
  });

  useEffect(() => {
    const getProduct = async (id) => {
      try {
        const response = await ProductDataService.getProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct(params.id);
  }, [params.id]);

  useEffect(() => {
    const getSeller = async (id) => {
      try {
        if (!id) return;
        const response = await UserDataService.get(id);
        setSeller(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSeller(product.seller);
  }, [product]);

  return (
    <Layout>
      <ProductItemSidebar product={product} seller={seller} user={user} />
      <Layout className="rightSide">
        <Container className="image-container">
          <Card className="carousel-card">
            <Card.Body>
              {product.image.length > 0 ? (
                <Carousel>
                  {product.image.map((i, index) => (
                    <Carousel.Item key={index}>
                      <Card.Img
                        src={i}
                        alt={`Image ${index + 1}`}
                        onError={(e) => {
                          e.target.src = "/images/default_desk.jpg";
                        }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <Card.Img src="/images/default_desk.jpg" alt="Default image" />
              )}
            </Card.Body>
          </Card>
        </Container>
      </Layout>
    </Layout>
  );
};

export default ProductItem;
