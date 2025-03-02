export type SupportedOS = "windows" | "macos" | "unknown";

export function detectOS(): SupportedOS {
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("win")) {
    return "windows";
  } else if (userAgent.includes("mac")) {
    return "macos";
  }

  return "unknown";
}

export function getAppropriateAsset(
  assets: { name: string; browserDownloadUrl: string }[],
  os: SupportedOS,
): { name: string; url: string } | null {
  if (!assets.length) return null;

  const assetMap = assets.map((asset) => ({
    name: asset.name,
    url: asset.browserDownloadUrl,
  }));

  if (os === "windows") {
    // First try to find .msi files
    const msiAsset = assetMap.find((asset) =>
      asset.name.toLowerCase().endsWith(".msi"),
    );
    if (msiAsset) return msiAsset;

    // Then try to find .exe files
    const exeAsset = assetMap.find((asset) =>
      asset.name.toLowerCase().endsWith(".exe"),
    );
    if (exeAsset) return exeAsset;
  } else if (os === "macos") {
    // Find .dmg files
    const dmgAsset = assetMap.find((asset) =>
      asset.name.toLowerCase().endsWith(".dmg"),
    );
    if (dmgAsset) return dmgAsset;
  }

  // If no appropriate asset is found, return the first asset as a fallback
  return assetMap[0] ?? null;
}
