<script setup lang="ts">
import { ref } from 'vue';


// ---------------------------------------------------------------------------
// Day 2E exercise — fetch your real GitHub repos and display them
// ---------------------------------------------------------------------------

// TODO Day 2E: import and use your useGithub composable
// import { useGithub } from '@/composables/useGithub'
// const githubUsername = 'antfu'
// const ... = useGithub(githubUsername) ...
//
// TODO Day 2F: replace your useGithub composable with @vueuse/core: useFetch composable
//              see https://vueuse.org/core/useFetch/#usefetch

// TODO Day 2G: import useStorage composable from '@vueuse/core' and store 'username' in local storage
//              see https://vueuse.org/core/useStorage/#usestorage
// import { useStorage } from '@vueuse/core'
// const username = ...
// const url = computed ...
// ... useFetch with 'refetch: true'

// TODO Day 2E: import ProjectCard and use it in the template below
import ProjectCard from '@/components/ProjectCard.vue'

// Mock Repo for Day 2A
// TODO Day2E: remove
const mockRepo = {
  id: 1,
  name: 'demo-project',
  description: 'A small demo repo',
  html_url: 'https://github.com/vuejs-ai/skills',
  language: 'TypeScript',
  stargazers_count: 42,
  topics: ['vue', 'typescript']
}
</script>

<template>
  <section>
    <h2>Projects</h2>
    <!-- TODO Day 2G
    <div style="margin-bottom: 1.5rem; display: flex; gap: 0.5rem; max-width: 360px;">
      <input v-model="username" placeholder="GitHub username" />
    </div>
    -->

    <!-- TODO Day 2E: show a loading state while repos are being fetched -->

    <!-- TODO Day 2E: show an error message if the fetch fails -->

    <!-- TODO Day 2A: render a single ProjectCard for the 'mockRepo', remove at Day 2E -->

    <div class="projects-grid">
      <ProjectCard :repo="mockRepo" />
      <!-- TODO Day 2E: render a ProjectCard for each repo -->
      <p class="placeholder">Your GitHub repos will appear here on Day 2E.</p>
    </div>
  </section>
</template>
