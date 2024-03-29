import { Button, Typography } from "@material-tailwind/react";
import { Component } from "react";

export default class TotalBayar extends Component {
    render() {
        const totalBayar = this.props.keranjangs.reduce(
            function (result, item) {
                return result + item.total_harga;
            }, 0
        )
        return (
            <div className="absolute bottom-0 w-full px-2 py-2 grid justify-items-center">
                <Typography variant="h6" className="px-6">Total Harga : Rp. {totalBayar}</Typography>
                <Button fullWidth variant="filled" className="bg-indigo-500"> Button</Button>
                </div>
        );
    }
}