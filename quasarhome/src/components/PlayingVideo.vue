<template>
    <q-card class="q-dialog-plugin" style="height: auto;width: auto;background-color: rgba(0,0,0,0.7)">
        <vue3VideoPlay ref="vue3VideoPlayRef" style="object-fit: cover;height: auto;width: 100%;max-height: 95vh;"
            :style="{ width: systemProperty.PlayMode !== 800 ? '90%' : '100%' }" v-bind="optionsPC" @ended="playNext(1)" />
        <q-card-actions align="left">
            <q-btn flat style="color: #59d89d" :label="playing.Actress?.substring(0, 8)"
                @click=" Keyword = playing.Actress; fetchSearch()" />
            <q-btn flat style="color: goldenrod" :label="playing.Code?.substring(0, 8)"
                @click="Keyword = playing.Code; fetchSearch()" />
            <q-input v-model="Keyword" :dense="true" clearable @update:model-value="fetchSearch" />
            <q-btn color="primary" :label="systemProperty.PlayMode !== 800 ? '小屏' : '全屏'" @click="changeMode" />
            <q-btn color="primary" label="关闭" @click="closeThis" />
            <q-btn v-if="!view.playlist" color="primary" label="上一个" @click="playNext(-1)" />
            <q-btn v-if="!view.playlist" color="primary" label="下一个" @click="playNext(1)" />
            <q-btn color="primary" label="隐藏" @click="hideThis" />
        </q-card-actions>
    </q-card>
    <div style="overflow: auto;background-color: rgba(0, 0, 0, 0.4);">
        <span style="color:orange;overflow: hidden;">{{ playing.Title }}</span>
        <div class="row justify-center">
            <q-card class="q-ma-sm example-item" v-for="item  in view.playList" :key="item.Id">
                <q-img fit="cover" easier draggable :src="getPng(item.Id)" class="item-img"
                    @click="systemProperty.Playing = item">
                    <div
                        style="padding:0;margin:0;background-color: rgba(0, 0, 0, 0);display: flex;flex-direction: row;justify-content: space-between;width: 100%;">
                        <div @click.stop="() => { }"
                            style="display: flex;flex-direction: column;justify-content: flex-start;width: fit-content;">
                            <q-chip square color="red" text-color="white" v-for="tag in item.Tags" :key="tag"
                                style="margin-left: 0px;padding: 0 4px;">
                                <span @click="fetchSearch(tag)">{{ tag }}</span>
                            </q-chip>
                        </div>
                        <q-chip @click.stop="() => { }" square color="green" text-color="white"
                            style="width: fit-content;margin-right: 0px;padding:  0 6px;">
                            <span> {{ item.MovieType }}</span>
                        </q-chip>

                    </div>
                </q-img>
                <q-card-section style="overflow: auto;padding: 4px;">
                    <div class="text-subtitle2" style="overflow: auto;padding: 0;"><q-chip @click.stop="() => { }" square
                            color="green" text-color="white" style="padding: 0px 4px;">
                            {{ item.SizeStr }}
                        </q-chip>{{ item.Title }}</div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>
<script setup>
import vue3VideoPlay from 'vue3-video-play'
import 'vue3-video-play/dist/style.css' // 引入css
import { useQuasar } from 'quasar'
import { computed, reactive, ref, watch } from 'vue';
import { useSystemProperty } from '../stores/System';
import { getFileStream } from './utils/images';
import { getPng } from './utils/images';
import { SearchAPI } from './api/searchAPI';
const systemProperty = useSystemProperty()
const vue3VideoPlayRef = ref(null)
const playing = computed(() => {
    return systemProperty.Playing || {}
})

const Keyword = ref('')

const drawerRight = computed(() => {
    return systemProperty.drawerRight
})

const $q = useQuasar()
const view = reactive({
    playList: []
})

watch(playing, (v) => {
    if (v && v.Id) {
        optionsPC.src = getFileStream(v.Id)
        vue3VideoPlayRef.value.play()
        if (!Keyword.value) {
            Keyword.value = v.Actress
            fetchSearch()
        }
    } else {
        optionsPC.src = null
    }
})

watch(drawerRight, (v) => {
    if (v && !view.playList) {
        fetchSearch()
    }
})

const fetchSearch = async () => {
    const data = await SearchAPI({ ...systemProperty.FileSearchParam, Page: 1, PageSize: 999, Keyword: Keyword.value });
    console.log(data);
    view.playList = data.Data
    if (!systemProperty.Playing) {
        systemProperty.Playing = view.playList[0]
    }
};

const hideThis = () => {
    systemProperty.drawerRight = false
}

const changeMode = () => {
    if (systemProperty.PlayMode == 800) {
        systemProperty.PlayMode = $q.screen.width
    } else {
        systemProperty.PlayMode = 800
    }
}

const closeThis = () => {
    hideThis()
    systemProperty.Playing = null
}

const playNext = (step) => {
    if (!view.playList) {
        return
    }
    for (let i = 0; i < view.playList.length; i++) {
        if (view.playList[i].Id === systemProperty.Playing?.Id) {
            if (i == view.playList.length - 1) {
                systemProperty.Playing = view.playList[0]
                return;
            } else {
                if (i + step <= 0) {
                    systemProperty.Playing = view.playList[0]
                    return;
                } else {
                    systemProperty.Playing = view.playList[i + step]
                    return;
                }
            }
        }
    }
};


const optionsPC = reactive({
    width: '100%', //播放器高度
    height: 'auto', //播放器高度
    color: '#409eff', //主题色
    title: null, //视频名称
    src: getFileStream(playing.value.Id), //视频源
    muted: false, //静音
    preload: 'false',
    webFullScreen: false,
    speedRate: ['1.0', '1.25', '1.5', '2.0'], //播放倍速
    autoPlay: false, //自动播放
    loop: false, //循环播放
    mirror: false, //镜像画面
    ligthOff: true, //关灯模式
    currentTime: 10,
    volume: systemProperty.videoOptions?.volume, //默认音量大小
    control: systemProperty.videoOptions?.control, //是否显示控制
    controlBtns: systemProperty.videoOptions?.controlBtns, //显示所有按钮,
});

</script>
<style lang="scss" scoped>
.example-item {
    width: 160px;
    height: auto;
    max-height: 320px;
    overflow: hidden;
}

.item-img {
    width: 160px;
    height: auto;
    max-height: 220px;
}
</style>