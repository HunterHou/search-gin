<template>
    <q-card class="q-dialog-plugin" style="width: auto; height: auto; background-color: rgba(0,0,0,0.7)">
        <vue3VideoPlay ref="vue3VideoPlayRef" style="object-fit: cover;height: auto;width: 100%;" v-bind="optionsPC"
            @ended="playNext(1)" />
        <q-card-actions align="left">
            <q-btn color="primary" :label="systemProperty.PlayMode !== 600 ? '小屏' : '全屏'" @click="changeMode" />
            <q-btn color="primary" label="关闭" @click="closeThis" />
            <q-btn color="primary" label="暂停" @click="stopThis" />
            <q-btn color="primary" label="播放" @click="playThis" />
            <q-btn color="primary" label="隐藏" @click="hideThis" />

            <q-btn v-if="!view.playlist" color="primary" label="上一个" @click="playNext(-1)" />
            <q-btn v-if="!view.playlist" color="primary" label="下一个" @click="playNext(1)" />
            <span style="color:orange;overflow: hidden;">{{ playing.Name?.substring(0, 50)
            }}</span>
        </q-card-actions>
    </q-card>
    <div class="row justify-center" style="overflow: auto;height: 40vh;background-color: rgba(0, 0, 0, 0.4);">
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
</template>
<script setup>
import vue3VideoPlay from 'vue3-video-play'
import 'vue3-video-play/dist/style.css' // 引入css
import { useQuasar } from 'quasar'
import { computed, reactive, ref, watch } from 'vue';
import { useSystemProperty } from '../stores/System';
import { getFileStream } from './utils/images';
import { getPng } from '../components/utils/images';
import { axios } from '../boot/axios';
const systemProperty = useSystemProperty()
const vue3VideoPlayRef = ref(null)
const playing = computed(() => {
    return systemProperty.Playing || {}
})

const $q = useQuasar()
const view = reactive({
    playList: []
})

watch(playing, (v) => {
    if (v) {
        optionsPC.src = getFileStream(v.Id)
        systemProperty.drawerRight = true
        playThis()
        fetchSearch(v.Actress)
    }
})

const fetchSearch = async (Keyword) => {
    const { data } = await axios.post('/api/movieList', { ...systemProperty.FileSearchParam, Page: 1, PageSize: 999, Keyword });
    console.log(data);
    view.playList = data.Data
};

const playThis = () => {
    vue3VideoPlayRef.value.play()
}
const hideThis = () => {
    systemProperty.drawerRight = false
}
const stopThis = () => {
    vue3VideoPlayRef.value.pause()
}

const changeMode = () => {
    if (systemProperty.PlayMode == 600) {
        systemProperty.PlayMode = $q.screen.width
    } else {
        systemProperty.PlayMode = 600
    }
}

const closeThis = () => {
    systemProperty.Playing = null
    systemProperty.drawerRight = false
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
    title: '', //视频名称
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
    width: 180px;
    height: auto;
    max-height: 320px;
    overflow: hidden;
}

.item-img {
    width: 180px;
    height: auto;
    max-height: 220px;
}
</style>