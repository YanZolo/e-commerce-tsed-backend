import bcrypt from "bcryptjs";

type User = {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

type Product = {
  _id?: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  images: string[];
  price: number;
  countInStock: number;
  brand: string;
  rating: number;
  numReviews: number;
  reviews?: any;
  description: string;
  dateCreation: number;
};

interface Data {
  users: User[];
  products: Product[];
}
const data: Data = {
  users: [
    {
      username: "sofiane",
      email: "admin@example.com",
      password: bcrypt.hashSync("1234"),
      isAdmin: true
    },
    {
      username: "john",
      email: "user@example.com",
      password: bcrypt.hashSync("1234"),
      isAdmin: false
    }
  ],
  products: [
    {
      name: "Nike Slim Shirt",
      slug: "nike-slim-shirt",
      category: "Shirts",
      image: "/images/nike/shirts/p1.jpg",
      images: [
        "/images/nike/shirts/p1.jpg",
        "/images/nike/shirts/p1-2.jpg",
        "/images/nike/shirts/p1-3.jpg",
        "/images/nike/shirts/p1-4.jpg",
        "/images/nike/shirts/p1-5.jpg"
      ],
      price: 88,
      countInStock: 0,
      brand: "Nike",
      rating: 5,
      numReviews: 10,
      description: "high quality product",
      dateCreation: Date.now()
    },
    {
      name: "Adidas Fit Shirt",
      slug: "adidas-fit-shirt",
      category: "Shirts",
      image: "/images/adidas/shirts/p2.jpg",
      images: [
        "/images/adidas/shirts/p2.jpg",
        "/images/adidas/shirts/p2-2.jpg",
        "/images/adidas/shirts/p2-3.jpg",
        "/images/adidas/shirts/p2-4.jpg",
        "/images/adidas/shirts/p2-5.jpg"
      ],
      price: 75,
      countInStock: 5,
      brand: "Adidas",
      rating: 3.5,
      numReviews: 10,
      description: "high quality product",
      dateCreation: Date.now()
    },
    {
      name: "Nike Slim Pant",
      slug: "nike-slim-pant",
      category: "Pants",
      image: "/images/nike/pants/p3.jpg",
      images: [
        "/images/nike/pants/p3.jpg",
        "/images/nike/pants/p3-2.jpg",
        "/images/nike/pants/p3-3.jpg",
        "/images/nike/pants/p3-4.jpg",
        "/images/nike/pants/p3-5.jpg"
      ],
      price: 85,
      countInStock: 20,
      brand: "Nike",
      rating: 4.6,
      numReviews: 18,
      description: "high quality product",
      dateCreation: Date.now()
    },
    {
      name: "Adidas Fit Pant",
      slug: "adidas-fit-pant",
      category: "Pants",
      image: "/images/adidas/pants/p4.jpg",
      images: [
        "/images/adidas/pants/p4.jpg",
        "/images/adidas/pants/p4-2.jpg",
        "/images/adidas/pants/p4-3.jpg",
        "/images/adidas/pants/p4-4.jpg"
      ],
      price: 110,
      countInStock: 10,
      brand: "Nike",
      rating: 4.2,
      numReviews: 15,
      description: "high quality product",
      dateCreation: Date.now()
    }
  ]
};

export default data;
