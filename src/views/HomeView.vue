<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

// ---------------------------------------------------------------------------
// Day 1 Part A — reactivity and templates
// ---------------------------------------------------------------------------

// TODO Day 1A: a) replace with your own name and bio
const name = 'Patricia'
const bio = 'Senior Software Engineer at Cornelsen'

// TODO Day 1A: b) replace with your own skills
const skills = ref(['HTML', 'Typescript', 'Java'])

const newSkill = ref('')

function skillExists(skillName: string) {
  const normalizedSkill = skillName.trim().toLowerCase()

  return skills.value.some(existingSkill => existingSkill.toLowerCase() === normalizedSkill)
}

function addSkill() {
  const skill = newSkill.value.trim()

  if (!skill || skillExists(skill)) {
    return
  }

  skills.value.push(skill)
  newSkill.value = ''
}

// ---------------------------------------------------------------------------
// Day 1 Part B — computed, watch, onMounted
// ---------------------------------------------------------------------------
// TODO Day 1B: add a computed property `skillCount` that returns the number
// of skills — hint: skills.value.length
const skillCount = computed(() => skills.value.length)

// TODO Day 1B: use onMounted to load saved skills from localStorage
// (key: 'portfolio-skills') — hint: JSON.parse() to convert back to an array
const skillsKey = 'portfolio-skills'
onMounted(() => {
  console.log('mounted')
  const val = localStorage.getItem(skillsKey)
  if (val) {
    skills.value = JSON.parse(val)
  }
})

// TODO Day 1B: use watch to save skills to localStorage whenever the list changes
// hint: JSON.stringify() to convert the array to a string, { deep: true } option
watch(skills, (val) => {
  console.log('changed:', val)
  localStorage.setItem(skillsKey, JSON.stringify(val))
}, { deep: true })

// ---------------------------------------------------------------------------
// Bonus
// ---------------------------------------------------------------------------

function removeSkill(index: number) {
  // TODO Bonus: remove the skill at the given index from the skills array
  skills.value.splice(index, 1)
}
</script>

<template>
  <section class="hero">
    <!-- TODO Day 1A: c) render name and bio -->
    <h1>{{ name }}</h1>
    <p class="bio">{{ bio }}</p>

    <!-- TODO Day 1B: replace the hardcoded "Skills" heading with
         "Skills ({{ skillCount }})" once you've added the computed -->
    <h3>Skills ({{ skillCount }})</h3>
    <ul class="skills">
      <!-- TODO Day 1A: d) Render the skills list using "li" + `v-for`
           Bonus: text-input should also add skill on <ENTER> -->

      <li v-for="skill in skills" :key="skill">{{ skill }}
        <button @click="removeSkill(skills.indexOf(skill))">×</button>
      </li>
    </ul>

    <!-- TODO Day 1A: e) wire up v-model and the addSkill button
         Bonus: text-input should also add skill on <ENTER> -->
    <div class="add-skill">
      <input v-model="newSkill" placeholder="Add a skill…" @keyup.enter="addSkill" />
      <button @click="() => addSkill()" :disabled="newSkill.trim().length === 0 || skillExists(newSkill)">
        Add
      </button>
    </div>
  </section>
</template>
