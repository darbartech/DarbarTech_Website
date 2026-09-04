"use client";

import { Suspense } from "react";
import UsersManager from "../users/UsersManager";

const StudentsPage = () => {
  return (
    <Suspense fallback={null}>
      <UsersManager
        defaultRole="student"
        title="Students"
        subtitle="Manage the student accounts of the application."
      />
    </Suspense>
  );
};

export default StudentsPage;
