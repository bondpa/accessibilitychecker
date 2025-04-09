import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

function Home() {
    const products = [
        {
            id: 1,
            name: "Nike Air Max 500",
            brand: "Nike",
            price: 899,
            originalPrice: 999,
            discount: 10,
            features: ["Premium Material", "Cushioned Sole", "Breathable"],
            isInStock: true,
            hasQuickDelivery: true,
            imageUrl:
                "https://dressmann.imgix.net/globalassets/productimages/72134817213482_900_f_m_mh_185_ms_m_t-shirt_solid_v-n___dressmann_4908.jpg",
        },
        {
            id: 2,
            name: "Nike Air Force 1",
            brand: "Nike",
            price: 1199,
            originalPrice: 1399,
            discount: 10,
            features: ["Classic Design", "Leather Upper", "Iconic Style"],
            isInStock: true,
            hasQuickDelivery: true,
            imageUrl:
                "https://dressmann.imgix.net/globalassets/productimages/72134817213482_900_f_m_mh_185_ms_m_t-shirt_solid_v-n___dressmann_4908.jpg",
        },
        {
            id: 3,
            name: "Nike Zoom Pegasus",
            brand: "Nike",
            price: 1299,
            originalPrice: 1499,
            discount: null,
            features: ["Responsive Cushioning", "Engineered Mesh", "Dynamic Fit"],
            isInStock: true,
            hasQuickDelivery: true,
            imageUrl:
                "https://dressmann.imgix.net/globalassets/productimages/72134817213482_900_f_m_mh_185_ms_m_t-shirt_solid_v-n___dressmann_4908.jpg",
        },
        {
            id: 4,
            name: "Nike React Vision",
            brand: "Nike",
            price: 1099,
            originalPrice: 1299,
            discount: 10,
            features: ["React Foam", "Modern Design", "All-Day Comfort"],
            isInStock: true,
            hasQuickDelivery: true,
            imageUrl:
                "https://dressmann.imgix.net/globalassets/productimages/72134817213482_900_f_m_mh_185_ms_m_t-shirt_solid_v-n___dressmann_4908.jpg",
        },
        {
            id: 5,
            name: "Nike Air Max 270",
            brand: "Nike",
            price: 1399,
            originalPrice: 1599,
            discount: 10,
            features: ["Air Unit", "Knit Upper", "Lightweight"],
            isInStock: true,
            hasQuickDelivery: true,
            imageUrl:
                "https://dressmann.imgix.net/globalassets/productimages/72134817213482_900_f_m_mh_185_ms_m_t-shirt_solid_v-n___dressmann_4908.jpg",
        },
        {
            id: 6,
            name: "Nike Air Zoom",
            brand: "Nike",
            price: 1199,
            originalPrice: 1399,
            discount: null,
            features: ["Zoom Air", "Durable Design", "Responsive"],
            isInStock: true,
            hasQuickDelivery: true,
            imageUrl:
                "https://dressmann.imgix.net/globalassets/productimages/72134817213482_900_f_m_mh_185_ms_m_t-shirt_solid_v-n___dressmann_4908.jpg",
        },
        {
            id: 7,
            name: "Nike Free Run",
            brand: "Nike",
            price: 999,
            originalPrice: 1199,
            discount: 10,
            features: ["Flexible Sole", "Minimalist Design", "Natural Motion"],
            isInStock: true,
            hasQuickDelivery: false,
            imageUrl:
                "https://dressmann.imgix.net/globalassets/productimages/72134817213482_900_f_m_mh_185_ms_m_t-shirt_solid_v-n___dressmann_4908.jpg",
        },
        {
            id: 8,
            name: "Nike Metcon",
            brand: "Nike",
            price: 1299,
            originalPrice: 1499,
            discount: 10,
            features: ["Stable Base", "Durable Construction", "Versatile"],
            isInStock: true,
            hasQuickDelivery: false,
            imageUrl:
                "https://dressmann.imgix.net/globalassets/productimages/72134817213482_900_f_m_mh_185_ms_m_t-shirt_solid_v-n___dressmann_4908.jpg",
        },
        {
            id: 9,
            name: "Nike Revolution",
            brand: "Nike",
            price: 899,
            originalPrice: 999,
            discount: 10,
            features: ["Lightweight", "Breathable Mesh", "Foam Cushioning"],
            isInStock: true,
            hasQuickDelivery: true,
            imageUrl:
                "https://dressmann.imgix.net/globalassets/productimages/72134817213482_900_f_m_mh_185_ms_m_t-shirt_solid_v-n___dressmann_4908.jpg",
        },
    ];

    const [cart, setCart] = useState([]);

    function addToCart(product) {
        setCart([...cart, product]);
    }

    return (
        <div className="container mx-auto">
            <div className="flex flex-col h-screen">
                <div className="border-b border-gray-300">
                    <header className="container relative flex items-center h-20 mx-auto">
                        <img
                            src="https://www.utvecklarakademin.se/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fshort_logo_transparent.0790d1fb.png&w=96&q=75"
                            alt=""
                            className="h-14"
                        />
                        <div className="flex items-center ml-auto">
                            <ul className="flex justify-around w-50">
                                <a className="hover:underline hover:text-gray-500" href="/">
                                    <li>Home</li>
                                </a>
                                <a
                                    className="hover:underline hover:text-gray-500"
                                    href="/contact"
                                >
                                    <li>Contact</li>
                                </a>
                                <a
                                    className="hover:underline hover:text-gray-500"
                                    href="/about"
                                >
                                    <li>About</li>
                                </a>
                            </ul>
                            <button className="ml-4 flex items-center justify-center px-5 py-1.5 font-medium text-white bg-linear-to-r/srgb from-indigo-500 to-indigo-300 rounded-lg">
                                Login
                            </button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="md:hidden"
                            >
                                <path
                                    d="M3 6h18M3 12h18M3 18h18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    fill="none"
                                />
                            </svg>
                        </div>
                    </header>
                </div>
                <section className="flex-1">
                    <div className="absolute right-0 p-4 bg-white border border-gray-300 shadow-lg top-20 w-60 min-h-40">
                        Cart
                        {cart.map((item) => {
                            return <p>{item.name}</p>;
                        })}
                    </div>
                    <div className="container mx-auto">
                        <h1 className="mt-10 text-6xl font-bold">UA Products</h1>
                        <hr className="my-10 text-gray-300" />
                        <div className="grid grid-cols-1 gap-10 px-4 my-20 md:px-2 md:grid-cols-3 lg:grid-cols-4">
                            {products.map((product) => {
                                return (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        setCart={addToCart}
                                    ></ProductCard>
                                );
                            })}
                        </div>
                    </div>
                </section>
                <footer className="bg-white border-t border-gray-300 h-[300px] flex items-center">
                    <div className="grid w-full grid-cols-4 px-10 place-items-center">
                        <ul>
                            <li>Hem</li>
                            <li>Contact</li>
                            <li>About</li>
                            <li>Login</li>
                        </ul>
                        <ul>
                            <li>Hem</li>
                            <li>Contact</li>
                            <li>About</li>
                            <li>Login</li>
                        </ul>
                        <ul>
                            <li>Hem</li>
                            <li>Contact</li>
                            <li>About</li>
                            <li>Login</li>
                        </ul>
                        <ul>
                            <li>Hem</li>
                            <li>Contact</li>
                            <li>About</li>
                            <li>Login</li>
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Home;
