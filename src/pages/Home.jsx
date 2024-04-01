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
