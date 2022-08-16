
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
const { more } = props
const emit = defineEmits(['loadMore'])
const onLoadMore = () => {
    console.log('loadMore', more);
    emit('loadMore')
}
</script>
<template>
    <Button v-if="more" @click="onLoadMore" block type="primary">加载</Button>
    <div style="margin-bottom:50px;"></div>
</template>