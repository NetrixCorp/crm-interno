import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0D0D0D", color: "#fff" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid #333", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#FF2E2E" }}>NETRIX CRM</h1>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link href="/dashboard" style={{ color: "#ccc", textDecoration: "none", padding: "0.5rem 1rem", borderRadius: "4px" }}>Dashboard</Link>
          <Link href="/api/auth/signout" style={{ color: "#FF2E2E", textDecoration: "none", padding: "0.5rem 1rem", background: "#333", borderRadius: "4px" }}>Salir</Link>
        </div>
      </header>
      {/* Main Content */}
      <main style={{ padding: "2rem" }}>
        {children}
      </main>
    </div>
  );
}
