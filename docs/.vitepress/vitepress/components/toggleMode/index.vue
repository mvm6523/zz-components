<template>
  <div style="width: 73px">
    <ToggleModeSwitch
      :isDark="isDark"
      @toggle="toggle"
      style="transform: scale(0.4)"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useData, inBrowser } from 'vitepress'
import ToggleModeSwitch from './toggleModeSwitch.vue'

const COMPONENT_NAME = 'ToggleMode'
defineOptions({
  name: COMPONENT_NAME,
})

const APPEARANCE_KEY = 'vitepress-theme-appearance'
const { site, isDark } = useData()
const checked = ref(false)
const toggle = inBrowser ? useAppearance() : () => {}

onMounted(() => {
  checked.value = document.documentElement.classList.contains('dark')
})

function useAppearance() {
  const query = window.matchMedia('(prefers-color-scheme: dark)')
  const classList = document.documentElement.classList

  let userPreference = localStorage.getItem(APPEARANCE_KEY)

  let isDark =
    (site.value.appearance === 'dark' && userPreference == null) ||
    (userPreference === 'auto' || userPreference == null
      ? query.matches
      : userPreference === 'dark')

  query.onchange = (e) => {
    if (userPreference === 'auto') {
      setClass((isDark = e.matches))
    }
  }

  function toggle() {
    setClass((isDark = !isDark))

    userPreference = isDark
      ? query.matches
        ? 'auto'
        : 'dark'
      : query.matches
      ? 'light'
      : 'auto'

    localStorage.setItem(APPEARANCE_KEY, userPreference)
  }

  function setClass(dark: boolean): void {
    const css = document.createElement('style')
    css.type = 'text/css'
    css.appendChild(
      document.createTextNode(
        `:not(.VPSwitchAppearance):not(.VPSwitchAppearance *) {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -o-transition: none !important;
  -ms-transition: none !important;
  transition: none !important;
}`
      )
    )
    document.head.appendChild(css)

    checked.value = dark
    classList[dark ? 'add' : 'remove']('dark')

    // @ts-expect-error keep unused declaration, used to force the browser to redraw
    const _ = window.getComputedStyle(css).opacity
    document.head.removeChild(css)
  }

  return toggle
}

watch(checked, (newIsDark) => {
  isDark.value = newIsDark
})
</script>
