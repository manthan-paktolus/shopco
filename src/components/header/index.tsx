"use client";
import Link from "next/link";
import styles from "./styles.module.scss";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  return (
    <header className={styles.header}>
      <Link href="/products">
        <div className={styles.logo}>
          <h1>Shop.Co</h1>
        </div>
      </Link>
      <nav className={styles.nav}>
        <Link href="/products">
          <Button className={styles.button}>Products</Button>
        </Link>

        {!session && !loading && (
          <Link href="/auth/login">
            <Button className={styles.button}>Login</Button>
          </Link>
        )}

        {!session && !loading && (
          <Link href="/auth/register">
            <Button className={styles.button}>Signup</Button>
          </Link>
        )}

        <Link href="/cart">
          <Button className={styles.button}>Cart</Button>
        </Link>

        {session && (
          <Button
            onClick={() => {
              signOut({ callbackUrl: "/auth/login" });
            }}
            className={styles.button}
          >
            Logout
          </Button>
        )}
      </nav>
    </header>
  );
}
