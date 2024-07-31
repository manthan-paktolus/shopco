import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import styles from "./styles.module.scss";
import { toast } from "sonner";

interface AddToCartButtonProps {
  productId: string;
  images: string[];
  name: string;
  price: number;
  stock: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  images,
  name,
  price,
  stock,
}) => {
  console.log("Images", images);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          images,
          name,
          price,
          quantity,
        }),
      });

      if (res.ok) {
        toast.success("Successfully added to cart", {
          className: styles.toast,
          duration: 5000,
          descriptionClassName: styles.toastDescription,
        });
      } else {
        const errorData = await res.json();
        toast.error(`Failed to add to cart: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div>
      <div className={styles.quantity}>
        <span className={styles.quant}>QUANTITY: </span>
        <Button
          className={styles.btn}
          onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
        >
          -
        </Button>
        <div>{quantity}</div>
        <Button
          className={styles.btn}
          onClick={() => setQuantity((prev) => Math.min(prev + 1, stock))}
        >
          +
        </Button>
      </div>
      <Button className={styles.button} onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default AddToCartButton;
