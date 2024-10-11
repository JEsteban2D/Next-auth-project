import React from "react";
import { auth } from "../../../../auth";

export default async function AdminPage () {
  const session = await auth();

  if (!session) {
    return <div> Not Admin</div>;
  }
  return (
    <div>
      AdminPage
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

