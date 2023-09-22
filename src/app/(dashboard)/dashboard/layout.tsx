import { authOptions } from "@/lib/auth";
import { FC, ReactNode } from "react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions);

  if (!session) notFound();
  return <div>{children}</div>;
};

export default Layout;
