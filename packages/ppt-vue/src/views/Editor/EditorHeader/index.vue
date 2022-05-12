<template>
  <div class="editor-header">
    <div class="left">
      <Dropdown :trigger="['click']">
        <div class="menu-item">
          <IconFolderClose /> <span class="text">文件</span>
        </div>
        <template #overlay>
          <Menu>
            <MenuItem @click="exportJSON()">导出 JSON</MenuItem>
            <MenuItem @click="exportPPTX()">导出 PPTX</MenuItem>
          </Menu>
        </template>
      </Dropdown>
      <Dropdown :trigger="['click']">
        <div class="menu-item">
          <IconEdit /> <span class="text">编辑</span>
        </div>
        <template #overlay>
          <Menu>
            <MenuItem @click="undo()">撤销</MenuItem>
            <MenuItem @click="redo()">重做</MenuItem>
            <MenuItem @click="createSlide()">添加页面</MenuItem>
            <MenuItem @click="deleteSlide()">删除页面</MenuItem>
            <MenuItem @click="toggleGridLines()">{{ showGridLines ? '关闭网格线' : '打开网格线' }}</MenuItem>
            <MenuItem @click="resetSlides()">重置幻灯片</MenuItem>
          </Menu>
        </template>
      </Dropdown>
      <Dropdown :trigger="['click']">
        <div class="menu-item">
          <IconPpt /> <span class="text">演示</span>
        </div>
        <template #overlay>
          <Menu>
            <MenuItem @click="enterScreeningFromStart()">从头开始</MenuItem>
            <MenuItem @click="enterScreening()">从当前页开始</MenuItem>
          </Menu>
        </template>
      </Dropdown>
      <Dropdown :trigger="['click']">
        <div class="menu-item">
          <IconHelpcenter /> <span class="text">帮助</span>
        </div>
        <template #overlay>
          <Menu>
            <MenuItem @click="goIssues()">意见反馈</MenuItem>
            <MenuItem @click="hotkeyDrawerVisible = true">快捷键</MenuItem>
          </Menu>
        </template>
      </Dropdown>
    </div>

    <div class="right">
      <Button v-if="favored" type="primary" @click="toggleFavoriteState">已收藏</Button>
      <Button v-else @click="toggleFavoriteState">收藏</Button>
      <Button @click="goToHome" style="
      margin-right: 10px;
      margin-left: 10px;">返回首页</Button>
      <Button type="primary" @click="savePPT">保存</Button>
      <Tooltip :mouseLeaveDelay="0" title="幻灯片放映">
        <div class="menu-item" @click="enterScreening()">
          <IconPpt size="18" fill="#666" style="margin-top: 2px;" />
        </div>
      </Tooltip>
      <a href="https://github.com/okbug/college-design" target="_blank">
        <div class="menu-item">
          <IconGithub size="18" fill="#666" />
        </div>
      </a>
    </div>

    <Drawer width="320" placement="right" :visible="hotkeyDrawerVisible" @close="hotkeyDrawerVisible = false">
      <HotkeyDoc />
    </Drawer>

    <FullscreenSpin :loading="exporting" tip="正在导出..." />
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/store'
import useScreening from '@/hooks/useScreening'
import useSlideHandler from '@/hooks/useSlideHandler'
import useHistorySnapshot from '@/hooks/useHistorySnapshot'
import useExport from '@/hooks/useExport'
import useImport from '@/hooks/useImport'
import useParams from '@/hooks/useRoute'
import { getPPTContent, updatePPTContent } from '@/api/docs'

import HotkeyDoc from './HotkeyDoc.vue'
import { getUserInfo, setUserFavoriteState } from '@/api'

export default defineComponent({
  name: 'editor-header',
  components: {
    HotkeyDoc,
  },
  setup() {
    const params = useParams()
    const favored = ref<boolean>(false);
    const userInfo = ref()
    const { id } = params;
    const title = ref('');
    getPPTContent(id).then(res => {
      title.value = (res as any).title as string;
      console.log(res, '123131221323')
    })
    const getDocFavoriteState = () => {
      if (!id) return;
      getUserInfo().then(res => {
        if (!res.data) return;
        const { favorite } = res.data;
        if (favorite) {
          favored.value = favorite.some((item: { id: string }) => id === item.id);
        }

        userInfo.value = res.data

      })

    }
    getDocFavoriteState()
    const mainStore = useMainStore()
    const { showGridLines } = storeToRefs(mainStore)

    const { enterScreening, enterScreeningFromStart } = useScreening()
    const { createSlide, deleteSlide, resetSlides } = useSlideHandler()
    const { redo, undo } = useHistorySnapshot()
    const { exporting, exportJSON, exportPPTX } = useExport()

    const toggleGridLines = () => {
      mainStore.setGridLinesState(!showGridLines.value)
    }

    const hotkeyDrawerVisible = ref(false)

    const goIssues = () => {
      window.open('https://github.com/okbug/coolege-design/issues')
    }

    const savePPT = () => {
      const slide = useImport();
      const { id } = useParams()
      updatePPTContent({
        content: slide.value,
        id,
        title: title.value,
      }).then(() => {
        message.success('保存成功')
      })
    };

    const goToHome = () => {
      location.href = location.origin
    }

    const toggleFavoriteState = () => {
      console.log(userInfo.value);
      setUserFavoriteState(userInfo.value.username, id, !favored.value)
        .then(res => {
          console.log(res);
          if (res) favored.value = !favored.value;
          message.success('操作成功')
        })
        .catch(() => {
          message.error('操作失败')
        })
    }

    return {
      redo,
      undo,
      showGridLines,
      hotkeyDrawerVisible,
      exporting,
      enterScreening,
      enterScreeningFromStart,
      createSlide,
      deleteSlide,
      toggleGridLines,
      resetSlides,
      exportJSON,
      exportPPTX,
      goIssues,
      savePPT,
      goToHome,
      favored,
      userInfo,
      toggleFavoriteState,
    }
  },
})
</script>

<style lang="scss" scoped>
.editor-header {
  background-color: #fff;
  user-select: none;
  border-bottom: 1px solid $borderColor;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}

.left,
.right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-item {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding: 0 10px;
  transition: background-color $transitionDelay;
  cursor: pointer;

  .text {
    margin-left: 4px;
  }
}

.left .menu-item:hover {
  background-color: $lightGray;
}
</style>