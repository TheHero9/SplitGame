"use client"; // 👈 use it here

import { RecoilRoot } from "recoil";
import App from "./App";
import React from "react";

export default function Home() {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </React.StrictMode>
  );
}
