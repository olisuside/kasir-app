import React, { useState, useEffect } from 'react';
import { List, ListItem, Card } from "@material-tailwind/react";
import axios from "axios";
import { API_URL } from "../utils/constants";

function CategoryList({ changeCategory, categoryItem }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_URL + "categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Card className="text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
      <h1 className="text-2xl px-4 font-bold text-black my-4">Kategori</h1>
      <hr />
      <List>
        {categories.map((category) => (
          <ListItem
            key={category.id}
            onClick={() => changeCategory(category.nama)}
          >
            {category.nama}
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

export default CategoryList;
