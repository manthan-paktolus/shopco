"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LoginSchema } from "@/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./styles.module.scss";
import { toast } from "sonner";
import { FC } from "react";

type Props = {
  callbackUrl?: string;
  error?: string;
};

const LoginForm: FC<Props> = ({ callbackUrl, error }) => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: callbackUrl || "/dashboard",
    });
  };

  const isLoading = form.formState.isSubmitting || form.formState.isLoading;
  return (
    <Card className={styles.container}>
      <CardHeader>
        <CardTitle className={styles.title}>Login</CardTitle>
        {error && (
          <CardDescription className={styles.error}>
            {error === "CredentialsSignin" ? "Invalid credentials" : undefined}
          </CardDescription>
        )}
      </CardHeader>
      <Separator className={styles.horizontal_line} />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className={styles.input__container}>
                  <FormLabel className={styles.label}>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Insert your email"
                      autoFocus
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage className={styles.form__error} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className={styles.input__container}>
                  <FormLabel className={styles.label}>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Insert your password"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage className={styles.form__error} />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={styles.button}
              disabled={isLoading}
            >
              {isLoading ? (
                <EllipsisLoader className={styles.loader} />
              ) : (
                "Log in"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
