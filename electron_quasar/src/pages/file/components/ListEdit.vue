<template>
  <q-dialog ref="dialogRef" @hide="dialogHide" @before-show="beforeShow">
    <q-card :class="{ 'card-q': !isMobile, 'card-q-mobile': isMobile }">
      <q-tabs
        alert
        ripple
        v-model="tab"
        style="background-color: rgba(0, 0, 0, 0.2)"
        align="justify"
        narrow-indicator
        @change="tabChange"
      >
        <q-tab name="filelist" label="批量操作"/>
        <q-tab name="setting" label="设置"/>
        <q-tab name="tasking" label="任务执行"/>
        <q-tab name="history" label="最近浏览"/>
      </q-tabs>
      <q-tab-panels v-model="tab" animated style="height: 100%; overflow: auto">
        <q-tab-panel name="filelist">
          <div class="q-mr-sm q-mb-sm row justify-left">
            <q-btn-toggle
              outline
              v-model="view.queryParam.MovieType"
              @update:model-value="fetchSearch()"
              toggle-color="primary"
              :options="MovieTypeSelects"
            />
            <q-btn
              class="q-ml-sm"
              v-if="view.queryParam.Page != 1"
              size="sm"
              color="primary"
              @click="nextPage(-1)"
            >上
            </q-btn>
            <q-btn
              class="q-ml-sm"
              size="sm"
              color="primary"
              @click="nextPage(1)"
            >下
            </q-btn
            >
          </div>
          <div class="q-mr-sm row justify-left">
            <q-btn
              class="q-mr-sm"
              color="amber"
              outline
              size="sm"
              glossy
              text-color="black"
              @click="selectAll"
            >{{ view.selectAll ? '不选' : '全选' }}
            </q-btn>
            <q-input
              label="..."
              v-model="view.queryParam.Keyword"
              :dense="true"
              filled
              clearable
              @update:model-value="fetchSearch()"
            />
            <q-btn
              class="q-mr-sm"
              size="sm"
              color="blue-6"
              icon="refresh"
              @click="refreshIndex"
            >刷新
            </q-btn
            >
            <q-btn-dropdown
              class="q-mr-sm"
              size="sm"
              label="设置"
              type="primary"
              color="teal"
              icon="ti-settings"
            >
              <q-list>
                <q-item
                  v-for="mt in MovieTypeOptions"
                  :key="mt.value"
                  v-close-popup
                  class="movieTypeSelectItem"
                >
                  <q-item-section @click="setTypeBySelector(mt.value)">
                    <q-item-label>{{ mt.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-btn-dropdown
              class="q-mr-sm"
              size="sm"
              label="标签"
              type="primary"
              color="teal"
              icon="ti-plus"
            >
              <div style="width: 300px">
                <q-btn
                  size="sm"
                  icon="ti-plus"
                  square
                  text-color="white"
                  color="red"
                  class="tag-item"
                  v-for="tag in view.settingInfo.Tags"
                  :key="tag"
                  :label="tag"
                  @click="addTagBySelector(tag)"
                />
              </div>
            </q-btn-dropdown>
            <q-btn
              outline
              class="q-mr-sm"
              size="sm"
              color="red"
              icon="delete"
              @click="deleteBySelector"
            >删除
            </q-btn
            >
            <q-btn
              outline
              class="q-mr-sm"
              size="sm"
              color="red"
              icon="cpoy"
              @click="mergeFiles"
            >合并
            </q-btn
            >
            <q-btn
              outline
              class="q-mr-sm"
              size="sm"
              color="red"
              icon="cpoy"
              @click="copyAllCodes"
            >复制番号
            </q-btn
            >
          </div>
          <div class="q-gutter-sm q-mt-sm">
            <div
              v-for="item in view.resultData.Data"
              :key="item.Id"
              style="
                border: 1px dotted purple;
                padding: 2px;
                border-radius: 4px;
                background-color: rgba(0, 0, 0, 0.1);
              "
            >
              <div style="display: flex; flex-direction: column">
                <q-item-label>
                  <span
                    v-if="view.cutListIds.indexOf(item.Id) >= 0"
                    style="color: red"
                  >剪切中：：</span
                  >
                  {{ item.Title }}【{{ item.SizeStr }}】
                </q-item-label>
                <div style="display: flex; flex-direction: row" v-ripple>
                  <q-checkbox
                    size="sm"
                    v-model="view.selector"
                    :val="item.Id"
                    color="red"
                  />
                  <q-btn-dropdown
                    class="q-mr-sm"
                    size="sm"
                    :label="item.MovieType"
                    type="primary"
                    color="blue-6"
                  >
                    <q-list>
                      <q-item
                        v-for="mt in MovieTypeOptions"
                        :key="mt.value"
                        v-close-popup
                        class="movieTypeSelectItem"
                      >
                        <q-item-section>
                          <q-item-label
                            @click="
                              commonExec(ResetMovieType(item.Id, mt.value))
                            "
                          >{{ mt.label }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                  <q-btn
                    outline
                    size="sm"
                    class="q-mr-sm"
                    color="amber"
                    glossy
                    text-color="black"
                    icon="delete"
                    @click="confirmDelete(item)"
                  />
                  <q-btn
                    outline
                    size="sm"
                    class="q-mr-sm"
                    @click="moveThis(item)"
                    icon="near_me"
                  />
                  <q-btn
                    outline
                    class="q-mr-sm"
                    size="sm"
                    icon="open_in_new"
                    @click="commonExec(OpenFileFolder(item.Id))"
                  />
                  <q-btn
                    outline
                    size="sm"
                    class="q-mr-sm"
                    icon="ti-pencil-alt2"
                    @click="item.showCut = true"
                  ></q-btn>
                  <q-btn
                    outline
                    size="sm"
                    class="q-mr-sm"
                    color="green"
                    @click="toMp4(item)"
                  >toMp4
                  </q-btn
                  >
                  <q-btn
                    outline
                    class="q-mr-sm"
                    size="sm"
                    color="brown-5"
                    icon="wifi_protected_setup"
                    v-if="!item.MovieType || item.MovieType == '无'"
                    @click="commonExec(SyncFileInfo(item.Id))"
                  />
                </div>
                <div style="color: red" v-if="item.Tags">
                  点击删除：
                  <q-btn
                    color="red"
                    flat
                    size="sm"
                    v-for="ta in item.Tags"
                    :key="ta"
                    @click="commonExec(CloseTag(item.Id, ta), true)"
                  >
                    {{ `${ta}` }}
                  </q-btn>
                </div>
                <div
                  v-if="item.showCut"
                  style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    background-color: antiquewhite;
                    border-radius: 12px;
                    padding: 4px;
                  "
                >
                  开始：
                  <q-input
                    style="width: 40px"
                    v-model:model-value="cutParam.sH"
                  ></q-input>
                  <q-input
                    style="width: 40px"
                    v-model:model-value="cutParam.sM"
                  ></q-input>
                  <q-input
                    style="width: 40px"
                    v-model:model-value="cutParam.sS"
                  ></q-input>
                  结束：
                  <q-input
                    style="width: 40px"
                    v-model:model-value="cutParam.eH"
                  ></q-input>
                  <q-input
                    style="width: 40px"
                    v-model:model-value="cutParam.eM"
                  ></q-input>
                  <q-input
                    style="width: 40px"
                    v-model:model-value="cutParam.eS"
                  ></q-input>
                  <q-btn
                    size="sm"
                    color="black"
                    type="primary"
                    @click="
                      cutThis(item);
                      item.showCut = false;
                    "
                    label="确认"
                  />
                  <q-btn
                    size="sm"
                    color="blue"
                    @click="item.showCut = false"
                    label="取消"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="setting">
          <q-field color="purple-12" label="Buttons（最佳5）" stack-label>
            <template v-slot:prepend>
              <q-icon name="event"/>
            </template>
            <template v-slot:control>
              <q-checkbox
                v-model="view.settingInfo.Buttons"
                v-for="item in buttonEnum"
                :key="item"
                :val="item"
                :label="item"
                color="teal"
                @update:model-value="updateButtons"
              />
            </template>
          </q-field>
          <q-field color="purple-12" label="主题切换" stack-label>
            <template v-slot:prepend>
              <q-icon name="event"/>
            </template>
            <template v-slot:control>
              <q-radio
                v-model="systemProperty.isDark"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                :val="true"
                label="暗黑"
              />
              <q-radio
                v-model="systemProperty.isDark"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                :val="false"
                label="自然"
              />
            </template>
          </q-field>
          <q-field color="purple-12" label="图鉴点击" stack-label>
            <template v-slot:prepend>
              <q-icon name="event"/>
            </template>
            <template v-slot:control>
              <q-radio
                v-model="systemProperty.goActressNewWidow"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                :val="true"
                label="新窗口"
              />
              <q-radio
                v-model="systemProperty.goActressNewWidow"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                :val="false"
                label="本地"
              />
            </template>
          </q-field>
          <q-field color="purple-12" label="Search点击" stack-label>
            <template v-slot:prepend>
              <q-icon name="event"/>
            </template>
            <template v-slot:control>
              <q-radio
                v-model="systemProperty.goSearchNewWidow"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                :val="true"
                label="新窗口"
              />
              <q-radio
                v-model="systemProperty.goSearchNewWidow"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                :val="false"
                label="本地"
              />
            </template>
          </q-field>
        </q-tab-panel>

        <q-tab-panel name="tasking">
          <q-toggle v-model="view.autoRefresh"></q-toggle>
          <q-list bordered separator>
            <q-expansion-item v-for="v in view.tasking" :key="v">
              <template v-slot:header>
                <q-item-section
                  :style="{ color: v.Status == '成功' ? 'green' : 'red' }"
                >
                  <div>{{ v.Name }}</div>
                  <div v-if="v.Start">
                    {{ `开始时间：${v.Start} ` }}
                    {{ ` 结束时间：${v.End} ` }}
                  </div>
                  <div class="row justify-between">
                    <div style="color: blue">
                      耗时：{{ showTimeUse(v.FinishTime, v.CreateTime) }}
                    </div>
                    开始时间：{{ new Date(v.CreateTime).toLocaleString() }}
                  </div>
                </q-item-section>
                <q-item-section side>
                  <div>
                    <q-btn
                      class="q-mr-sm"
                      :color="v.Status == '成功' ? 'green' : 'red'"
                    >{{ v.Type }}
                      {{ v.Status == '执行失败' ? '失败' : v.Status }}
                    </q-btn>
                  </div>
                </q-item-section>
              </template>
              <q-card>
                <q-card-section>
                  <div style="max-height: 20vh; overflow: auto">
                    {{ v.Log }}
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-tab-panel>
        <q-tab-panel name="history">
          <div
            style="
              margin-top: 0;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              height: 100%;
              overflow: auto;
            "
          >
            <div
              style="
                width: 50%;
                display: flex;
                flex-direction: column;
                overflow: auto;
              "
            >
              <span ripple flat
              >搜索记录
                <q-btn
                  ripple
                  flat
                  color="red"
                  @click="systemProperty.HistoryMap = []"
                >清空</q-btn
                ></span
              >
              <q-btn
                v-for="(his, idx) in browserHistoryMap"
                :key="his"
                color="blue"
                flat
                outline
                noCaps
                align="left"
                ripple
                size="sm"
                @click="goHistory(his)"
              >
                <div class="row q-gutter-sm justify-between">
                  <span style="color: orange"> {{ idx }}</span>
                  <span>{{ his.MovieType }}</span>
                  <span>{{ `第${his.Page}页，分${his.PageSize}页` }}</span>
                  <span
                  >{{ getLabelByValue(his.SortField, FieldEnum) }} /{{
                      getLabelByValue(his.SortType, DescEnum)
                    }}
                  </span>
                </div>
              </q-btn>
            </div>
            <div
              style="
                width: 50%;
                display: flex;
                flex-direction: column;
                overflow: auto;
              "
            >
              <span ripple flat
              >浏览记录
                <q-btn
                  ripple
                  flat
                  color="red"
                  @click="systemProperty.History = []"
                >清空</q-btn
                ></span
              >
              <q-btn
                v-for="his in browserHistory"
                :key="his"
                flat
                outline
                noCaps
                align="left"
                style="width: 100%"
                ripple
                size="sm"
                color="primary"
                @click="goHistory(his)"
              >
                <div class="row justify-evenly q-gutter-sm">
                  <span>{{ his.MovieType }}</span>
                  <span>{{ `第${his.Page}页，分${his.PageSize}页` }}</span>
                  <span>{{
                      ` ${getLabelByValue(
                        his.SortField,
                        FieldEnum
                      )}/${getLabelByValue(his.SortType, DescEnum)}`
                    }}</span>
                  <span style="color: orange">
                    {{ his.Keyword ? `搜：${his.Keyword} ` : ' ' }}</span
                  >
                  <span>
                    {{ date.formatDate(his.MTime, 'YYYY-MM-DD HH:mm:ss') }}
                  </span>
                </div>
              </q-btn>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {useQuasar, date} from 'quasar';
import {useDialogPluginComponent} from 'quasar';
import {reactive, ref, watch, computed} from 'vue';

import {
  DescEnum,
  FieldEnum,
  getLabelByValue,
  MovieTypeOptions,
} from '../../../components/utils';
import {buttonEnum} from '../../../components/model/Setting';
import {MovieTypeSelects} from '../../../components/utils';
import {
  ResetMovieType,
  SearchAPI,
  RefreshAPI,
  FileRename,
  DeleteFile,
  FilesMerge,
  SyncFileInfo,
  CutFile,
  TransferTasksInfo,
  TansferFile,
  CloseTag,
  AddTag,
} from '../../../components/api/searchAPI';
import {PostSettingInfo} from 'src/components/api/settingAPI';
import {useSystemProperty} from 'stores/System';
import {useRouter} from 'vue-router';
import {useClipboard} from '@vueuse/core';

const {resolve} = useRouter();

const $q = useQuasar();

const tab = ref('filelist');
const view = reactive({
  autoRefresh: true,
  selectAll: false,
  settingInfo: {},
  resultData: {},
  queryParam: {},
  selector: [],
  callback: null,
  cutListIds: [],
  tasking: {},
});


let timeFunc;
watch(
  () => tab.value,
  (v) => {
    if (v === 'tasking' && view.autoRefresh) {
      timeFunc = setInterval(fetchTasking, 2000);
    } else {
      clearInterval(timeFunc);
    }
  }
);

watch(
  () => view.autoRefresh,
  (v) => {
    if (v && tab.value === 'tasking') {
      timeFunc = setInterval(fetchTasking, 2000);
    } else {
      clearInterval(timeFunc);
    }
  }
);

const cutParam = reactive({
  sH: '00',
  sM: '00',
  sS: '00',
  eH: '99',
  eM: '00',
  eS: '00',
});

const systemProperty = useSystemProperty();
const browserHistory = computed(() => {
  return systemProperty.getHistory;
});

const browserHistoryMap = computed(() => {
  return systemProperty.getHistoryMap;
});

const isMobile = computed(() => {
  return $q.platform.is.mobile;
});



const tabChange = (v) => {
  console.log(v)
}

const goHistory = (item) => {
  const url = resolve({path: '/search', query: {...item}}).href;
  window.location.href = url;
  window.location.reload();
};

const showTimeUse = (end, start) => {
  return `${
    ((new Date(end).getFullYear() > 1000
          ? new Date(end)
          : new Date()
      ).getTime() -
      new Date(start).getTime()) /
    1000
  }`;
};


const fetchTasking = async () => {
  const res = await TransferTasksInfo();
  const listTasks = [];
  Object.keys(res.Data).forEach((key) => {
    const v = res.Data[key];
    v.Log = v.Log.replace(/\n/g, '<br>');
    listTasks.unshift(v);
  });
  view.tasking = listTasks;
};

const toMp4 = (item) => {
  if (view.cutListIds.indexOf(item.Id) < 0) {
    view.cutListIds.push(item.Id);
  }
  commonExec(TansferFile(item.Id));
};

const cutThis = (item) => {
  if (view.cutListIds.indexOf(item.Id) < 0) {
    view.cutListIds.push(item.Id);
  }
  commonExec(
    CutFile(
      item.Id,
      [cutParam.sH, cutParam.sM, cutParam.sS].join(':'),
      [cutParam.eH, cutParam.eM, cutParam.eS].join(':')
    )
  );
};

defineEmits([
  // REQUIRED; 需要明确指出
  // 组件通过 useDialogPluginComponent() 暴露哪些事件
  ...useDialogPluginComponent.emits,
]);

const selectAll = () => {
  view.selectAll = !view.selectAll;
  if (view.selectAll) {
    view.selector = view.resultData.Data.map((item) => item.Id);
  } else {
    view.selector = [];
  }
};

const setTypeBySelector = (value) => {
  if (view.selector && view.selector.length > 0) {
    view.selector.forEach((item) => {
      commonExec(ResetMovieType(item, value));
    });
  }
};
const deleteBySelector = () => {
  if (view.selector && view.selector.length > 0) {
    view.selector.forEach((item) => {
      commonExec(DeleteFile(item));
    });
  }
};


const mergeFiles = () => {
  if (view.selector && view.selector.length > 0) {
    commonExec(FilesMerge({files: view.selector, DeleteFlag: false}));
  }
};


const source = ref('Hello');
const {copy} = useClipboard({source});

const copyAllCodes = async () => {
  if (view.resultData.Data && view.resultData.Data.length > 0) {
    const str = view.resultData.Data.map((item) => {
      return item.Code;
    }).join(' ');
    await copy(str);
    $q.notify({message: `${str}`});
  }
};

const addTagBySelector = (value) => {
  if (view.selector && view.selector.length > 0) {
    view.selector.forEach((item) => {
      commonExec(AddTag(item, value));
    });
  }
};

const refreshIndex = async () => {
  await RefreshAPI();
  await fetchSearch();
};

const nextPage = (n) => {
  view.queryParam.Page = view.queryParam.Page + n;
  fetchSearch();
};

const fetchSearch = async () => {
  const data = await SearchAPI(view.queryParam);
  view.resultData = data;
};

const commonExec = async (exec) => {
  const {Code, Message} = await exec;
  console.log(Code, Message);
  if (Code != 200) {
    $q.notify({message: `${Message}`});
  } else {
    $q.notify({message: `${Message}`});
  }
};

const open = (data) => {
  const {queryParam, settingInfo, cb, tabName} = data;
  if (tabName) {
    tab.value = tabName;
  }
  if (queryParam) {
    view.queryParam = queryParam;
    view.queryParam.PageSize = 10;
  } else {
    view.queryParam = systemProperty.getSearchParam;
  }
  if (settingInfo) {
    view.settingInfo = settingInfo;
  } else {
    view.settingInfo = systemProperty.getSettingInfo;
  }
  view.callback = cb;
  dialogRef.value.show();
  fetchSearch();
};

const dialogHide = async () => {
  if (view.callback) {
    view.callback({settingInfo: view.settingInfo});
  }
  onDialogCancel();
  onDialogOK();
  onDialogHide();
  console.log('dialogHide');
};

const confirmDelete = (item) => {
  $q.dialog({
    title: item.Name,
    message: '确定删除吗?',
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      console.log('>>>> onOk');
      commonExec(DeleteFile(item.Id)).then(() => {
        for (let i = 0; i < view.resultData.Data.length; i++) {
          if (view.resultData.Data[i].Id == item.Id) {
            view.resultData.Data.splice(i, 1);
          }
        }
      });
    })
    .onCancel(() => {
      console.log('>>>> Cancel');
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

const moveThis = async (item) => {
  const res = await FileRename({...item, NoRefresh: true, MoveOut: true});
  console.log(res);
  if (res.Code == 200) {
    for (let i = 0; i < view.resultData.Data.length; i++) {
      if (view.resultData.Data[i].Id == item.Id) {
        view.resultData.Data.splice(i, 1);
      }
    }
    $q.notify({type: 'negative', message: res.Message});
  } else {
    $q.notify({type: 'negative', message: res.Message});
  }
};

const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} =
  useDialogPluginComponent();
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

const updateButtons = () => {
  if (view.callback) {
    PostSettingInfo(view.settingInfo);
    view.callback({settingInfo: view.settingInfo});
  }
};

const beforeShow = () => {
  console.log('beforeShow');
};

defineExpose({
  open,
});
</script>

<style>
.card-q {
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 70vw !important;
  max-width: 70vw !important;
}

.card-q-m {
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 100vw !important;
  max-width: 100vw !important;
}

.tag-item {
  margin: 2px 4px;
  padding: 1px 6px;
  border-radius: 8px;
}
</style>
