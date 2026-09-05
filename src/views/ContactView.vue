<script setup lang="ts">
import { computed, ref } from 'vue';

// ---------------------------------------------------------------------------
// Day 3 OPTIONAL exercise — build a contact form with v-model + validation
// ---------------------------------------------------------------------------

// TODO Day 3 (optional): add refs for name, email, message
const name = ref('')
const email = ref('')
const message = ref('')

// TODO Day 3 (optional): add a computed property for form validity
const isValid = computed(() => name.value.trim().length > 0 && email.value.indexOf('@') >= 0 && message.value.trim().length > 0)

const submitted = ref(false)

// TODO Day 3 (optional): handle submit — show a success message
function handleSubmit() {
  if (!isValid) return
  submitted.value = true
}
</script>

<template>
  <section>
    <h2>Contact</h2>

    <!-- TODO Day 3 (optional): build out this form with v-model on each field -->
    <form class="contact-form" @submit.prevent="handleSubmit">
      <label>
        Name
        <input type="text" v-model="name" placeholder="Your name" />
      </label>
      <label>
        Email
        <input type="email" v-model="email" placeholder="your@email.com" />
      </label>
      <label>
        Message
        <textarea rows="5" v-model="message" placeholder="Say hello…" />
      </label>
      <button type="submit" :disabled="!isValid">Send</button>
      <div class="contact--acknowledge" v-if="submitted">Your data have been successfully sent</div>
    </form>
  </section>
</template>
