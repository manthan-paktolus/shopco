"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";

const Dashboard = () => {
  const router = useRouter();
  const { data, status } = useSession();
  console.log("sess", data);
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Welcome to Your Dashboard</h1>
      <div className={styles.userInfo}>
        <h2 className={styles.subtitle}>User Information</h2>
        <p className={styles.info}>Username:{data?.user.username} </p>
        <p className={styles.info}>Email: {data?.user.email}</p>
      </div>
      <div className={styles.actions}>
        <Button
          onClick={() => router.push("/edit-profile")}
          className={styles.button}
        >
          Edit Profile
        </Button>
        <Button
          onClick={() => router.push("/change-password")}
          className={styles.button}
        >
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
