// ---------------------------------------------------------------------------
// Day 2E exercise — fetch repos from the GitHub API, typed with an interface
// ---------------------------------------------------------------------------

// TODO Day 2E: import the Repo type you defined in src/types/index.ts
// import type { Repo } from '@/types'

// TODO Day 2E: implement useGithub
//
// It should:
// 1. accept a GitHub username as a parameter (string)
// 2. return reactive refs: repos (Repo[]), loading (boolean), error (string | null)
// 3. fetch from: https://api.github.com/users/{username}/repos?sort=updated&per_page=12
// 4. set loading = true before fetch, false after
// 5. catch errors and set the error ref
//
// Bonus Day 2F: replace the manual fetch with VueUse's useFetch() — how much shorter is it?

import { ref } from 'vue'
import type { Repo } from '@/types'

export function useGithub(username: string) {
  const repos = ref<Repo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchRepos() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`)
      if (!response.ok) throw new Error(`API error: ${response.status}`)
      const data = (await response.json()) as Repo[]
      repos.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Something went wrong'
    } finally {
      loading.value = false
    }
  }

  fetchRepos()

  return { repos, loading, error }
}
