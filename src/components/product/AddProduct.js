import React from 'react';
import {
  InputNumber, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Layout
} from 'antd';
import PicturesWall from "./PictureWall"
import PriceInput from './PriceInput'
import DynamicFieldSet from "./DynamicFieldSet"
// import { observer } from "mobx-react";


const { Content } = Layout;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;


class AddProduct extends React.Component {


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;


    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 12,
          offset: 0,
        },
        sm: {
          span: 8,
          offset: 6,
        },
      },
    };



    return (
      <>


        <Content style={{ paddingTop: "2%", backgroundColor: '#fcfcfc' }}>


          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              {...formItemLayout}
              label={(
                <span>
                  Product title&nbsp;
              </span>
              )}
            >
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input your product title!', whitespace: true }],
              })(
                <Input placeholder="title" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Select category"
            >
              {getFieldDecorator('select-multiple1', {
                rules: [
                  { required: true, message: 'Please select the relevant category!', type: 'array' },
                ],
              })(
                <Select mode="multiple" placeholder="Please select the relevant category">
                  <Option value="clothes">Clothes</Option>
                  <Option value="baby stuff">Baby stuff</Option>
                  <Option value="sport equipment">Sport equipment</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Sub-category"
            >
              {getFieldDecorator('select-multiple2', {
                rules: [
                  { required: true, message: 'Please select sub category!', type: 'array' },
                ],
              })(
                <Select mode="multiple" placeholder="Please select sub category">
                  <Option value="sub1">sub 1</Option>
                  <Option value="sub2">sub 2</Option>
                  <Option value="sub3">sub 3</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label={(
                <span>
                  Upload photo's
              </span>
              )}
            >
              {getFieldDecorator('photo', {
              })(
                <PicturesWall />
              )}

            </Form.Item>
            <div  {...formItemLayout} >
              <Form.Item {...formItemLayout}
                label={(
                  <span>
                    Time period & pricing
              </span>
                )}>
                {getFieldDecorator('pricing', {
                  rules: [{ required: true }],
                })(
                  <span style={{ display: "flex" }}>
                    <DynamicFieldSet />
                  </span>
                )}

              </Form.Item>
            </div>

            <Form.Item label="Description" {...formItemLayout}
            >
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: 'please enter product description',
                  },
                ],
              })(<Input.TextArea rows={4} placeholder="please enter product description" />)}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Quality"
            >
              {getFieldDecorator('quality', {
                rules: [{ required: true, message: 'Please input your product quality!' }],
              })(
                <Select labelInValue defaultValue={{ key: 'lucy' }} style={{ width: 120 }}>
                  <Option value="excellent">Excellent</Option>
                  <Option value="good">Good</Option>
                  <Option value="normal">Normal</Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Retail price"
            >
              {getFieldDecorator('retailPrice')(
                <PriceInput />
              )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>I have read the <a href="">agreement</a></Checkbox>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">submit</Button>
            </Form.Item>
          </Form>
        </Content>
      </>

    );
  }
}

export default Form.create()(AddProduct);