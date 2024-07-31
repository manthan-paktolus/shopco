import ProductDetail from "@/components/product-detail";
import connectToDatabase from "@/lib/db";
import Product from "../../../models/Products";
import { Metadata } from "next";
import { getProductDetails } from "@/lib/products";

interface Iparams {
  // id?: string;
  params: { id: string };
}

// export async function generateMetadata({
//   params,
// }: {
//   params: Iparams;
// }): Promise<Metadata> {
//   const product = await getSelectedProduct(params);

//   if (!product) {
//     return {
//       title: "Product not found",
//       description: "The product you are looking for does not exist.",
//     };
//   }

//   return {
//     title: `${product.title} - Product Details`,
//     description: `Details and features of ${product.title}`,
//   };
// }

// async function getSelectedProduct(params: Iparams) {
//   const { id } = params;

//   const numericId = Number(id);
//   console.log("iddddddd ", numericId);
//   try {
//     await connectToDatabase();

//     const product = await Product.findOne({ id: numericId }).lean();
//     return JSON.parse(JSON.stringify(product));
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return null;
//   }
// }

export default async function ProductDetailsPage({ params }: Iparams) {
  console.log("params value ", params);
  const productId = params.id;

  const { result } = await getProductDetails(productId);

  if (!result) {
    return <div>Product not found</div>;
  }
  return <ProductDetail product={result} />;
}
