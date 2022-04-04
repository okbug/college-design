<template>
  <Screen v-if="screening" />
  <Editor v-else-if="isPc" />
  <Mobile v-else />
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useScreenStore, useMainStore, useSnapshotStore } from '@/store'
import { isPC } from './utils/common'
import useParmas from './hooks/useRoute'
import useImport from './hooks/useImport'

import Editor from './views/Editor/index.vue'
import Screen from './views/Screen/index.vue'
import Mobile from './views/Mobile.vue'
import { getPPTContent } from './api/docs'
import { getUserInfo } from './api'

export default defineComponent({
  name: 'app',
  components: {
    Editor,
    Screen,
    Mobile,
  },
  setup() {

    const mainStore = useMainStore()
    const slide = useImport()
    const snapshotStore = useSnapshotStore()
    const { screening } = storeToRefs(useScreenStore())
    const params = useParmas() as { id: string }
    getUserInfo().then(res => {
      console.log(res)
    })
    const loadPPTContent = () => {
      if (!params.id) return;
      getPPTContent(params.id).then(res => {
        console.log(res, 'res')
        const content = { res }
        slide.value = (content.res as any).content as any
      })
    }
    loadPPTContent()

    if (process.env.NODE_ENV === 'production') {
      window.onbeforeunload = () => false
    }

    onMounted(() => {
      snapshotStore.initSnapshotDatabase()
      mainStore.setAvailableFonts()
    })
    const isPc = computed(() => isPC())

    return {
      screening,
      isPc
    }
  },
})
</script>

<style lang="scss">
#main {
  height: 100%;
}
</style>