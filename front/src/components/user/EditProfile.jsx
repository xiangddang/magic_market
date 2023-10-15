import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Cascader, Form, Input, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { selectCurrentUser } from "../../store/user/user.selector";
import { updateUser } from "../../utils/user/user.utils";
import options from "../../store/US_States_and_Cities_Options.json";

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const { TextArea } = Input;

const EditProfile = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  let firstName = Form.useWatch("firstName", form);
  let lastName = Form.useWatch("lastName", form);
  let description = Form.useWatch("description", form);

  const user = useSelector(selectCurrentUser);

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const props = {
    name: "file",
    action: `${process.env.REACT_APP_API_BASE_URL}/product/image`,
    listType: "picture-circle",
    className: "avatar-uploader",
    showUploadList: false,
    beforeUpload: beforeUpload,
    onChange(info) {
      if (info.file.status !== "uploading") {
        setLoading(true);
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        setLoading(false);
        setImageUrl(info.file.response);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        setLoading(false);
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove(file) {
      setImageUrl("");
      message.success(`${file.name} file removed successfully`);
    },
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const updateProfile = () => {
    let newUser = {
      ...user,
      first_name: firstName,
      last_name: lastName,
      description: description,
      state: state,
      city: city,
      avatar: imageUrl || user.avatar,
    };
    updateUser(newUser, dispatch);
  };

  useEffect(() => {
    setState(user.state);
    setCity(user.city);
  }, [user]);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        form={form}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          initialValue={user.first_name}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          initialValue={user.last_name}
        >
          <Input />
        </Form.Item>
        <Form.Item label="State">
          <Cascader
            value={state && city ? [state, city] : []}
            options={options}
            onChange={(value) => {
              setState(value[0]);
              setCity(value[1]);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          initialValue={user.description || ""}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Edit Profile" valuePropName="fileList">
          <Upload {...props}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="Submit">
          <Button onClick={updateProfile}>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProfile;
