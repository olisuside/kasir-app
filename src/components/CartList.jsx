import React from "react";
import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Typography,
  Chip,
  ListItemPrefix,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

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

function CartList({ keranjangs, setKeranjangs }) {
  const navigate = useNavigate();

  const delCart = async (item) => {
    try {
      await axios.delete(`${API_URL}keranjangs/${item.id}`);
      setKeranjangs(keranjangs.filter((k) => k.id !== item.id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleBayar = async () => {
    try {
      if (keranjangs.length === 0) return;

      // Kirim data ke API pesanan
      await axios.post("http://localhost:3000/pesanans", {
        items: keranjangs,
        total_harga: keranjangs.reduce((acc, item) => acc + (item.total_harga || 0), 0),
      });

      // Hapus semua item dari server
      await Promise.all(
        keranjangs.map((item) => axios.delete(`${API_URL}keranjangs/${item.id}`))
      );

      // Kosongkan state keranjangs
      setKeranjangs([]);

      // Arahkan ke halaman sukses
      navigate("/sukses");
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const totalHarga = keranjangs.reduce((acc, item) => acc + (item.total_harga || 0), 0);

  return (
    <Card className="h-[80vh] p-4 relative">
      <Typography variant="h4" className="mb-2">Keranjang</Typography>
      <hr />
      <div className="overflow-auto scrollbar-thin scrollbar-webkit mb-20">
        {keranjangs.length > 0 ? (
          <List>
            {keranjangs.map((item) => (
              <ListItem key={item.id} ripple={false} className="py-1 pr-1 pl-4">
                <ListItemPrefix>
                  <Chip value={item.jumlah} variant="ghost" size="md" className="rounded-full" />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {item.product ? item.product.nama : "Produk tidak tersedia"}
                  </Typography>
                  <Typography variant="small" color="gray" className="font-normal">
                    Rp. {(item.total_harga || 0).toLocaleString("id-ID")}
                  </Typography>
                </div>
                <ListItemSuffix>
                  <IconButton variant="text" color="blue-gray" onClick={() => delCart(item)}>
                    <TrashIcon />
                  </IconButton>
                </ListItemSuffix>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="small" className="text-center mt-4 text-gray-500">Keranjang kosong</Typography>
        )}
      </div>
      <div className="absolute bottom-4 left-0 w-full px-6">
        <Typography variant="h6">Total Harga: Rp. {totalHarga.toLocaleString("id-ID")}</Typography>
        <Button color="blue" className="mt-2 w-full" onClick={handleBayar} disabled={keranjangs.length === 0}>
          Bayar
        </Button>
      </div>
    </Card>
  );
}

export default CartList;
