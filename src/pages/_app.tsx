import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { useRouter } from "next/router";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { push } = useRouter();

  return (
    <ClerkProvider {...pageProps} navigate={(to) => push(to)}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
