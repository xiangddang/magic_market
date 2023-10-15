import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Input, Modal } from "antd";
import SideBar from "../shared/SideBar";
import ProductDataService from "../../services/product.js";
import MessageDataService from "../../services/message.js";
import GeocodedMap from "./GeocodedMap.jsx";
import "./ProductItemSidebar.css";

// Function to format date in the format "yyyy-mm-dd"
const formatDate = (date) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString(undefined, options);
};

const ProductItemSidebar = ({ product, seller, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { TextArea } = Input;
  const [comment, setComment] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const leaveComment = () => {
    let newComment = {
      productId: product._id,
      productName: product.title,
      senderId: user._id,
      senderName: `${user.first_name} ${user.last_name}`,
      senderAvatar: user.avatar,
      receiverId: seller._id,
      receiverName: `${seller.first_name} ${seller.last_name}`,
      messageBody: comment,
    };
    MessageDataService.createMessage(newComment)
      .then((response) => {
        ProductDataService.updateProduct({
          ...product,
          buyer: [
            ...product.buyer,
            {
              _id: user._id,
              name: `${user.first_name} ${user.last_name}`,
            },
          ],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <SideBar className="sideBar">
      <Container className="sideContents">
        <div className="product-title">{product.title}</div>
        <div className="date">Listed in {formatDate(product.date)}</div>
        <div className="product-contents">
          <div className="price">${product.price}</div>
          <div className="condition">
            Condition:{" "}
            {product.condition === "BrandNew"
              ? "Brand New"
              : product.condition === "LikeNew"
              ? "Like New"
              : product.condition === "VeryGood"
              ? "Very Good"
              : product.condition}
          </div>
          <div className="description">{product.description}</div>
        </div>
        <h4 className="sel-info">Seller's Info</h4>
        <div className="seller-container">
          <div className="seller-info">
            <img
              src={seller.avatar}
              alt="The avatar of the seller."
              className="seller-avatar"
            />
            <div className="seller-name">{`${seller.first_name} ${seller.last_name}`}</div>
          </div>
          <Button type="dark" onClick={showModal} className="seller-message">
            Send Message
          </Button>
          <Modal
            title="Send message to the seller"
            open={isModalOpen}
            onOk={() => {
              leaveComment();
              handleOk();
            }}
            onCancel={handleCancel}
          >
            <TextArea
              rows={4}
              placeholder="Leave a message"
              style={{ width: "100%" }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Modal>
        </div>
      </Container>
      <div className="app">
        <div className="google-map-container">
          <GeocodedMap city={seller.city} state={seller.state} />
        </div>
      </div>
    </SideBar>
  );
};

export default ProductItemSidebar;
