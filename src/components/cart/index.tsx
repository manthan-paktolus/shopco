"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import styles from "./styles.module.scss";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { toast } from "sonner";

interface CartItem {
  productId: string;
  images: string[];
  name: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCartApi = async () => {
    const res = await fetch("/api/cart");
    if (res.ok) {
      const data = await res.json();
      setCart((prevCart) => {
        return data.items;
      });
    } else {
      setCart([]);
    }

    return res;
  };

  const fetchCart = async () => {
    setLoading(true);
    try {
      await fetchCartApi();
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  React.useEffect(() => {
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });
    setTotalPrice(total);
  }, [cart]);

  const handleRemoveFromCart = async (productId: string) => {
    const res = await fetch("/api/cart/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    if (res.ok) {
      setCart(cart.filter((item) => item.productId !== productId));
    } else {
      toast.error("Failed to remove from cart");
    }
  };

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    const res = await fetch("/api/cart/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if (res.ok) {
      await fetchCartApi();
    } else {
      toast.error("Failed to update quantity");
    }
  };

  if (loading) {
    return <p className={styles.msg}>Loading...</p>;
  }

  console.log(cart);

  return (
    <div>
      {cart.length === 0 ? (
        <p className={styles.msg}>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <Card key={item.productId} className={styles.card}>
            <CardTitle className={styles.title}>{item.name}</CardTitle>
            <CardHeader>
              <Image src={item.images[0]} alt="" width={100} height={100} />
            </CardHeader>
            <CardContent>
              <p className={styles.price}>Price: ${item.price}</p>
              <div className={styles.quantity}>
                <span className={styles.quant}>QUANTITY: </span>
                <Button
                  className={styles.btn}
                  onClick={() =>
                    handleUpdateQuantity(
                      item.productId,
                      Math.max(item.quantity - 1, 1)
                    )
                  }
                >
                  -
                </Button>
                <div>{item.quantity}</div>
                <Button
                  className={styles.btn}
                  onClick={() =>
                    handleUpdateQuantity(item.productId, item.quantity + 1)
                  }
                >
                  +
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className={styles.button}
                onClick={() => handleRemoveFromCart(item.productId)}
              >
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
      <div className={styles.totalPice}>
        <h3>Total : {Math.floor(totalPrice * 100) / 100}</h3>
      </div>
    </div>
  );
};

export default Cart;
