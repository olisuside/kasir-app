import { Card, CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button, } from "@material-tailwind/react";
 
export const ProductList = ({menu, addCart}) => {
  return (
    <>     
    <Card className="w-auto">
      <CardHeader shadow={false} floated={false} className="h-36">
        <img
          src={"./src/assets/images/"+ menu.category.nama.toLowerCase() +"/" +menu.gambar}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
      <Typography variant="h5" color="blue-gray" className="mb-2">
          {menu.nama}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          Rp.{menu.harga}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 ">
        <Button 
          ripple={true}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        onClick={() => addCart(menu)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
    </>
  );
}

export default ProductList;