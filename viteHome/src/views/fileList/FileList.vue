<script setup lang="ts">
import { QueryFileList } from '../../api/file'
import { reactive } from 'vue'
const view = reactive<any>({
  modelList: {}
})
const postFileList = async (params: type) => {
  const res = await QueryFileList({sortType:'desc',sortField:'MTime'})
  console.log(res)
  if (res) {
    view.modelList = res
  }
}
postFileList()
</script>

<template>
  <h1>FileList</h1>
  <p>Welcome FileList </p>
  <ElButton @Click="postFileList">Click</ElButton>
  <p>{{ view.modelList }}</p>

</template>