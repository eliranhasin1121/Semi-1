import axios from "axios";
import { toJS } from "mobx";
class ProductService {
  addProductToUser = (username, product, periods) => {
    console.log(`add new product to the user ${username}`, product);
    const url = `/api/add-product-as-renter/${username}`;
    const body = {
      username,
      name: product.title,
      category: product.category,
      price: product.retailPrice,
      images: toJS(product.images),
      description: product.description,
      retail_price: product.retailPrice,
      sub_category: product.sub_category,
      quality: product.quality,
      plans: periods
    };
    console.log("body", body);


     addProductToUser = (username, product,periods)=> {
        console.log(`add new product to the user ${username}`, product);
        const url = `/api/add-product-as-renter/${username}`;
        const body = {
            username,
            name:product.title,
            category:product.category,
            price:product.retailPrice,
            description:product.description,
            retail_price:product.retailPrice,
            sub_category:product.sub_category,
            quality:product.quality,
            plans:periods

        }
        console.log('body', body);

  getProductById = async productId => {
    try {
      const product = await axios.get(`/api/products?id=${productId}`);
      if (!product || !product.data || !product.data.data) {
        return false;
      } else {
        console.log("product", product.data.data);

        return product.data.data[0];
      }
    } catch (err) {
      console.log("the request getProduct By Id faild.", err);
    }
  };

  onProductSearch = async searchParams => {
    const seacrhItems = await axios.get(
      `/api/products/search?categoryName=${
        searchParams.categoryName
      }&&productName=${searchParams.productName}&&minPrice=${
        searchParams.minPrice
      }&&maxPrice=${searchParams.maxPrice}&&userName=${
        searchParams.userName
      }&&quality=${searchParams.quality}`
    );
    console.log({ seacrhItems });
  };

  getLatestProduct = async limit => {
    const latest = limit ? limit : 10;
    const results = await axios.get(`/api/products/latest/${latest}`);
    if (!results || !results.data) {
      return [];
    } else return results.data;
  };

  getProductsByUserName = async userName => {
    const result = await axios.get(`/api/products/${userName}`);
    console.log({ result });
  };
}

const productService = new ProductService();
export default productService;