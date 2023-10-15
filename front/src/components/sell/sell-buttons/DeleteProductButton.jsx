import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Popconfirm } from "antd";
import ProductDataService from "../../../services/product.js";
import { updateUser } from "../../../utils/user/user.utils.js";
import "../ProdSoldList.css";

const DeleteProductButton = ({ products, setProducts, product, user }) => {
  const dispatch = useDispatch();
  const [deleteConfirmationStates, setDeleteConfirmationStates] = useState({});
  const handleProductDelete = async (productId) => {
    // Update deleteConfirmationStates for the specific product
    setDeleteConfirmationStates((prevState) => ({
      ...prevState,
      [productId]: { open: false, confirmLoading: true },
    }));

    try {
      // Get the index of the product to be deleted
      const productIndex = products.findIndex(
        (product) => product._id === productId
      );
      const deleteData = {
        productId: productId,
      };

      await ProductDataService.deleteProduct(deleteData);

      // Update user's seller field
      const updatedSoldProducts = user.sold.filter(
        (soldProductId) => soldProductId !== productId
      );

      user.sold = updatedSoldProducts;
      updateUser(user, dispatch);
      // Update local state: remove deleted product and update user
      const updatedProducts = [...products];
      updatedProducts.splice(productIndex, 1);

      setProducts(updatedProducts);

      setTimeout(() => {
        setDeleteConfirmationStates((prevState) => ({
          ...prevState,
          [productId]: { open: false, confirmLoading: false },
        }));
      }, 1000);
    } catch (error) {
      console.error("Error deleting product:", error);
      setDeleteConfirmationStates((prevState) => ({
        ...prevState,
        [productId]: { open: false, confirmLoading: false },
      }));
    }
  };

  const handleDeleteProductCancel = (productId) => {
    setDeleteConfirmationStates((prevState) => ({
      ...prevState,
      [productId]: { open: false, confirmLoading: false },
    }));
  };
  return (
    <Popconfirm
      title="Delete the product"
      description="Are you sure to remove this product?"
      open={deleteConfirmationStates[product._id]?.open}
      onConfirm={() => handleProductDelete(product._id)}
      okButtonProps={{
        loading: deleteConfirmationStates[product._id]?.confirmLoading,
      }}
      onCancel={() => handleDeleteProductCancel(product._id)}
    >
      <Button
        className="del-sold-button"
        type="primary"
        onClick={() => {
          setDeleteConfirmationStates((prevState) => ({
            ...prevState,
            [product._id]: {
              open: true,
              confirmLoading: false,
            },
          }));
        }}
      >
        Delete this product
      </Button>
    </Popconfirm>
  );
};

export default DeleteProductButton;
