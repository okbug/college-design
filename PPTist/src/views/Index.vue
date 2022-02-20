<template>
  <Screen v-if="screening" />
  <Editor v-else-if="pc" />
  <Mobile v-else />
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps } from 'vue'
import { storeToRefs } from 'pinia'
import { useScreenStore, useMainStore, useSnapshotStore } from '@/store'
import { isPC } from '../utils/common'
import Editor from './Editor/index.vue'
import Screen from './Screen/index.vue'
import Mobile from './Mobile.vue'

import useImport from '../hooks/useImport'

const props = defineProps({
  id: String
})

const fetchPPTContent = () => {
  if (!props.id) return
  const { id } = props
  console.log(id)
}

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