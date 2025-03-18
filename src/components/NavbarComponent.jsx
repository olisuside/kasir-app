import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function NavList() {
    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
                <Link to="/" className="flex items-center hover:text-blue-500 transition-colors">
                    Home
                </Link>
            </Typography>
            <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
                <Link to="/pesanan" className="flex items-center hover:text-blue-500 transition-colors">
                    Pesanan
                </Link>
            </Typography>
            
        </ul>
    );
}

export const NavbarComponent = () => {
    const [openNav, setOpenNav] = useState(false);

    const handleWindowResize = () => {
        if (window.innerWidth >= 960) setOpenNav(false);
    };

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return (
        <Navbar className="mx-auto max-w-screen-2xl px-6 py-3 bg-white shadow-md rounded-lg my-4">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography as={Link} to="/" variant="h5" className="mr-4 cursor-pointer py-1.5">
                    Kasir App
                </Typography>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? <XMarkIcon className="h-6 w-6" strokeWidth={2} /> : <Bars3Icon className="h-6 w-6" strokeWidth={2} />}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
            </Collapse>
        </Navbar>
    );
};

export default NavbarComponent;
