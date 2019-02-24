import React from 'react'
import {
    Form, Input, Select, Button,
  } from 'antd';
  
  const { Option } = Select;
  
  class PriceInput extends React.Component {
    static getDerivedStateFromProps(nextProps) {
      // Should be a controlled component.
      if ('value' in nextProps) {
        return {
          ...(nextProps.value || {}),
        };
      }
      return null;
    }
  
    constructor(props) {
      super(props);
  
      const value = props.value || {};
      this.state = {
        number: value.number || 0,
        currency: value.currency || 'NIS',
      };
    }
  
    handleNumberChange = (e) => {
      const number = parseInt(e.target.value || 0, 10);
      if (Number.isNaN(number)) {
        return;
      }
      if (!('value' in this.props)) {
        this.setState({ number });
      }
      this.triggerChange({ number });
    }
  
    handleCurrencyChange = (currency) => {
      if (!('value' in this.props)) {
        this.setState({ currency });
      }
      this.triggerChange({ currency });
    }
  
    triggerChange = (changedValue) => {
      // Should provide an event to pass value to Form.
      const onChange = this.props.onChange;
      if (onChange) {
        onChange(Object.assign({}, this.state, changedValue));
      }
    }
  
    render() {
      const { size } = this.props;
      const state = this.state;
      return (
        <span style={{display:"flex",flexDirection:"row"}}>
          <Input
            type="text"
            size={size}
            value={state.number}
            onChange={this.handleNumberChange}
            style={{  width: '95%', marginRight: '3%' }}
          />
          <Select
            value={state.currency}
            size={size}
           
            onChange={this.handleCurrencyChange}
          >
            <Option value="nis">NIS</Option>
            <Option value="dollar">Dollar</Option>
            <Option value="eth">ETH</Option>
            <Option value="btc">BTC</Option>

          </Select>
        </span>
      );
    }
  }
  
  class Demo extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
  
    checkPrice = (rule, value, callback) => {
      if (value.number > 0) {
        callback();
        return;
      }
      callback('Price must greater than zero!');
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item label="Price" >
            {getFieldDecorator('price', {
              initialValue: { number: 0, currency: 'rmb' },
              rules: [{ validator: this.checkPrice }],
            })(<PriceInput />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  export default Form.create()(PriceInput);