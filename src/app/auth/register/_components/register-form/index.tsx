"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RegisterSchema } from "@/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./styles.module.scss";
import { createUser } from "@/services/register";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    mode: "onBlur",
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const handleSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    const enteredUsername = values.username;
    const enteredEmail = values.email;
    const enteredPassword = values.password;
    try {
      const result = await createUser(
        enteredUsername,
        enteredEmail,
        enteredPassword
      );
      router.push("/cart");

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const isLoading = form.formState.isSubmitting || form.formState.isLoading;
  return (
    <Card className={styles.container}>
      <CardHeader>
        <CardTitle className={styles.title}>Register</CardTitle>
      </CardHeader>
      <Separator className={styles.horizontal_line} />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className={styles.input__container}>
                  <FormLabel className={styles.label}>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Insert your username"
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
              name="email"
              render={({ field }) => (
                <FormItem className={styles.input__container}>
                  <FormLabel className={styles.label}>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Insert your email"
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
                "Register"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
