import { describe, expect, it, vi } from "vite-plus/test";

import { applyAppearanceContrast } from "./appearanceContrast";

function makeRoot() {
  const setProperty = vi.fn();
  const toggleAttribute = vi.fn();
  return {
    root: { style: { setProperty }, toggleAttribute } as unknown as HTMLElement,
    setProperty,
    toggleAttribute,
  };
}

describe("applyAppearanceContrast", () => {
  it("boosts semantic contrast above the default", () => {
    const { root, setProperty, toggleAttribute } = makeRoot();

    applyAppearanceContrast(root, 135);

    expect(setProperty).toHaveBeenCalledWith("--appearance-contrast-base", "100%");
    expect(setProperty).toHaveBeenCalledWith("--appearance-contrast-boost", "35%");
    expect(toggleAttribute).toHaveBeenCalledWith("data-appearance-contrast", true);
  });

  it("softens semantic contrast below the default", () => {
    const { root, setProperty, toggleAttribute } = makeRoot();

    applyAppearanceContrast(root, 70);

    expect(setProperty).toHaveBeenCalledWith("--appearance-contrast-base", "70%");
    expect(setProperty).toHaveBeenCalledWith("--appearance-contrast-boost", "0%");
    expect(toggleAttribute).toHaveBeenCalledWith("data-appearance-contrast", true);
  });

  it("disables contrast mixing at the default", () => {
    const { root, setProperty, toggleAttribute } = makeRoot();

    applyAppearanceContrast(root, 100);

    expect(setProperty).toHaveBeenCalledWith("--appearance-contrast-base", "100%");
    expect(setProperty).toHaveBeenCalledWith("--appearance-contrast-boost", "0%");
    expect(toggleAttribute).toHaveBeenCalledWith("data-appearance-contrast", false);
  });
});
