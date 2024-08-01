import { cookies } from "next/headers";

export function DarkModeButton() {
  const currentTheme = cookies().get("theme")?.value ?? "dark";

  async function toggleDarkMode() {
    "use server";
    const newTheme =
      cookies().get("theme")?.value === "dark" ? "light" : "dark";
    cookies().set("theme", newTheme, { path: "/" });
  }

  return (
    <form action={toggleDarkMode} style={{ display: "flex" }}>
      <button
        type="submit"
        style={{
          background: "none",
          border: "none",
          fontSize: 32,
          lineHeight: 0,
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {currentTheme === "dark" ? "☀️" : "🌙"}
      </button>
    </form>
  );
}
