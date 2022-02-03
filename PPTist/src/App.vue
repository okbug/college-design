<template>
  <Screen v-if="screening" />
  <Editor v-else-if="pc" />
  <Mobile v-else />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useScreenStore, useMainStore, useSnapshotStore } from '@/store'
import { isPC } from './utils/common'

import Editor from './views/Editor/index.vue'
import Screen from './views/Screen/index.vue'
import Mobile from './views/Mobile.vue'

const mainStore = useMainStore()
const snapshotStore = useSnapshotStore()
const { screening } = storeToRefs(useScreenStore())
const pc = isPC()

if (process.env.NODE_ENV === 'production') {
  window.onbeforeunload = () => false
}

onMounted(() => {
  snapshotStore.initSnapshotDatabase()
  mainStore.setAvailableFonts()
})
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>