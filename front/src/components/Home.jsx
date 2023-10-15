import React, { useState } from "react";
import { Button, Row, Col, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./homePage.css";

const Home = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const handleInputChange = (event) => {
    // event.target.value 包含当前输入框内的文字
    const inputText = event.target.value;
    setKeyword(inputText);
  };

  const handleSearch = () => {
    if (keyword === "") {
      navigate();
    } else {
      navigate(`/product/?title=${keyword}`);
    }
  };

  return (
    <Container className="startContainer">
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
        <div className="text-center mb-4">
          <img
            src="/images/title.png"
            alt="Magic Market"
            style={{ width: "500px", margin: "0 auto", display: "block"}}
          />
        </div>
          <Form
            className="d-flex mb-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <Form.Control
              type="search"
              placeholder="Search for items"
              className="me-2 rounded-pill flex-grow-1"
              onChange={handleInputChange}
            />
            <Button
              variant="primary"
              className="rounded-pill custom-button"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Form>
          <Row className="justify-content-md-center">
            <Col xs={6} md={4} className="mb-3">
              <Button
                variant="outline-primary"
                className="w-100 custom-button"
                onClick={() => navigate("/product")}
              >
                BUY
              </Button>
            </Col>
            <Col xs={6} md={4}>
              <Button
                variant="outline-primary"
                className="w-100 custom-button"
                onClick={() => navigate("/sell")}
              >
                SELL
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
