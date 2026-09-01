<script setup lang="ts">
// ---------------------------------------------------------------------------
// Day 2A exercise — build this component from scratch
// ---------------------------------------------------------------------------

import type { Repo } from '@/types'

defineProps<{ repo: Repo }>()
</script>

<template>
  <article class="project-card">
    <h3>
      <a :href="repo.html_url" target="_blank" rel="noreferrer">
        {{ repo.name }}
      </a>
    </h3>

    <p class="description" v-if="repo.description">
      {{ repo.description }}
    </p>

    <div class="meta">
      <span v-if="repo.language">Language: {{ repo.language }}</span>
      <span>⭐ {{ repo.stargazers_count }}</span>
    </div>

    <ul v-if="repo.topics.length" class="topics">
      <li v-for="topic in repo.topics" :key="topic" class="tag">
        {{ topic }}
      </li>
    </ul>
  </article>
</template>
