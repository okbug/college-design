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

// if (props.id) {
//   const num = Number(props.id)
//   if (!isNaN(num)) {
//     for (let i = 0; i < num; i++) {
//       useImport()
//     }
//   }
// }


// 获得当前URL下的PPT
// fetch('http://localhost:3000/test1').then(j => j.json())
//   .then((res) => {
//     console.log(res)
//     const slides = useImport()
//     slides.value = res
//   })
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