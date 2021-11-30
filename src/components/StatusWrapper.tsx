import React, { ReactElement } from "react";

const StatusWrapper = ({
  status,
  error,
  children,
}: {
  status: string;
  error?: null | Error;
  children: ReactElement;
}) => {
  if (status === "idle" || status === "pending") {
    return <div>loading...</div>;
  }

  if (status === "rejected") {
    return <div>{error?.message}</div>;
  }

  if (status === "resolved") {
    return children;
  }

  return null;
};

export default StatusWrapper;
