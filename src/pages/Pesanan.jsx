import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";

const Pesanan = () => {
    const [pesanan, setPesanan] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPesanan();
    }, []);

    const fetchPesanan = async () => {
        try {
            const response = await axios.get(`${API_URL}pesanans`);
            
            // Urutkan pesanan: "Belum Diantar" dulu, baru "Sudah Diantar"
            const sortedPesanan = response.data.sort((a, b) => (a.status === "Belum Diantar" ? -1 : 1));
            
            setPesanan(sortedPesanan);
            setLoading(false);
        } catch (error) {
            console.error("Gagal mengambil data pesanan:", error);
            setLoading(false);
        }
    };

    const updateStatusPesanan = async (id, statusBaru) => {
        try {
            await axios.patch(`${API_URL}pesanans/${id}`, { status: statusBaru });

            // Perbarui status pada state tanpa mengubah item
            setPesanan((prevPesanan) => {
                const updatedPesanan = prevPesanan.map((order) =>
                    order.id === id ? { ...order, status: statusBaru } : order
                );

                // Urutkan ulang setelah update status
                return updatedPesanan.sort((a, b) => (a.status === "Belum Diantar" ? -1 : 1));
            });
        } catch (error) {
            console.error("Gagal memperbarui status pesanan:", error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Daftar Pesanan</h2>

            {loading ? (
                <p className="text-gray-600">Memuat data...</p>
            ) : pesanan.length === 0 ? (
                <p className="text-gray-600">Tidak ada pesanan.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="py-2 px-4">ID Pesanan</th>
                                <th className="py-2 px-4">Nama Pesanan</th>
                                <th className="py-2 px-4">Total Harga</th>
                                <th className="py-2 px-4">Status</th>
                                <th className="py-2 px-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pesanan.map((order) => (
                                <tr key={order.id} className="border-b hover:bg-gray-100">
                                    <td className="py-2 px-4">{order.id}</td>
                                    <td className="py-2 px-4">
                                        <ul className="list-disc pl-5">
                                            {order.items.map((item) => (
                                                <li key={item.id}>
                                                    {item.product.nama} ({item.jumlah}x)
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="py-2 px-4 font-bold">Rp {order.total_harga.toLocaleString()}</td>
                                    <td className="py-2 px-4">
                                        <span
                                            className={`px-2 py-1 rounded-md text-white text-sm ${
                                                order.status === "Sudah Diantar" ? "bg-green-500" : "bg-red-500"
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        {order.status === "Belum Diantar" && (
                                            <button
                                                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                                                onClick={() => updateStatusPesanan(order.id, "Sudah Diantar")}
                                            >
                                                Tandai Sudah Diantar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Pesanan;
