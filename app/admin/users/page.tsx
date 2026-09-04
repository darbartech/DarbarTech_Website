"use client";

import { Suspense } from "react";
import UsersManager from "./UsersManager";

const Page = () => {
  return (
    <Suspense fallback={null}>
      <UsersManager defaultRole="all" />
    </Suspense>
  );
};

export default Page;
