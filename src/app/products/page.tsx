import ProductsInfo from "@/components/product-info";
import connectToDatabase from "@/lib/db";
import Product from "../../models/Products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description: "All grocery items and beauty products",
};

async function getAllProducts() {
  try {
    await connectToDatabase();
    const products = await Product.find();

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

export default async function ProductsPage() {
  const allProducts = await getAllProducts();

  if (!allProducts || allProducts.length === 0) {
    return <h1>No Product Found</h1>;
  }

  return (
    <>
      <ProductsInfo products={allProducts} />
    </>
  );
}
