import router from "next/router";
import React, { useEffect } from "react";

const Custom404 = () => {
  useEffect(() => router.replace("/"), []);
  return null;
};

export default Custom404;
