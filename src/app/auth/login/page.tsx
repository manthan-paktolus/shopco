import { getServerSession } from "next-auth";
import LoginForm from "./_components/login-form/";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { NextPage } from "next";

type Props = {
  searchParams: { callbackUrl?: string; error?: string };
};

const LoginPage: NextPage<Props> = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session) {
    redirect("/cart");
  }
  return (
    <LoginForm
      callbackUrl={searchParams.callbackUrl}
      error={searchParams.error}
    />
  );
};
export default LoginPage;
