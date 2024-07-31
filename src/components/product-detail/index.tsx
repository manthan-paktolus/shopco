"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./styles.module.scss";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Rating } from "@mui/material";
import AddToCartButton from "../add-to-cart";
import { Iproduct } from "@/types/@types.products";

interface ProductDetailsProps {
  product: Iproduct;
}

export default function ProductDetail({ product }: ProductDetailsProps) {
  console.log("products value", product);
  const { images } = product;
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <div className={styles.container}>
      <div className={styles.children}>
        <Carousel
          plugins={[plugin.current]}
          className={styles.carousel}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {images.map((image: string, index: number) => (
              <CarouselItem key={index}>
                <div className={styles.card__container}>
                  <Card>
                    <CardContent className={styles.card__content}>
                      <Image
                        src={image}
                        alt="product images"
                        width={300}
                        height={400}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className={styles.children}>
        <div className={styles.content}>
          <h2 className={styles.title}>{product.title}</h2>
          <div className={styles.rating}>
            <Rating value={product.rating} readOnly />
          </div>
          <div className={styles.price_container}>
            <span className={styles.price}>PRICE: </span>
            <span className={styles.price_num}>${product.price}</span>
          </div>
          <p className={styles.discount}>
            get upto {Math.floor(product.discountPercentage)}% discount on this
            product
          </p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.category_container}>
            <span className={styles.category}>CATEGORY: </span>
            <span className={styles.category_name}>{product.category}</span>
          </p>
          {/* <p className={styles.brand_container}>
            <span className={styles.brand}>BRAND: </span>
            <span className={styles.brand_name}>{product.brand}</span>
          </p> */}
          {/* <p className={styles.stock_container}>
            <span className={styles.stock}>STATUS: </span>
            <span className={styles.stock_name}>
              {product.availabilityStatus}
            </span>
          </p> */}
          <AddToCartButton
            productId={product._id}
            name={product.title}
            price={product.price}
            images={product.images}
            stock={product.stock}
          />
        </div>
      </div>
    </div>
  );
}
