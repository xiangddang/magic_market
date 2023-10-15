import React, { useState, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
  Popover,
} from "antd";
import ProductDataService from "../../services/product";
import { updateUser } from "../../utils/user/user.utils";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import Login from "../Login";
import categoryConditionContent from "../../store/categoryConditionContent.json";

import { useLocation } from "react-router-dom";

const { TextArea } = Input;

const categoryOptions = [
  { label: "Furniture", value: "furniture" },
  { label: "Electronic", value: "electronic" },
  { label: "Fashion", value: "fashion" },
  { label: "School Things", value: "school" },
];

const ConditionOptions = [
  { label: "Brand New", value: "BrandNew" },
  { label: "Like New", value: "LikeNew" },
  { label: "Very Good", value: "VeryGood" },
  { label: "Good", value: "Good" },
  { label: "Acceptable", value: "Acceptable" },
];

const ProductSellPage = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  let title = Form.useWatch("title", form);
  let category = Form.useWatch("category", form);
  let description = Form.useWatch("description", form);
  let price = Form.useWatch("price", form);
  let [condition, setCondition] = useState();
  const [image, setImage] = useState([]);

  const location = useLocation();
  const product = location.state?.product;

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (product) {
      setIsEditMode(true);
      form.setFieldsValue({
        title: product.title,
        category: product.category,
        condition: product.condition,
        description: product.description,
        price: product.price,
      });
      setCondition(product.condition);
      setImage(product.image);
    }
  }, [product, form]);

  const handleConditionChange = (value) => {
    setCondition(value);
  };

  const props = {
    name: "file",
    action: `${process.env.REACT_APP_API_BASE_URL}/product/image`,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        setImage([...image, info.file.response]);
        messageApi.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        messageApi.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove(file) {
      setImage(image.filter((item) => item !== file.response.image));
      messageApi.success(`${file.name} file removed successfully`);
    },
  };

  const checkProduct = () => {
    return title && category && description && price && condition;
  };

  const uploadProduct = () => {
    if (!user) {
      messageApi.error({
        content: "Please login first",
        style: {
          marginTop: "150px",
        },
      });
      return;
    }
    if (!checkProduct()) {
      messageApi.error({
        content: "Please fill all the fields",
        style: {
          marginTop: "150px",
        },
      });
      console.log("Not all fields filled.");
      return;
    }
    let newProduct = {
      title: title,
      category: category,
      description: description,
      price: price,
      condition: condition,
      seller: user._id,
      image: image,
      status: "new",
    };
    ProductDataService.createProduct(newProduct)
      .then((res) => {
        let newUSer = {
          ...user,
          sold: [...user.sold, res.data.response.insertedId],
        };
        updateUser(newUSer, dispatch);
        messageApi.success({
          content: "Product uploaded successfully",
          style: {
            marginTop: "150px",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        messageApi.error({
          content: "Product upload failed",
          style: {
            marginTop: "150px",
          },
        });
      });
  };

  const updateProduct = () => {
    const updatedProductData = {
      _id: product._id,
      title: title,
      category: category,
      description: description,
      price: price,
      condition: condition,
      seller: user._id,
      image: image,
      status: "new",
      date: product.date,
    };
    console.log(updatedProductData);

    ProductDataService.updateProduct(updatedProductData)
      .then((res) => {
        // ... (update user and show success message)
        setIsEditMode(false); // Exit edit mode
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getConditionContent = (categoryConditionContent) => {
    let conditionContent = categoryConditionContent[category];
    if (!conditionContent) {
      return (
        <div>Please choose the category, so we could give you some hints.</div>
      );
    }

    return (
      <div>
        <p>
          <b>{conditionContent.title}</b>
        </p>
        {Object.entries(conditionContent.conditions).map(
          ([condition, description]) => (
            <p key={condition}>
              <b>{condition}:</b> {description}
            </p>
          )
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {user ? (
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          form={form}
        >
          {contextHolder}
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select options={categoryOptions} />
          </Form.Item>
          <Form.Item label="Condition" name="condition">
            <div className="select-container">
              <Select
                onChange={handleConditionChange}
                options={ConditionOptions}
                defaultValue={condition}
              />
              <Popover
                content={getConditionContent(categoryConditionContent)}
                title="Condition Helper"
                trigger="hover"
                placement="right"
                overlayStyle={{ width: "300px" }}
                className="popover-content"
              >
                <img
                  src="/images/info-circle-fill.svg"
                  alt="info logo"
                  className="info-icon"
                  style={{ width: "16px", height: "16px" }}
                />
              </Popover>
            </div>
          </Form.Item>

          <Form.Item label="Description" name="description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Images" valuePropName="fileList">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Submit">
            <Button onClick={isEditMode ? updateProduct : uploadProduct}>
              {isEditMode ? "Save changes" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default ProductSellPage;
