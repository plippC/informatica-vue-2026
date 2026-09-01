// ---------------------------------------------------------------------------
// Day 2B exercise — write this composable yourself first,
// then on Day 2F we'll replace it with VueUse's useDark + useStorage
// ---------------------------------------------------------------------------

// TODO Day 2B: implement useDarkMode
//
// It should:
// 1. hold a ref<boolean> called isDark
// 2. expose a toggle() function that flips isDark
// 3. apply / remove a 'dark' class on document.documentElement.classList.toggle when isDark changes
//    (hint: use a watch())
// 4. return { isDark, toggle }
//
// Bonus Day 2C: persist the preference in localStorage
//   (hint: initialise isDark from localStorage.getItem('darkMode'))

import { ref, watch } from 'vue'

export function useDarkMode() {
  // TODO Day 2B: replace this stub with your implementation
  const isDark = ref(false)

  function toggle() { isDark.value = !isDark.value}

  watch(isDark, () => {
    document.documentElement.classList.toggle('dark')
  })

  return {
    isDark,
    toggle
  }
}
