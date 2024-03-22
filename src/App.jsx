import { Component } from "react";
import CategoryList from "./components/CategoryList";
import NavbarComponent from "./components/NavbarComponent";
import ProductList from "./components/ProductList";
import { render } from "react-dom";
import axios from "axios";
import { API_URL } from "./utils/constants";
import { Card } from "@material-tailwind/react";
import CartList from "./components/CartList";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      categoryItem: 'Makanan',
      keranjangs: [],
      del : [],
    }
  };

  componentDidMount() {
    axios.get(API_URL + "products?category.nama=" + this.state.categoryItem)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log(error);
      });

    axios.get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidUpdate(prevState) {
    if (this.state.keranjangs !== prevState.keranjangs) {
      axios.get(API_URL + "keranjangs")
        .then((res) => {
          const keranjangs = res.data;
          this.setState({ keranjangs });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  changeCategory = (value) => {
    this.setState(
      {
        categoryItem: value,
        menus: [],

      }
    )
    axios.get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log(error);
      });
  };

  addCart = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              console.log(res)
            })
            .catch((error) => {
              console.log("Error yaa ", error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              console.log(res)
            })
            .catch((error) => {
              console.log("Error yaa ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });

  }

  
render() {
  const { menus, categoryItem, keranjangs, } = this.state
  return (
    <>
      <div className="container mx-auto max-w-screen-2xl">
        <NavbarComponent />
        <div className="grid grid-col-3 md:grid-cols-9 gap-3">
          <div className="col-span-1 md:col-span-2 mb-4">
            <CategoryList changeCategory={this.changeCategory} categoryItem={categoryItem} />
          </div>
          <div className="col-span-1 md:col-span-5 mb-4">
            <ProductList menus={menus} addCart={this.addCart} />
          </div>
          <div className="col-span-1 md:col-span-2 mb-4">
            <CartList keranjangs={keranjangs} />
          </div>
        </div>
      </div>
    </>
  );

}

}