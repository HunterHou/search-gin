
<script setup lang="ts">
import {
    Button,
} from "vant";

const props = defineProps({
    more: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['loadMore'])
const onLoadMore = () => {
    emit('loadMore')
}
</script>
<template>
    <Button v-if="props.more" @click="onLoadMore" type="primary">加载</Button>
    <div style="margin-bottom:10px;height: 30px;"></div>
</template>