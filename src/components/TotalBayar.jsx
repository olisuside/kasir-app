import { Typography } from "@material-tailwind/react";
import { Component } from "react";

export default class TotalBayar extends Component {
    render() {
        const totalBayar = this.props.keranjangs.reduce(
            function (result, item) {
                return result + item.total_harga;
            }, 0
        )
        return (
            <div className="absolute bottom-0">
                <Typography variant="h6" className="px-6 py-2">Total Harga : Rp. {totalBayar}</Typography>
                </div>
        );
    }
}