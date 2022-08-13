<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { GetSettingInfo } from '@/api/setting';
import { SettingInfo } from '../settting';

const view = reactive({
    form: new SettingInfo()
})
const loadData = async () => {
    const res = await GetSettingInfo()
    view.form = res;
}
onMounted(() => {
    loadData()
})
</script>
<template>
    <!-- <div v-html="view.form.SystemHtml">

    </div> -->
    <v-md-preview-html v-bind:html="view.form.SystemHtml" preview-class="vuepress-markdown-body"></v-md-preview-html>
</template>