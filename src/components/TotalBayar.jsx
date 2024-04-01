import React, { useState } from 'react';
import { Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

function TotalBayar({ keranjangs }) {
  const [totalBayar, setTotalBayar] = useState(
    keranjangs.reduce((result, item) => result + item.total_harga, 0)
  );
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const pesanan = {
        total_bayar: totalBayar,
        menus: keranjangs,
      };

      await axios.post(API_URL + "pesanans", pesanan);
      navigate("/sukses");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="absolute bottom-0 w-full px-2 py-2 grid justify-items-center">
      <Typography variant="h6" className="px-6">
        Total Harga: Rp. {totalBayar}
      </Typography>
      <Button fullWidth variant="filled" className="bg-indigo-500" onClick={handleCheckout}>
        Button
      </Button>
    </div>
  );
}

export default TotalBayar;
