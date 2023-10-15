import React, { useState } from "react";
import { Button, Modal, Select } from "antd";
import ProductDataService from "../../../services/product.js";
import "../ProdSoldList.css";

const SellProductButton = ({ product, products, setProducts }) => {
  const [buyerId, setBuyerId] = useState("");

  const handlehange = (value) => {
    setBuyerId(value);
  };
  const handleBuyerOptions = (product) => {
    if (!product || !product.buyer) {
      return [];
    }
    return product.buyer.map((buyer) => ({
      label: buyer.name,
      value: buyer._id,
    }));
  };
  const handleBuyerChange = async (product, buyerId) => {
    if (!product || !buyerId) {
      handleOk();
      return;
    }
    const productId = product._id;
    try {
      const updatedProducts = products.map((product) =>
        product._id === productId
          ? {
              ...product,
              status: "sold",
              buyer: product.buyer.filter((buyer) => buyer._id === buyerId),
            }
          : { ...product }
      );
      setProducts(updatedProducts);
      ProductDataService.updateProduct({
        ...product,
        status: "sold",
        buyer: product.buyer.filter((buyer) => buyer._id === buyerId),
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.error("Error updating product:", error);
    }
    setBuyerId("");
    handleOk();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button variant="primary" className="del-sold-button" onClick={showModal}>
        Sold the product
      </Button>
      <Modal
        title="Who bought this product?"
        open={isModalOpen}
        onOk={() => handleBuyerChange(product, buyerId)}
        onCancel={handleCancel}
      >
        <Select
          style={{ width: 120 }}
          options={handleBuyerOptions(product)}
          onChange={handlehange}
        ></Select>
      </Modal>
    </>
  );
};

export default SellProductButton;
