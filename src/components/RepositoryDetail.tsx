import { useEffect, useState } from "react";
import { parseAsString, useQueryState } from "nuqs";
import { GitHubClient } from "../clients/GithubClient";
import { Button } from "./Button";
import {
  detectOS,
  getAppropriateAsset,
  type SupportedOS,
} from "@/lib/utils/detectOS";
import type { ILatestRelease } from "../lib/types";

export function RepositoryDetail() {
  const [username] = useQueryState("u", parseAsString);
  const [repoName] = useQueryState("r", parseAsString);

  const [readme, setReadme] = useState<string | null>(null);
  const [release, setRelease] = useState<ILatestRelease | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detectedOS, setDetectedOS] = useState<SupportedOS>("unknown");
  const [downloadAsset, setDownloadAsset] = useState<{
    name: string;
    url: string;
  } | null>(null);

  useEffect(() => {
    // Detect OS on client side
    setDetectedOS(detectOS());

    const fetchRepositoryData = async () => {
      if (!username || !repoName) return;

      try {
        setLoading(true);

        // Fetch readme and release data in parallel
        const [readmeData, releaseData] = await Promise.all([
          GitHubClient.getReadme(username, repoName),
          GitHubClient.getLatestRelease(username, repoName).catch(() => null),
        ]);

        setReadme(readmeData);
        setRelease(releaseData);

        // Find appropriate asset for the detected OS
        if (releaseData) {
          const asset = getAppropriateAsset(releaseData.assets, detectOS());
          setDownloadAsset(asset);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch repository data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRepositoryData();
  }, [username, repoName]);

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        Loading repository details...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{repoName}</h1>
      <p className="text-gray-500 mb-8">by {username}</p>

      {/* Download Section */}
      <div className="bg-gray-100 p-6 rounded-lg mb-8 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Download Latest Release</h2>

        {!release && (
          <p className="text-gray-700">
            No releases found for this repository.
          </p>
        )}

        {release && !downloadAsset && (
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              No compatible binary found for your operating system ({detectedOS}
              ).
            </p>
            <p className="text-sm">
              You can browse all available files in the{" "}
              <a
                href={release.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                release page
              </a>
              .
            </p>
          </div>
        )}

        {release && downloadAsset && (
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              We found a compatible binary for your {detectedOS} system:
            </p>
            <p className="font-medium mb-2">{downloadAsset.name}</p>
            <a href={downloadAsset.url} download>
              <Button className="text-lg py-3 px-8 mt-2">DOWNLOAD</Button>
            </a>
          </div>
        )}
      </div>

      {/* README Section */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">README</h2>
        {readme ? (
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap">{readme}</pre>
          </div>
        ) : (
          <p className="text-gray-700">No README found for this repository.</p>
        )}
      </div>
    </div>
  );
}
