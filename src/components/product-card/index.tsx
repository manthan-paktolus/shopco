"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import styles from "./styles.module.scss";
import { Iproduct } from "@/types/@types.products";

interface Props {
  product: Iproduct;
}

function ProductCard({ product }: Props) {
  const [imgIndex, setImgIndex] = useState(0);
  const handleMouseEnter = () => setImgIndex(1);
  const handleMouseLeave = () => setImgIndex(0);

  const hasMultipleImages = product.images.length > 1;

  return (
    <div className={styles.productItem}>
      <Link href={`/products/${product._id}`}>
        <Card className={styles.card}>
          <CardHeader>
            <Image
              src={product.images[imgIndex]}
              alt={product.title}
              width={300}
              height={300}
              onMouseEnter={hasMultipleImages ? handleMouseEnter : undefined}
              onMouseLeave={hasMultipleImages ? handleMouseLeave : undefined}
            />
          </CardHeader>
          <CardContent>
            <CardTitle className={styles.title}>{product.title}</CardTitle>
            <CardDescription className={styles.desc}>
              Category:{product.category}
            </CardDescription>
          </CardContent>
          <CardFooter>
            <div className={styles.price_container}>
              <span className={styles.price}>PRICE: </span>
              <span className={styles.price_num}>${product.price}</span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}

export default ProductCard;
