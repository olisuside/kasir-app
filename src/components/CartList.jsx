import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemSuffix,
    Card,
    IconButton,
    Typography,
    Chip,
    ListItemPrefix,
    CardFooter,
} from "@material-tailwind/react";
<<<<<<< HEAD
import { Component } from "react";
import axios from "axios";
=======
import axios from 'axios';
>>>>>>> b8e6bb1f56836111bbf8fb8c0da64e434f358ab9
import { API_URL } from "../utils/constants";
import TotalBayar from "./TotalBayar";

function TrashIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
        >
            <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function CartList({ keranjangs }) {
    const [keranjangsState, setKeranjangsState] = useState(keranjangs);

<<<<<<< HEAD
    delCart = (value) => {
        axios.delete(API_URL + "keranjangs/" + value.id)
            .then((res) => {
                console.log("Item deleted successfully");
            })
            .catch((error) => {
                console.log("Error deleting item:", error);
            });
    }
    render() {
        const { keranjangs, } = this.props;

        const totalHarga = keranjangs.reduce((acc, item) => acc + item.total_harga, 0);

        return (
            <Card className="h-[80vh]">
                <Typography variant="h4" className="px-6 py-2">Keranjang</Typography>
                <hr />
                <div className="overflow-auto scrollbar-thin scrollbar-webkit mb-28">
                    {keranjangs.length !== 0 && (
                        <List>
                            {keranjangs.map((keranjang) => (
                                <ListItem key={keranjang.id} ripple={false} className="py-1 pr-1 pl-4">
                                    <ListItemPrefix>
                                        <Chip
                                            value={keranjang.jumlah}
                                            variant="ghost"
                                            size="md"
                                            className="rounded-full"
                                        />
                                    </ListItemPrefix>
                                    <div>
                                        <Typography variant="h6" color="blue-gray">
                                            {keranjang.product ? keranjang.product.nama : "Produk tidak tersedia"}
                                        </Typography>
                                        <Typography variant="small" color="gray" className="font-normal">
                                            Rp. {keranjang.total_harga}
                                        </Typography>
                                    </div>
                                    <ListItemSuffix>
                                        <IconButton
                                            variant="text"
                                            color="blue-gray"
                                            onClick={() => this.delCart(keranjang)}
                                        >
                                            <TrashIcon />
                                        </IconButton>
                                    </ListItemSuffix>
                                </ListItem>
                            ))}


                        </List>
                    )
                    }
                </div>
                <div className="absolute bottom-0">
                    <Typography variant="h6" className="px-6 py-2">Total Harga : Rp. {totalHarga.toLocaleString("id-ID")}</Typography>

                </div>
            </Card>
        );
    }
}
=======
  console.log("Received keranjangs:", keranjangsState);
    const delCart = async (keranjang) => {
        try {
            await axios.delete(API_URL + "keranjangs/" + keranjang.id);
            setKeranjangsState((prevKeranjangs) => prevKeranjangs.filter((item) => item.id !== keranjang.id));
            console.log("Item deleted successfully");
        } catch (error) {
            console.log("Error deleting item:", error);
        }
    };

    return (
        <Card className="h-[80vh]">
      <Typography variant="h4" className="px-6 py-2">Keranjang</Typography>
      <hr />
      <div className="overflow-auto scrollbar-thin scrollbar-webkit mb-20">
        {keranjangsState.length !== 0 && (
          <List>
            {keranjangsState.map((keranjang) => (
              <ListItem ripple={false} className="py-1 pr-1 pl-4" key={keranjang.id}>
                <ListItemPrefix>
                  <Chip
                    value={keranjang.jumlah}
                    variant="ghost"
                    size="md"
                    className="rounded-full"
                  />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {keranjang.product.nama}
                  </Typography>
                  <Typography variant="small" color="gray" className="font-normal">
                    Rp. {keranjang.total_harga}
                  </Typography>
                </div>
                <ListItemSuffix>
                  <IconButton variant="text" color="blue-gray" onClick={() => delCart(keranjang)}>
                    <TrashIcon />
                  </IconButton>
                </ListItemSuffix>
              </ListItem>
            ))}
          </List>
        )}
        {keranjangsState.length === 0 && (
            <List>
                <ListItem ripple={false} className="py-1 pr-1 pl-4" >
                <Typography variant="h6" color="blue-gray">KOSONG </Typography>
                </ListItem>
            </List>
                )
            } {/* Added loading state */}
      </div>
      <TotalBayar keranjangs={keranjangsState} />
    </Card>
    );
}

export default CartList;
>>>>>>> b8e6bb1f56836111bbf8fb8c0da64e434f358ab9
