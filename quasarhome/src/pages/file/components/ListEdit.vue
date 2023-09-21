<template>
    <q-dialog ref="dialogRef" @hide="dialogHide" width="1200px">
        <q-card class="q-dialog-plugin q-pa-md" square style="width: 1200px;">
            <div class="q-px-sm q-mt-sm">
                批量操作 <q-btn class="q-mr-sm" size="sm" color="secondary" icon="refresh" @click="refreshIndex">刷新</q-btn>
            </div>
            <div class="q-gutter-sm">
                <q-list>
                    <q-item v-ripple v-for="item in view.resultData.Data" :key="item.Id">
                        <q-item-section avatar>
                            <q-checkbox v-model="view.selector" :val="item.Id" color="red" />
                        </q-item-section>
                        <q-item-section>
                            <div style="display: flex;flex-direction: row;">
                                <q-btn round  size="sm" color="amber" glossy text-color="black" icon="delete"
                                    @click="confirmDelete(item)" />
                                <q-btn round  size="sm" color="black" @click="moveThis(item)"
                                    icon="near_me" />
                                <q-btn-dropdown :label="item.MovieType" type="primary">
                                    <q-list>
                                        <q-item v-for="mt in MovieTypeOptions" :key="mt.value" v-close-popup
                                            class="movieTypeSelectItem">
                                            <q-item-section>
                                                <q-item-label
                                                    @click="item.MovieType = mt.value; commonExec(ResetMovieType(item.Id, mt.value))">{{
                                                        mt.label
                                                    }} </q-item-label>
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-btn-dropdown>

                            </div>
                            <q-item-label>{{ item.Name }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </q-card>
    </q-dialog>
</template>
  
<script setup>
import { useQuasar } from 'quasar'
import { useDialogPluginComponent } from 'quasar'
import { reactive } from 'vue';

import { MovieTypeOptions } from '../../../components/utils'
import { ResetMovieType, SearchAPI, RefreshAPI, FileRename, DeleteFile } from '../../../components/api/searchAPI'
// import { getJpg } from 'src/components/utils/images';

const $q = useQuasar()

const view = reactive({
    resultData: {},
    queryParam: {},
    selector: [],
    callback: null
})

defineEmits([
    // REQUIRED; 需要明确指出
    // 组件通过 useDialogPluginComponent() 暴露哪些事件
    ...useDialogPluginComponent.emits
])

const refreshIndex = async () => {
    await RefreshAPI()
    await fetchSearch()
}

const fetchSearch = async () => {
    const data = await SearchAPI(view.queryParam);
    view.resultData = data
};


const commonExec = async (exec) => {
    const { Code, Message } = await exec
    console.log(Code, Message)
    if (Code != 200) {
        $q.notify({ message: `${Message}` })
    } else {
        $q.notify({ message: `${Message}` })
    }
}

const open = (queryParam, cb) => {
    view.queryParam = queryParam
    view.callback = cb
    dialogRef.value.show()
    fetchSearch()
}

const dialogHide = async () => {
    if (view.callback) {
        await view.callback()
    }
    onDialogCancel()
    onDialogOK()
    onDialogHide()
}


const confirmDelete = (item) => {
    $q.dialog({
        title: item.Name,
        message: '确定删除吗?',
        cancel: true,
        persistent: true
    }).onOk(() => {
        console.log('>>>> onOk')
        commonExec(DeleteFile(item.Id))
    }).onCancel(() => {
        console.log('>>>> Cancel')
    }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
    })
}

const moveThis = async (item) => {
    const res = await FileRename({ ...item, NoRefresh: true, MoveOut: true });
    console.log(res)
    if (res.Code == 200) {
        $q.notify({ type: 'negative', message: res.Message })
    } else {
        $q.notify({ type: 'negative', message: res.Message })
    }
};

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - 用在 QDialog 上的 Vue ref 模板引用
// onDialogHide   - 处理 QDialog 上 @hide 事件的函数
// onDialogOK     - 对话框结果为 ok 时会调用的函数
//                    示例: onDialogOK() - 不带参数
//                    示例: onDialogOK({ /*.../* }) - 带参数
// onDialogCancel - 对话框结果为 cancel 时调用的函数

// 这是示例的内容，不是必需的
// const onOKClick = () => {
// REQUIRED！ 对话框的结果为 ok 时，必须调用 onDialogOK()  (参数是可选的)
// onDialogOK()
// 带参数的版本: onDialogOK({ ... })
// ...会自动关闭对话框
// }
defineExpose({
    open
})
</script>