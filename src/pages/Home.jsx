<<<<<<< HEAD
import { Component } from "react";
import CategoryList from "../components/CategoryList";
import NavbarComponent from "../components/NavbarComponent";
import ProductList from "../components/ProductList";
import { render } from "react-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";
import CartList from "../components/CartList";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            categoryItem: 'Makanan',
            keranjangs: [],
            del: [],
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
            </>
        );

    }

}
=======
import React, { useState, useEffect } from 'react';
import CategoryList from "../components/CategoryList";
import NavbarComponent from "../components/NavbarComponent";
import ProductList from "../components/ProductList";
import CartList from "../components/CartList";
import axios from "axios";
import { API_URL } from "../utils/constants";

function Home() {
  const [menus, setMenus] = useState([]);
  const [categoryItem, setCategoryItem] = useState('Makanan');
  const [keranjangs, setKeranjangs] = useState([]);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedMenus = await axios.get(API_URL + "products?category.nama=" + categoryItem);
        const fetchedKeranjangs = await axios.get(API_URL + "keranjangs");  
        setMenus(fetchedMenus.data);
        setKeranjangs(fetchedKeranjangs.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [categoryItem]);

  const changeCategory = async (value) => {
    setCategoryItem(value);
    // Fetch data for the new category
  };

  const addCart = async (value) => {
    try {
        const response = await axios.post(API_URL + "keranjangs", value); // Assuming a POST request
        const updatedKeranjangs = response.data; // Get updated data from response
        setKeranjangs(updatedKeranjangs);
    } catch (error) {
      console.log("Error yaa ", error);
    }
  };

  return (
    
    <>
      <div className="grid grid-col-3 md:grid-cols-9 gap-3">
        <div className="col-span-1 md:col-span-2 mb-4">
          <CategoryList changeCategory={changeCategory} categoryItem={categoryItem} />
        </div>
        <div className="col-span-1 md:col-span-5 mb-4">
          <ProductList menus={menus} addCart={addCart} />
        </div>
        <div className="col-span-1 md:col-span-2 mb-4">
          <CartList keranjangs={keranjangs} />
        </div>
      </div>
    </>
  );
}

export default Home;
>>>>>>> b8e6bb1f56836111bbf8fb8c0da64e434f358ab9
