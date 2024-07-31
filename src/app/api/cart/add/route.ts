import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Cart, { ICartItem } from "@/models/Cart";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId, name, price, images, quantity } = await req.json();

  if (!productId || !name || !price || !quantity) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    let cart = await Cart.findOne({ userId: session.user.email });

    if (!cart) {
      cart = new Cart({ userId: session.user.email, items: [] });
    }

    const existingItem = cart.items.find(
      (item: ICartItem) => item.productId === productId
    );

    if (existingItem) {
      const updatedQuantity = quantity + existingItem?.quantity;
      existingItem.price = updatedQuantity * price;
      existingItem.quantity = updatedQuantity;
    } else {
      const updatedPrice = price * quantity;
      cart.items.push({
        productId,
        name,
        price: updatedPrice,
        quantity,
        images,
      });
    }

    await cart.save();

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { error: "Unable to add item to cart" },
      { status: 500 }
    );
  }
}
