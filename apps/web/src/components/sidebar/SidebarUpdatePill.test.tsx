import type { DesktopUpdateState } from "@t3tools/contracts";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vite-plus/test";

import { SidebarUpdateReleaseNotesTooltip } from "./SidebarUpdatePill";

const updateState: DesktopUpdateState = {
  enabled: true,
  status: "available",
  channel: "nightly",
  currentVersion: "0.0.34-nightly.20260823.116901",
  hostArch: "x64",
  appArch: "x64",
  runningUnderArm64Translation: false,
  availableVersion: "0.0.34-nightly.20260823.117002",
  downloadedVersion: null,
  releaseNotes: [
    {
      version: "0.0.34-nightly.20260823.117002",
      items: ["fix(mobile): isolate markdown image requests by @SunkenInTime in pingdotgg#7942"],
    },
  ],
  downloadPercent: null,
  checkedAt: "2026-08-23T20:00:00.000Z",
  message: null,
  errorContext: null,
  canRetry: false,
};

describe("SidebarUpdateReleaseNotesTooltip", () => {
  it("brands the update title without adding custom release-note bullets", () => {
    const markup = renderToStaticMarkup(
      <SidebarUpdateReleaseNotesTooltip state={updateState} tooltip="Update available" />,
    );

    expect(markup).toContain("Update ready to download - Fenris Custom Build");
    expect(markup.match(/<li\b/g)).toHaveLength(1);
    expect(markup).toContain(
      "fix(mobile): isolate markdown image requests by @SunkenInTime in pingdotgg#7942",
    );
    expect(markup).not.toContain("Important");
    expect(markup).not.toContain("fix/grok-skill-catalog");
  });
});
