/**
 * GitHub API writer for content files.
 *
 * Used in production (Vercel read-only FS) to commit content changes
 * directly to the repo, which triggers an auto-rebuild.
 *
 * Required env vars: GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO
 * Optional env var:  GITHUB_BRANCH (defaults to 'main')
 */

const GITHUB_API = 'https://api.github.com'

export async function writeGitHubFile(
  repoPath: string,
  content: string,
  commitMessage: string,
): Promise<void> {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH ?? 'main'

  if (!token || !owner || !repo) {
    throw new Error('GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO env vars must be set.')
  }

  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${repoPath}`
  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  // Fetch the current file SHA — GitHub requires it to update an existing file
  const metaRes = await fetch(`${url}?ref=${branch}`, {
    headers,
    cache: 'no-store',
  })
  if (!metaRes.ok) {
    throw new Error(
      `GitHub: failed to read ${repoPath} (${metaRes.status}): ${await metaRes.text()}`,
    )
  }
  const { sha } = (await metaRes.json()) as { sha: string }

  // Commit the new content
  const writeRes = await fetch(url, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: commitMessage,
      content: Buffer.from(content).toString('base64'),
      sha,
      branch,
    }),
  })
  if (!writeRes.ok) {
    throw new Error(
      `GitHub: failed to write ${repoPath} (${writeRes.status}): ${await writeRes.text()}`,
    )
  }
}
