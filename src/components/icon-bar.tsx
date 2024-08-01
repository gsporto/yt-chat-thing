import { DarkModeButton } from "@/components/dark-mode-button";
import { GithubLink } from "@/components/github-link";

export function IconBar() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 50,
        height: 48,
        display: "flex",
        gap: 8,
        alignItems: "center",
      }}
    >
      <DarkModeButton />
      <GithubLink />
    </div>
  );
}
