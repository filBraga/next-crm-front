import React from "react";
import { Context } from "../components/Context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Context>
        <Component {...pageProps} />
      </Context>
    </>
  );
}

export default MyApp;
