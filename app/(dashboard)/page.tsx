import { auth, currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await currentUser();
  const { userId } = await auth();

  return (
    <div>
      <h2 style={{ fontSize: "2rem", color: "#FF2E2E", marginBottom: "1rem" }}>
        🎉 Bienvenido, {user?.firstName || "Usuario"}!
      </h2>
      <p style={{ color: "#aaa", marginBottom: "1.5rem", fontSize: "1.1rem" }}>
        El CRM NETRIX está en construcción. Próximas fases:
      </p>
      <ul style={{ color: "#aaa", marginLeft: "2rem", lineHeight: "1.8" }}>
        <li>✅ Autenticación con Clerk</li>
        <li>⏳ Módulo de Contactos</li>
        <li>⏳ Pipeline Kanban (5 etapas)</li>
        <li>⏳ Integración Claude API (IA)</li>
        <li>⏳ Google Calendar y Gmail</li>
      </ul>
      <p style={{ color: "#666", marginTop: "2rem", fontSize: "0.9rem" }}>
        User ID: <code style={{ background: "#1a1a1a", padding: "0.25rem 0.5rem", borderRadius: "4px" }}>{userId}</code>
      </p>
    </div>
  );
}
