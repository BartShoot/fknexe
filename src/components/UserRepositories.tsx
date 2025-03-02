import { useEffect, useState } from "preact/hooks";
import { useQueryState, parseAsString } from "nuqs";
import { GitHubClient } from "../clients/GithubClient";
import { Button } from "./Button";
import type { IRepoSearchResultItem } from "../lib/types";

export function UserRepositories() {
  const [username] = useQueryState("u", parseAsString);
  const [repositories, setRepositories] = useState<IRepoSearchResultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      if (!username) return;

      try {
        setLoading(true);
        const response = await GitHubClient.searchRepositories("", username);
        setRepositories(response.items);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch repositories",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [username]);

  if (loading) {
    return (
      <div className="flex justify-center p-12">Loading repositories...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (repositories.length === 0) {
    return <div className="p-4">No repositories found for {username}.</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-6">{username}'s Repositories</h2>
      <div className="grid gap-4">
        {repositories.map((repo) => (
          <div
            key={repo.id}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-medium">{repo.name}</h3>
            {repo.description && (
              <p className="text-gray-600 my-2">{repo.description}</p>
            )}
            <div className="flex items-center gap-4 mt-3">
              <span className="text-sm text-gray-500">
                ⭐ {repo.stargazers_count}
              </span>
              <a
                href={`/user/repository?u=${encodeURIComponent(username || "")}&r=${encodeURIComponent(repo.name)}`}
                className="block"
              >
                <Button>View Details</Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
