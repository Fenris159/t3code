import type { AppearanceContrast } from "@t3tools/contracts/settings";

export function applyAppearanceContrast(root: HTMLElement, contrast: AppearanceContrast): void {
  root.style.setProperty(
    "--appearance-contrast-filter",
    contrast === 100 ? "none" : `contrast(${contrast}%)`,
  );
}
