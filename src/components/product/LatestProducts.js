import React, { Component } from "react";
import rootStores from "../../stores";
import { observable } from "mobx";
import ProductStore from "../../stores/ProductStore";
import { observer } from "mobx-react";
import { Col } from "antd";
import Product from "../Store/Product";

const productStore = rootStores[ProductStore];
@observer
class LatestProducts extends Component {
  componentDidMount() {
    productStore.getLatestProduct();
  }
  renderAllProducts = () => {
    const latestProducts = productStore.getLatestProducts;
    return latestProducts.map((product, index) => (
      <Col span={8} style={{ marginBottom: 20 }}>
        <Product
          starts={productStore.getAvargeScoreByProduct(product)}
          history={this.props.history}
          product={product}
          key={index}
        />
      </Col>
    ));
  };
  render() {
    return (
      <div style={{ background: "black" }}>{this.renderAllProducts()}</div>
    );
  }
}

export default LatestProducts;
