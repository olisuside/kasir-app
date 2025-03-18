import { Component } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default class Sukses extends Component {
    render() {
        return (
            <>
            <div className="flex justify-center">
            <Card className="w-96 ">
                <CardHeader floated={false} shadow={false}>
                    <img src="./src/assets/images/sukses.svg"  />
                </CardHeader>
                <CardBody className="text-center">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        Transaksi Berhasil
                    </Typography>
                    
                </CardBody>
                <CardFooter className="flex justify-center gap-7 pt-2">
                    <Link to={"/"}>
                    <Button variant="text" size="md" color="blue">Kembali Ke Home</Button>
                    </Link>
                    <Link to={"/pesanan"}>
                    <Button variant="text" size="md" color="blue">Lihat Pesanan</Button>
                    </Link>
                </CardFooter>
            </Card>
            </div>
            </>
        );
    }
}