import React from "react";

interface ClientLayoutProps {
  children?: React.ReactNode;
}
export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div>
      ClientLayout
      {children}
    </div>
  );
}
