"use client";
import { useState, useEffect } from "react";
import styles from "./style.module.scss";
import ProductCard from "@/components/product-card";
import SearchBar from "@/components/search";
import { Iproduct } from "@/types/@types.products";

type Props = {
  products: Iproduct[];
};
const ProductsInfo: React.FC<Props> = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <ul className={styles.productList}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
};

export default ProductsInfo;
