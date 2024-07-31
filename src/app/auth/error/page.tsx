import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Title } from "@/components/ui/title";
import { ShieldX } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";
import styles from "./_styles/styles.module.scss";

type Props = {
  searchParams: { error?: string };
};

const Page: NextPage<Props> = ({ searchParams }) => {
  console.log(searchParams);
  return (
    <Card className={styles.container}>
      <CardHeader>
        <Title as={CardTitle} className={styles.title}>
          {searchParams.error || "Oops! Something went Wrong!"}
        </Title>
      </CardHeader>
      <CardContent>
        <div className={styles.icon__container}>
          <ShieldX className={styles.icon} />
        </div>
      </CardContent>
      <CardFooter className={styles.footer}>
        <Button asChild variant="link" size="sm" className={styles.btn}>
          <Link href="/auth/login">Back to Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Page;
