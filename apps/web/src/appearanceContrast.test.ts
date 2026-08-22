import { describe, expect, it, vi } from "vite-plus/test";

import { applyAppearanceContrast } from "./appearanceContrast";

describe("applyAppearanceContrast", () => {
  it("applies a non-default contrast filter", () => {
    const setProperty = vi.fn();

    applyAppearanceContrast({ style: { setProperty } } as unknown as HTMLElement, 135);

    expect(setProperty).toHaveBeenCalledWith("--appearance-contrast-filter", "contrast(135%)");
  });

  it("disables the filter at the default contrast", () => {
    const setProperty = vi.fn();

    applyAppearanceContrast({ style: { setProperty } } as unknown as HTMLElement, 100);

    expect(setProperty).toHaveBeenCalledWith("--appearance-contrast-filter", "none");
  });
});
