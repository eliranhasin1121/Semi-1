import { Button, Form, Icon, Input, Modal, Select } from 'antd';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import rootStores from '../../stores';
import PaymentStore from '../../stores/PaymentStore';

function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some((field) => fieldsError[field]);
}
const Option = Select.Option;
function onChange(value) {
	console.log(`selected ${value}`);
}

function onBlur() {
	console.log('blur');
}

function onFocus() {
	console.log('focus');
}

function onSearch(val) {
	console.log('search:', val);
}
function handleMonthChange(value) {
	console.log(`selected ${value}`);
}
const paymentStore = rootStores[PaymentStore];
@observer
class PaymentModalPage extends Component {
	showModal = () => {
		paymentStore.toggleViewModal();
	};

	handleOk = (e) => {
		console.log('okokokoko', e);
		paymentStore.toggleViewModal();
	};

	handleCancel = (e) => {
		console.log(e);
		paymentStore.toggleViewModal();
	};

	handleSubmit = (e) => {};
	render() {
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

		const creditCardNumber = isFieldTouched('creditCardNumber') && getFieldError('creditCardNumber');
		const validDate = isFieldTouched('validDate') && getFieldError('validDate');

		return (
			<div>
				<Modal
					style={{ width: '300px', height: '510px', borderRadius: '50px' }}
					title="Payment Details"
					visible={paymentStore.viewModal}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<Form
						style={{ display: 'flex', flexDirection: 'column' }}
						layout="inline"
						onSubmit={this.handleSubmit}
					>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<span style={{ marginRight: '7px' }}>CreditCardNumber : </span>
							<Form.Item>
								<Input
									style={{ width: '300px' }}
									min="10"
									max="100"
									prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />}
								/>
							</Form.Item>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
							<span style={{ marginRight: '48px' }}>Card validity :</span>
							<Form.Item>
								<Select
									showSearch
									style={{ width: 100, marginRight: '10px' }}
									placeholder="01"
									onChange={handleMonthChange}
									onFocus={onFocus}
									onBlur={onBlur}
									onSearch={onSearch}
								>
									<Option value="02">02</Option>
									<Option value="03">03</Option>
									<Option value="04">04</Option>
									<Option value="05">05</Option>
									<Option value="06">06</Option>
									<Option value="07">07</Option>
									<Option value="08">08</Option>
									<Option value="09">09</Option>
									<Option value="j10">10</Option>
									<Option value="11">11</Option>
									<Option value="12">12</Option>
								</Select>
								<Select
									showSearch
									style={{ width: 100 }}
									placeholder="2019"
									onChange={handleMonthChange}
									onFocus={onFocus}
									onBlur={onBlur}
									onSearch={onSearch}
								>
									<Option value="2020">2020</Option>
									<Option value="2021">2021</Option>
									<Option value="2022">2022</Option>
									<Option value="2023">2023</Option>
									<Option value="2024">2024</Option>
								</Select>
							</Form.Item>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
							<span style={{ marginRight: '97px' }}>CVV : </span>
							<Form.Item>
								<Input
									style={{ width: '100px' }}
									min="10"
									max="100"
									prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />}
								/>
							</Form.Item>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
							<span style={{ marginRight: '109px' }}>ID : </span>
							<Form.Item>
								<Input
									style={{ width: '200px' }}
									min="10"
									max="100"
									prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
								/>
							</Form.Item>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
							<span style={{ marginRight: '60px' }}>Full Name : </span>
							<Form.Item>
								<Input
									style={{ width: '200px' }}
									min="10"
									max="100"
									prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
								/>
							</Form.Item>
						</div>
					</Form>
				</Modal>
			</div>
		);
	}
}

const PaymentModalPageForm = Form.create({ name: 'paymentModalForm' })(PaymentModalPage);
export default PaymentModalPageForm;
