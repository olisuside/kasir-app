import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CategoryList from "../components/CategoryList";
import NavbarComponent from "../components/NavbarComponent";
import ProductList from "../components/ProductList";
import CartList from "../components/CartList";
import { API_URL } from "../utils/constants";

function Home() {
  const [menus, setMenus] = useState([]);
  const [categoryItem, setCategoryItem] = useState("Makanan");
  const [keranjangs, setKeranjangs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedMenus = await axios.get(`${API_URL}products?category.nama=${categoryItem}`);
        const fetchedKeranjangs = await axios.get(`${API_URL}keranjangs`);
        setMenus(fetchedMenus.data);
        setKeranjangs(fetchedKeranjangs.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [categoryItem]);

  const changeCategory = useCallback((value) => {
    setCategoryItem(value);
  }, []);

  const addCart = useCallback(async (menu) => {
    try {
      const existingItem = keranjangs.find((item) => item.product.id === menu.id);

      if (existingItem) {
        const updatedItem = { ...existingItem, jumlah: existingItem.jumlah + 1, total_harga: existingItem.total_harga + menu.harga };
        await axios.put(`${API_URL}keranjangs/${existingItem.id}`, updatedItem);
      } else {
        const newItem = { product: menu, jumlah: 1, total_harga: menu.harga };
        await axios.post(`${API_URL}keranjangs`, newItem);
      }

      const updatedKeranjangs = await axios.get(`${API_URL}keranjangs`);
      setKeranjangs(updatedKeranjangs.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }, [keranjangs]);

  return (
    <>
      
      <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
        <div className="col-span-1 md:col-span-2 mb-4">
          <CategoryList changeCategory={changeCategory} categoryItem={categoryItem} />
        </div>
        <div className="col-span-1 md:col-span-5 mb-4">
          <ProductList menus={menus} addCart={addCart} />
        </div>
        <div className="col-span-1 md:col-span-2 mb-4">
        <CartList keranjangs={keranjangs} setKeranjangs={setKeranjangs} />

        </div>
      </div>
    </>
  );
}

export default Home;
