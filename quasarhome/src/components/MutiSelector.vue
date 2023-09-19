<template>
    <div class="q-gutter-sm">
        <q-checkbox class="checkItem" v-model="value" v-for="item in props.options" :key="item" :val="item" :label="item"
            color="teal" @update:model-value="updateValue" />
    </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';

const emits = defineEmits(['update:model-value', 'onchange'])

const value = ref([])
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    },
    options: {
        type: Array,
        default: () => []
    },
})

const updateValue = (arr) => {
    emits("update:model-value", arr)
    emits("onchange", arr)
}
watch(() => props.modelValue, (e) => {
    value.value = e
})

onMounted(() => {
    value.value = props.modelValue
})
</script>
<style lang="scss">
.checkItem {
    width: 8rem;
}
</style>