"use client";

import { FC } from "react";
import { Toaster } from "react-hot-toast";

interface ProvidersPros {
  children: React.ReactNode;
}

const Providers: FC<ProvidersPros> = ({ children }) => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </>
  );
};

export default Providers;
