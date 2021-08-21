import Head from "next/head";
import Image from "next/image";
import SlideComponent from "../components/Slide";

import firebase from "../firebase/clientApp";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import FileHelper from "../services/FileHelper"

import Auth from "../components/Auth";

import { Divider, Row, Col, Button, Upload, Form, Select, Checkbox, Switch, Radio, Input } from "antd";
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

import { useState } from "react";


const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export default function SlidePage() {
  
  const [image, setImage] = useState(null);

  // db
  const db = firebase.firestore();

  // user auth
  const [user, loading, error] = useAuthState(firebase.auth());
  console.log("Loading:", loading, "|", "Current user:", user);

  // get slide
  const [slide, slideLoading, slideError] = useCollection(firebase.firestore().collection("slide"), {});
  if (!slideLoading && slide) {
    slide.docs.map((doc) => console.log(doc.data(), doc.id));
  }

  const normFile = (e) => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);

    const re = /(?:\.([^.]+))?$/;
    const storage = firebase.storage();
    const refimage = values.upload[0];
    const filename = new Date().getTime() + '.' + re.exec(refimage.name)[1];
    
    const uploadTask = storage.ref(`slides/${filename}`).put(refimage);

    uploadTask.on('state_changed', (snapshot) => {}, (error) => {
      console.log('storage error:', error);
    }, () => {
      storage.ref('slides').child(filename).getDownloadURL().then(url => {

        db.collection("slide").add({
          title: values.title,
          filename: filename,
          image_url: url,
          createdAt: new Date()
        });

      });
    });

  };

  return (
      <div
         style={{
            display: "flex",
            height: "100vh",
            width: "100vw",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gridGap: 8,
            background:
               "linear-gradient(180deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
         }}
      >
      {loading && <h4>Loading...</h4>}
      {!user && <Auth />}
      {user && (
        <>
          <h1>Slide</h1>
          
          <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={{
              'input-number': 3,
              'checkbox-group': ['A', 'B'],
              'select': 'usa'
            }}
          >
            
            <Form.Item>
              <h3 className="ant-form-text">New Slide</h3>
            </Form.Item>

            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please input title!' }]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              name="select"
              label="Select"
              hasFeedback
              rules={[{ required: true, message: 'Please select your country!' }]}
            >
              <Select placeholder="Please select a country">
                <Option value="china">China</Option>
                <Option value="usa">U.S.A</Option>
              </Select>
            </Form.Item>

            <Form.Item name="switch" label="Switch" valuePropName="checked">
              <Switch />
            </Form.Item>

            <Form.Item name="radio-group" label="Radio">
              <Radio.Group>
                <Radio value="a">item 1</Radio>
                <Radio value="b">item 2</Radio>
                <Radio value="c">item 3</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="radio-button"
              label="Radio"
              rules={[{ required: true, message: 'Please pick an item!' }]}
            >
              <Radio.Group>
                <Radio.Button value="a">item 1</Radio.Button>
                <Radio.Button value="b">item 2</Radio.Button>
                <Radio.Button value="c">item 3</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="upload"
              label="Upload"
              valuePropName="file"
              getValueFromEvent={ normFile }
              extra="upload only image that file within 2mb"
              rules={[{ required: true, message: 'Please pick an item!' }]}
            >
              <Upload name="logo" listType="picture" multiple={false} maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            
          </Form>


          <Divider />

          <SlideComponent data={ slide }></SlideComponent>
        </>
      )}
    </div>
  );

}
