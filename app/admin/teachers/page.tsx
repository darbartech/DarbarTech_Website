"use client";

import { Suspense } from "react";
import UsersManager from "../users/UsersManager";

const TeachersPage = () => {
  return (
    <Suspense fallback={null}>
      <UsersManager
        defaultRole="teacher"
        title="Teachers"
        subtitle="Manage the teacher accounts of the application."
      />
    </Suspense>
  );
};

export default TeachersPage;
