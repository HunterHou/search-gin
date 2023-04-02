<template>
  <div ref="pagePress">
    <ElBacktop :bottom="100" style="width: 50px; height: 50px">
      <div class="up">UP</div>
    </ElBacktop>

    <ElButton
        style="position: fixed; bottom: 300px; z-index: 99; left: 5px"
        size="default"
        type="danger"
        round
        v-if="!loading && view.ResultCnt > queryParam.PageSize"
        @click="pageLoading(-1)"
    ><i class="el-icon-back"></i>上一頁
    </ElButton>
    <!-- 键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40 -->
    <ElButton
        v-if="!loading && view.ResultCnt > queryParam.PageSize"
        style="position: fixed; bottom: 300px; z-index: 99; right: 5px"
        size="default"
        type="danger"
        round
        @click="pageLoading(1)"
    >下一頁<i class="el-icon-right"></i>
    </ElButton>

    <div class="searchRow" :style="searchStyle">
      <ElRow :span="24">
        <ElCol :xl="2" :lg="2" :md="3" :sm="3" :xs="6">
          <ElButton
              type="success"
              size="default"
              :loading-icon="Eleme"
              :loading="refreshIndexFlag"
              @click="refreshIndex()"
          >
            扫 描
          </ElButton>
          <ElPopover
              placement="bottom-end"
              v-model="view.settingInfoShow"
              width="800px"
              trigger="click"
          >
            <template #reference>
              <ElLink> ({{ view.settingInfo.DirsCnt }})</ElLink>
            </template>
            <template #default>
              <h1 align="center">索引配置</h1>
              <div style="margin: 2px 2px">
                <ElRow>
                  <ElCol :span="20">
                    <ElRow>
                      <ElCol :span="4">
                        <span>定制按钮：</span>
                      </ElCol>
                      <ElCol :span="20">
                        <ElCheckboxGroup
                            v-model="view.settingInfo.Buttons"
                            size="large"
                        >
                          <ElCheckbox
                              v-for="item in buttonEnum"
                              :key="item"
                              :label="item"
                          >
                            {{ item }}
                          </ElCheckbox>
                        </ElCheckboxGroup>
                      </ElCol>
                    </ElRow>
                    <ElRow>
                      <ElCol :span="4">
                        <span>视频类型：</span>
                      </ElCol>
                      <ElCol :span="20">
                        <ElSelect
                            v-model="view.settingInfo.VideoTypes"
                            multiple
                            placeholder="请选择"
                            style="width: 90%"
                        >
                          <ElOption
                              v-for="item in view.settingInfo.Types"
                              :key="item"
                              :label="item"
                              :value="item"
                          >
                          </ElOption>
                        </ElSelect>
                      </ElCol>
                    </ElRow>
                    <ElRow>
                      <ElCol :span="4">
                        <span>扫描路径：</span>
                      </ElCol>
                      <ElCol :span="20">
                        <ElCheckbox
                            size="small"
                            :indeterminate="view.isIndeterminateDir"
                            v-model="view.settingCheckAll"
                            @change="handleCheckAllChange"
                        >全选
                        </ElCheckbox>
                        <ElCheckboxGroup
                            v-model="view.settingInfo.Dirs"
                            @change="handleCheckedCitiesChange"
                        >
                          <ElCheckbox
                              v-for="dir in view.settingInfo.DirsLib"
                              :label="dir"
                              :key="dir"
                          >{{ dir }}
                          </ElCheckbox>
                        </ElCheckboxGroup>
                      </ElCol>
                    </ElRow>
                  </ElCol>
                  <ElCol :span="4">
                    <ElButton
                        type="primary"
                        style="height: 50px; width: 120px"
                        @click="settingSubmit"
                    >提 交
                    </ElButton
                    >
                  </ElCol>
                </ElRow>
              </div>
            </template>
          </ElPopover>
        </ElCol>
        <ElCol :xl="1" :lg="1" :md="1" :sm="1" :xs="4">
          <ElCheckbox
              v-model="queryParam.OnlyRepeat"
              label="重"
              size="large"
              @change="onlyRepeatQuery()"
          />
        </ElCol>
        <ElCol :xl="3" :lg="3" :md="4" :sm="5" :xs="8">
          <ElRadioGroup
              v-model="queryParam.SortField"
              @change="refreshData"
              size="default"
          >
            <ElRadioButton label="Code">名</ElRadioButton>
            <ElRadioButton label="MTime">时</ElRadioButton>
            <ElRadioButton label="Size">容</ElRadioButton>
          </ElRadioGroup>
        </ElCol>
        <ElCol :xl="2" :lg="2" :md="4" :sm="4" :xs="6">
          <ElRadioGroup
              v-model="queryParam.SortType"
              @change="refreshData"
              size="default"
          >
            <ElRadioButton label="desc">倒</ElRadioButton>
            <ElRadioButton label="asc">正</ElRadioButton>
          </ElRadioGroup>
        </ElCol>
        <ElCol :xl="5" :lg="6" :md="8" :sm="10" :xs="16">
          <ElRadioGroup
              v-model="queryParam.MovieType"
              @change="refreshData"
              size="default"
          >
            <ElRadioButton label="">全</ElRadioButton>
            <ElRadioButton label="骑兵">骑</ElRadioButton>
            <ElRadioButton label="步兵">步</ElRadioButton>
            <ElRadioButton label="国产">国</ElRadioButton>
            <ElRadioButton label="斯巴达">欧</ElRadioButton>
            <ElRadioButton label="无">无</ElRadioButton>
          </ElRadioGroup>
        </ElCol>
        <ElCol :xl="3" :lg="3" :md="5" :sm="5" :xs="8">
          <div style="margin-left: 10px">
            <ElPopover
                :width="800"
                trigger="click"
                v-model:visible="tagPopover"
            >
              <template #reference>
                <ElButton type="success" text link style="margin-left: 10px"
                >标签
                </ElButton
                >
              </template>
              <div v-if="tagData && tagData.length > 0">
                <el-space wrap>
                  <el-link
                      v-for="tag in tagData"
                      :key="tag.Name"
                      class="d-tag"
                      :underline="false"
                  >
                    <el-tag
                        size="default"
                        :value="tag.Cnt"
                        @click="
                        tagPopover = false;
                        gotoSearch(tag.Name);
                      "
                    >
                      <el-badge :value="tag.Cnt" :max="999">
                        <span style="font-size: 10px">
                          <b
                          >{{ tag.Name }} (<i>{{ tag.SizeStr }}</i
                          >)
                          </b>
                        </span>
                      </el-badge>
                    </el-tag>
                  </el-link>
                </el-space>
              </div>
            </ElPopover>
            <ElPopover :width="400" trigger="hover">
              <template #reference>
                <ElButton type="danger" text link bg style="margin-left: 10px"
                >历史
                </ElButton
                >
              </template>
              <template #default>
                <div style="max-height: 600px; overflow: auto">
                  <div>
                    <ElLink
                        @click="
                        () => {
                          systemProperty.History = [];
                        }
                      "
                    >清空历史
                    </ElLink
                    >
                  </div>
                  <hr/>
                  <div>
                    <span
                        style="width: 80%; float: left"
                        v-for="(item, index) in systemProperty.History"
                        :key="index"
                    >
                      <ElButton link bg @click="gotoHistory(item)">
                        【{{ item.SortField }}-{{ item.SortType }}】-
                        {{ item.Page }}-{{ item.PageSize }}
                        {{ item.Keyword }}
                        -{{ item.MovieType }}
                      </ElButton>
                      <span style="color: blue">{{
                          useDateFormat(item.createTime, "MM月DD日 HH:MM:ss", {
                            locales: "zh-cn",
                          })
                        }}</span>
                    </span>
                  </div>
                </div>
              </template>
            </ElPopover>
            <ElButton :type="countTransferIng>0?'danger':'success'" @click="taskPop=!taskPop;fetchTransferTask()" text
                      link
                      style="margin-left: 10px"
            >执行任务({{ countTransferIng }})
            </ElButton>
          </div>
        </ElCol>
        <ElCol :xl="5" :lg="5" :md="10" :sm="18" :xs="24">
          <ElAutocomplete
              id="searchInput"
              style="min-width: 280px; width: auto"
              placeholder="请输入关键词"
              v-model="queryParam.Keyword"
              clearable
              size="default"
              @change="keywordChange"
              @select="selectSuggestion"
              :fetch-suggestions="fetchSuggestion"
              @keyup.enter.native="queryList"
          >
            <template #append>
              <ElButton
                  slot="append"
                  type="primary"
                  size="default"
                  icon="ElIcon-search"
                  @click="
                  () => {
                    queryParam.Page = 1;
                    queryList();
                  }
                "
              >Enter
              </ElButton>
            </template>
            <template #default="{ item }">
              <div class="value">{{ item }}</div>
            </template>
          </ElAutocomplete>
        </ElCol>
      </ElRow>
    </div>

    <div
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="ElIcon-loading"
        style="min-height: 650px; margin: 10px auto"
    >
      <ElSpace wrap>
        <div
            :class="isShowCover(view) ? 'list-item-cover' : 'list-item'"
            v-for="item in view.ModelList"
            :key="item.Id"
        >
          <div class="tag-area">
            <li
                v-for="tag in item.Tags"
                :key="tag"
                style="list-style-type: none"
            >
              <ElTag
                  closable
                  effect="dark"
                  :size="isShowCover(view) ? 'default' : 'default'"
                  @close="closeTag(item.Id, tag)"
              >
                <el-link :underline="false" plain @click="gotoSearch(tag)">
                  <span> {{ tag }}</span>
                </el-link>
              </ElTag>
            </li>
          </div>
          <ElPopover
              :teleported="true"
              placement="bottom-start"
              popperClass="tagPopover"
              width="auto"
              v-model="view.addTagShow"
              trigger="click"
              :auto-close="0"
          >
            <template #reference>
              <ElButton
                  :class="isShowCover(view) ? 'tag-buttom-cover' : 'tag-buttom'"
                  :size="isShowCover(view) ? 'default' : 'large'"
                  type="warning"
              >
                <b>
                  {{ item.MovieType }}
                </b>
              </ElButton>
            </template>
            <template #default>
              <div class="rightBtnPop">
                <div
                    v-if="!noMovieType(item.MovieType)"
                    style="max-width: 400px"
                >
                  <ElButton
                      type="warning"
                      plain
                      v-for="tag in view.settingInfo.Tags"
                      :key="tag"
                      style="margin: 1px 2px"
                      :disabled="!notContainTag(item.Tags, tag)"
                      @click="addTag(item.Id, tag)"
                  >
                    <span style="font-size: 12px">{{ tag }}</span>
                  </ElButton>
                  <br/><br/>
                  <ElAutocomplete
                      placeholder="新标签"
                      v-model="view.customerTag"
                      :fetch-suggestions="fetchTagsLib"
                      @select="handleSelectTag"
                      size="default"
                      style="width: 240px"
                  >
                    <template #append>
                      <ElButton
                          size="default"
                          type="primary"
                          :disabled="customerTagEmpty(view)"
                          @click="addCustomerTag(item.Id)"
                          style="font-size: 16px"
                      >加
                      </ElButton>
                    </template>
                    <template #default="{ item }">
                      <div v-if="item" style="font-size: 16px" class="value">
                        {{ item }}
                      </div>
                    </template>
                  </ElAutocomplete>
                </div>

                <div v-if="noMovieType(item.MovieType)" class="rightBtnPop">
                  <ElButton
                      plain
                      size="default"
                      @click="setMovieType(item.Id, 2)"
                  >
                    <i class="el-icon-bicycle icon-style" title="骑兵">骑兵</i>
                  </ElButton>
                  <ElButton
                      plain
                      size="default"
                      @click="setMovieType(item.Id, 1)"
                  >
                    <i class="el-icon-sunny icon-style" title="步兵">步兵</i>
                  </ElButton>
                  <ElButton
                      plain
                      size="default"
                      @click="setMovieType(item.Id, 4)"
                  >
                    <i class="el-icon-location icon-style" title="国产">国产</i>
                  </ElButton>
                  <ElButton
                      plain
                      size="default"
                      @click="setMovieType(item.Id, 3)"
                  >
                    <i class="el-icon-ship icon-style" title="欧美">斯巴达</i>
                  </ElButton>
                </div>
              </div>
            </template>
          </ElPopover>
          <ElCard
              class="ecard"
              shadow="always"
              :body-style="{
              padding: '0px',
              margin: '4px 2px',
            }"
          >
            <div
                v-if="item"
                :class="
                isShowCover(view) ? 'img-list-item-cover' : 'img-list-item'
              "
                @click="openInfoWindow(item.Id)"
            >
              <ElImage
                  style="height: 100%; z-index: 0"
                  :src="isShowCover(view) ? getJpg(item.Id) : getPng(item.Id)"
                  fit="fill"
              />
            </div>
            <div
                :style="{
                marginTop: '-40px',
                position: 'absolute',
                height: '40px',
                alignItems: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: isShowCover(view) ? '300px' : '200px',
                display: 'flex',
                justifyContent: 'flex-start',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              }"
            >
              <ElButton
                  plain
                  type="danger"
                  title="在线"
                  @click="cmenuPlay(item)"
                  :style="{ height: '35px', width: '35px' }"
              >
                <ElIcon>
                  <VideoPlay/>
                </ElIcon>
              </ElButton>
              <ElButton
                  type="primary"
                  plain
                  class="icon-button"
                  title="播放"
                  @click="playThis(item.Id)"
                  :style="{ height: '35px', width: '35px' }"
              >
                <ElIcon :size="25">
                  <VideoPlay/>
                </ElIcon>
              </ElButton>
            </div>

            <div
                class="image-tool"
                :style="{
                background: !noMovieType(item.MovieType)
                  ? ''
                  : 'rgb(239 251 219)',
              }"
            >
              <div class="tool-button">
                <ElButton
                    type="warning"
                    plain
                    class="icon-button"
                    title="图鉴"
                    v-if="
                    item.Actress &&
                    view.settingInfo.Buttons?.indexOf('图鉴') >= 0
                  "
                    @click="thisActress(item.Actress)"
                >
                  <ElIcon>
                    <UserFilled/>
                  </ElIcon>
                </ElButton>
                <ElButton
                    type="success"
                    plain
                    class="icon-button"
                    title="文件夹"
                    v-if="view.settingInfo.Buttons?.indexOf('文件夹') >= 0"
                    @click="openThisFolder(item.Id, 2)"
                >
                  <ElIcon>
                    <FolderOpened/>
                  </ElIcon>
                </ElButton>
                <ElButton
                    plain
                    type="success"
                    class="icon-button"
                    v-if="view.settingInfo.Buttons?.indexOf('编辑') >= 0"
                    title="编辑"
                    @click="editItem(item)"
                >
                  <ElIcon>
                    <Edit/>
                  </ElIcon>
                </ElButton>
                <ElButton
                    type="primary"
                    plain
                    class="icon-button"
                    v-if="view.settingInfo.Buttons?.indexOf('刮图') >= 0"
                    @click="getImageList(item.Id)"
                >
                  <ElIcon>
                    <Magnet/>
                  </ElIcon>
                </ElButton>
                <ElButton
                    v-if="view.settingInfo.Buttons?.indexOf('删除') >= 0"
                    type="danger"
                    plain
                    class="icon-button"
                    @click="deleteThis(item.Id)"
                >
                  <ElIcon>
                    <DeleteFilled/>
                  </ElIcon>
                </ElButton>
                <ElButton
                    v-if="view.settingInfo.Buttons?.indexOf('移动') >= 0"
                    type="danger"
                    plain
                    class="icon-button"
                    title="移动"
                    @click="moveThis(item)"
                >
                  <ElIcon>
                    <Position/>
                  </ElIcon>
                </ElButton>
                <ElButton
                    v-if="view.settingInfo.Buttons?.indexOf('转换') >= 0 && item.FileType!=='mp4'"
                    type="danger"
                    plain
                    class="icon-button"
                    title="转MP4"
                    @click="TransferToMp4(item.Id)"
                >
                  <ElIcon>
                    <Switch/>
                  </ElIcon>
                </ElButton>


                <ElButton
                    v-if="noMovieType(item.MovieType)"
                    type="danger"
                    plain
                    class="icon-button"
                    title="同步"
                    @click="syncThis(item.Id)"
                >
                  <ElIcon>
                    <Refresh/>
                  </ElIcon>
                </ElButton>
                <ElButton
                    type="info"
                    plain
                    class="icon-button"
                    v-if="7 < view.showIconNum && notQiBing(item.MovieType)"
                    title="骑兵"
                    @click="setMovieType(item.Id, 2)"
                >
                  <ElIcon>
                    <Bicycle/>
                  </ElIcon>
                </ElButton>
                <ElButton
                    plain
                    type="info"
                    class="icon-button"
                    v-if="notBuBing(item.MovieType) && 7 < view.showIconNum"
                    title="步兵"
                    @click="setMovieType(item.Id, 1)"
                >
                  <ElIcon>
                    <Sunny/>
                  </ElIcon>
                </ElButton>
                <ElButton
                    plain
                    type="info"
                    class="icon-button"
                    v-if="notNative(item.MovieType) && 7 < view.showIconNum"
                    title="国产"
                    @click="setMovieType(item.Id, 4)"
                >
                  <ElIcon>
                    <Location/>
                  </ElIcon>
                </ElButton>
                <ElButton
                    plain
                    type="info"
                    class="icon-button"
                    v-if="notSiBaDa(item.MovieType) && 7 < view.showIconNum"
                    title="欧美"
                    @click="setMovieType(item.Id, 3)"
                >
                  <ElIcon>
                    <Ship/>
                  </ElIcon>
                </ElButton>
                <ElPopover
                    placement="top-start"
                    width="280px"
                    :visible="item.toolShow"
                    trigger="hover"
                    :auto-close="0"
                >
                  <template #reference>
                    <ElButton
                        plain
                        type="success"
                        v-if="view.settingInfo.Buttons?.indexOf('更多') >= 0"
                        class="icon-button"
                        @click="previewPicture(item.Id)"
                    >
                      <ElIcon>
                        <QuestionFilled/>
                      </ElIcon>
                    </ElButton>
                  </template>
                  <template #default>
                    <ElCard
                        class="cmenu"
                        :body-style="{ padding: '4px' }"
                        @click="
                        () => {
                          item.toolShow = false;
                        }
                      "
                    >
                      <div>
                        <ElRow>
                          <ElButton
                              type="success"
                              plain
                              class="cmenuButton"
                              @click="cmenuPlay(item)"
                          >
                            <ElIcon>
                              <VideoPlay/>
                            </ElIcon>
                          </ElButton>
                          <ElButton
                              type="warning"
                              plain
                              class="cmenuButton"
                              @click="playThis(item.Id)"
                          >
                            <ElIcon>
                              <VideoPlay/>
                            </ElIcon>
                          </ElButton>
                          <ElButton
                              type="success"
                              plain
                              class="cmenuButton"
                              @click="javCode(item.Code)"
                          >
                            <ElIcon>
                              <Share/>
                            </ElIcon>
                          </ElButton>
                          <ElButton
                              type="success"
                              plain
                              @click="openThisFolder(item.Id, 2)"
                          >
                            <ElIcon>
                              <FolderOpened/>
                            </ElIcon>
                          </ElButton>
                          <ElButton
                              plain
                              type="success"
                              @click="previewPicture(item.Id)"
                          >
                            <ElIcon>
                              <QuestionFilled/>
                            </ElIcon>
                          </ElButton>
                        </ElRow>
                        <ElRow>
                          <ElButton
                              plain
                              class="cmenuButton"
                              @click="setMovieType(item.Id, 2)"
                          >
                            <ElIcon>
                              <Bicycle/>
                            </ElIcon>
                          </ElButton>
                          <ElButton
                              plain
                              class="cmenuButton"
                              @click="setMovieType(item.Id, 1)"
                          >
                            <ElIcon>
                              <Sunny/>
                            </ElIcon>
                          </ElButton>
                          <ElButton
                              plain
                              class="cmenuButton"
                              @click="setMovieType(item.Id, 4)"
                          >
                            <ElIcon>
                              <Location/>
                            </ElIcon>
                          </ElButton>
                          <ElButton
                              plain
                              class="cmenuButton"
                              @click="setMovieType(item.Id, 3)"
                          >
                            <ElIcon>
                              <Ship/>
                            </ElIcon>
                          </ElButton>
                        </ElRow>
                        <ElRow>
                          <ElButton
                              type="primary"
                              plain
                              class="cmenuButton"
                              @click="getImageList(item.Id)"
                          >
                            <ElIcon>
                              <Magnet/>
                            </ElIcon>
                          </ElButton>
                          <ElButton
                              plain
                              type="success"
                              @click="editItem(item)"
                          >
                            <ElIcon>
                              <Edit/>
                            </ElIcon>
                          </ElButton>
                          <ElButton
                              type="warning"
                              plain
                              class="cmenuButton"
                              @click="syncThis(item.Id)"
                          >
                            <ElIcon>
                              <Refresh/>
                            </ElIcon>
                          </ElButton>
                          <ElButton
                              type="danger"
                              plain
                              class="cmenuButton"
                              @click="deleteThis(item.Id)"
                          >
                            <ElIcon>
                              <DeleteFilled/>
                            </ElIcon>
                          </ElButton>
                          <ElButton
                              type="danger"
                              plain
                              class="cmenuButton"
                              title="移动"
                              @click="moveThis(item)"
                          >
                            <ElIcon>
                              <Position/>
                            </ElIcon>
                          </ElButton>
                        </ElRow>
                      </div>
                    </ElCard>
                  </template>
                </ElPopover>
              </div>

              <div class="context-text" style="font-size: 13px">
                <ElPopover
                    placement="top"
                    width="400px"
                    trigger="hover"
                    :auto-close="1"
                    :show-after="500"
                >
                  <template #reference>
                    <span>
                      <ElLink
                          v-if="item.Actress"
                          style="color: green"
                          @click="copy(item.Actress)"
                      >{{ item.Actress }}
                      </ElLink>
                      <ElDivider
                          v-if="item.Actress"
                          direction="vertical"
                      ></ElDivider>
                      <ElLink
                          v-if="item.Code"
                          style="color: orange"
                          @click="copy(item.Code)"
                      >{{ codeFormat(item.Code) }}</ElLink
                      >
                      <ElDivider
                          v-if="item.Code"
                          direction="vertical"
                      ></ElDivider>
                      <span style="color: red" @click="copy(item.Title)">
                        {{ item.SizeStr }}</span
                      >
                    </span>
                  </template>
                  <template #default>
                    <ElRow>
                      <ElLink
                          v-if="item.Actress"
                          style="color: green"
                          @click="copy(item.Actress)"
                      >{{ item.Actress }}
                      </ElLink>
                      <ElDivider
                          v-if="item.Actress"
                          direction="vertical"
                      ></ElDivider>
                      <ElLink
                          v-if="item.Code"
                          style="color: orange"
                          @click="copy(item.Code)"
                      >{{ item.Code }}
                      </ElLink
                      >
                      <ElDivider
                          v-if="item.Code"
                          direction="vertical"
                      ></ElDivider>
                      {{
                        useDateFormat(item.MTime, "YYYY-MM-DD HH:MM", {
                          locales: "zh-cn",
                        })
                      }}
                      <ElDivider
                          v-if="item.Code"
                          direction="vertical"
                      ></ElDivider>
                      <span style="color: red" @click="copy(item.Title)"
                      >【{{ item.SizeStr }}】</span
                      >
                    </ElRow>
                    <ElRow>
                      <span
                          style="
                          margin-bottom: 30px;
                          margin-top: 30px;
                          margin-left: 30px;
                          margin-right: 30px;
                        "
                      >
                        {{ item.Name }}</span
                      >
                    </ElRow>
                    <ElRow>
                      <span style="font-size: 12px; color: darkred">
                        {{ item.Title }}</span
                      >
                    </ElRow>
                  </template>
                </ElPopover>
                <span> &nbsp;{{ item.Name }}</span>
              </div>
            </div>
          </ElCard>
        </div>
      </ElSpace>
      <ElPagination
          class="pageTool"
          v-model:currentPage="queryParam.Page"
          v-model:page-size="queryParam.PageSize"
          :page-sizes="[10, 12, 16, 30, 50, 200]"
          layout="sizes, prev, pager, next, jumper"
          :total="view.ResultCnt"
          :background="true"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
      <div class="totalRow">
        <ElRow :gutter="24">
          <ElButton type="danger" size="default" @click="changeScreen">{{
              !isFullscreen ? "全屏" : "还原"
            }}
          </ElButton>
          <ElDivider direction="vertical"></ElDivider>
          <el-radio-group v-model="showStyle" size="default">
            <el-radio-button label="cover">封面</el-radio-button>
            <el-radio-button label="post">海报</el-radio-button>
          </el-radio-group>
          <ElDivider direction="vertical"></ElDivider>
          <span v-if="!running" style="color: red">运行异常</span>
          <ElDivider v-if="!running" direction="vertical"></ElDivider>
          <span> 总：{{ view.TotalSize }}({{ view.TotalCnt }}) </span>
          <ElDivider direction="vertical"></ElDivider>
          <span> 搜：{{ view.ResultSize }}({{ view.ResultCnt }}) </span>
          <div v-if="isPlaying">
            <ElLink
                type="success"
                plain
                size="large"
                @click="view.videoVisible = true"
                :underline="false"
                style="font-size: 16px"
            >
              <ElButton
                  type="success"
                  plain
                  size="large"
                  loading
                  :link="true"
              />
              {{ view.contextmenuTarget.Code }} -
              {{ view.contextmenuTarget.Actress }}
            </ElLink>
            <ElLink
                type="danger"
                plain
                @click="closePlayVideo"
                :underline="false"
                style="font-size: 16px"
            >
              关闭
            </ElLink>
          </div>
        </ElRow>
      </div>
    </div>
  </div>


  <ElDialog :width="windowWidth>100?'80vw':'500px'"
            :title="`执行任务(${Object.keys(view.transferTask).length-countTransferIng}/${Object.keys(view.transferTask).length})`"
            draggable
            v-model="taskPop" destroy-on-close
            @before-close="(done)=>{taskPop=false;done()}">
    <template #default>
      <div style="height: 60vh;overflow: auto;padding:12px;border-radius: 3%;background-color: blanchedalmond">
        <ElRow v-for="(item, index) in view.transferTask"
               :key="index"
               style="border-bottom: 1px dodgerblue dotted;display: flex;flex-direction: row;flex-wrap: nowrap">
          <span
              :style="{width:'5rem',textAlign:'left',color:item.Status=='成功'?'green':(item.Status==='等待'?'grey':'red')}">
            {{
              item.Status
            }} {{
              item.Status === '等待' ? '' : (((new Date(item.FinishTime).getTime() > 0 ? new Date(item.FinishTime) : new Date()) - new Date(item.CreateTime)) / 1000).toFixed(0) + 's'
            }}
          </span>
          <span
              style="text-align:left;line-height: 1rem;white-space: nowrap;overflow: hidden">
            {{ item.Name }}
          </span>
        </ElRow>
      </div>
    </template>
  </ElDialog>

  <ElDialog
      title="文件信息"
      v-model="view.dialogFormItemVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
  >
    <ElForm
        label-position="right"
        :model="view.formItem"
        size="large"
        label-width="18%"
    >
      <ElFormItem label="类型">
        <el-radio-group
            v-model="view.formItem.MovieType"
            @change="formMovieTypeChange(view)"
            size="large"
        >
          <el-radio-button label="">无</el-radio-button>
          <el-radio-button label="骑兵">骑</el-radio-button>
          <el-radio-button label="步兵">步</el-radio-button>
          <el-radio-button label="国产">国</el-radio-button>
          <el-radio-button label="斯巴达">欧</el-radio-button>
        </el-radio-group>
      </ElFormItem>
      <ElFormItem label="图鉴">
        <ElInput v-model="view.formItem.Actress" autocomplete="off"></ElInput>
      </ElFormItem>
      <ElFormItem label="编码">
        <ElInput v-model="view.formItem.Code" autocomplete="off"></ElInput>
      </ElFormItem>
      <ElFormItem label="文件名称">
        <ElInput
            type="textarea"
            v-model="view.formItem.Name"
            autocomplete="off"
        ></ElInput>
      </ElFormItem>
      <ElFormItem label="标签">
        <ElTag
            v-for="tag in view.formItem.Tags"
            :key="tag"
            effect="dark"
            closable
            style="margin-right: 8px"
            type=""
            size="large"
            @close="removeFormTag(tag)"
        >
          {{ tag }}
        </ElTag>
        <ElAutocomplete
            placeholder="新标签"
            v-model="view.customerTag"
            :fetch-suggestions="fetchTagsLib"
            @select="handleSelectTag"
            size="small"
            style="width: 160px"
        >
          <template #append>
            <ElButton
                size="default"
                type="primary"
                :disabled="customerTagEmpty(view)"
                @click="addThisCustomerTag"
                style="font-size: 12px"
            >加
            </ElButton>
          </template>
          <template #default="{ item }">
            <div v-if="item" style="font-size: 12px" class="value">
              {{ item }}
            </div>
          </template>
        </ElAutocomplete>
      </ElFormItem>
    </ElForm>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" size="large" @click="editMoveout"
      >移动到图鉴
      </el-button
      >
      <el-button size="large" @click="view.dialogFormItemVisible = false"
      >取 消
      </el-button
      >
      <el-button type="primary" size="large" @click="editItemSubmit"
      >确 定
      </el-button
      >
    </div>
  </ElDialog>
  <ElDialog
      width="66%"
      :modal="true"
      v-model="view.dialogVisible"
      :before-close="
      () => {
        innerVisibleFalse();
        view.dialogVisible = false;
      }
    "
      :destroy-on-close="true"
  >
    <div v-if="view.formItem">
      <div style="margin-top: -40px">
        <ElImage
            :src="getJpg(view.formItem.Id)"
            style="
            margin: 1px auto;
            width: auto;
            min-height: 200px;
            max-height: 500px;
          "
            @click="previewPicture(view.formItem.Id)"
        />
        <ElRow :gutter="24">
          <ElCol :span="4" tyle="text-align:right"> YY：</ElCol>
          <ElCol :span="16" tyle="text-align:left">
            <a
                href="javascript:void(0);"
                @click="javSearch(view.formItem.Actress)"
            >
              <span>{{ view.formItem.Actress }}</span></a
            >
          </ElCol>
        </ElRow>
        <ElRow :gutter="24">
          <ElCol :span="4" tyle="text-align:left"> Code</ElCol>
          <ElCol :span="16">
            <a href="javascript:void(0);" @click="javCode(view.formItem.Code)"
            ><span>{{ view.formItem.Code }}</span></a
            >
          </ElCol>
        </ElRow>
        <ElRow :gutter="24">
          <ElCol :span="4" tyle="text-align:right"> 大小：</ElCol>
          <ElCol :span="8" v-if="view.formItem.Tags" tyle="text-align:right">
            <ElTag
                v-for="tag in view.formItem.Tags"
                :key="tag"
                effect="dark"
                style="margin-right: 8px"
                type=""
                size="large"
            >
              {{ tag }}
            </ElTag>
          </ElCol>
          <ElCol :span="8">
            <span @click="gotoContext(view.formItem.Id)"
            >【{{ view.formItem.SizeStr }}】</span
            >
            <span>{{
                useDateFormat(view.formItem.MTime, "YYYY-MM-DD HH:MM:ss")
              }}</span>
          </ElCol>
        </ElRow>
        <ElRow :gutter="20">
          <ElCol :span="4">
            <span>源名：</span>
          </ElCol>
          <ElCol :span="16">
            <span>{{ view.formItem.Title }}</span>
          </ElCol>
        </ElRow>
        <ElRow :gutter="20">
          <ElCol :span="4">
            <span>源址：</span>
          </ElCol>
          <ElCol :span="16">
            <span>{{ view.formItem.Path }}</span>
          </ElCol>
        </ElRow>
        <el-divider></el-divider>
      </div>
    </div>
  </ElDialog>
  <teleport to="body">
    <div
        v-show="view.innerVisible"
        class="imageBloswerList"
        @click="innerVisibleFalse"
    >
      <div
          v-for="(item, index) in view.sourceList"
          :key="index"
          style="display: flex; margin: 1px auto"
      >
        <ElImage
            style="
            min-width: 1200px;
            width: auto;
            margin: 0 auto;
            opacity: 9;
            z-index: 9999;
          "
            :src="item"
        >
          @click.stop="innerVisibleFalse"
        </ElImage>
      </div>
    </div>
  </teleport>
  <teleport to="body">
    <div v-show="view.videoVisible" class="playDiv" id="videoDiv">
      <vue3VideoPlay
          ref="vue3VideoPlayRef"
          :style="{
          'object-fit': 'fill',
        }"
          v-bind="optionsPC"
          @volumechange="volumechange"
      />

      <div style="background-color: antiquewhite">
        <div
            style="
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            background-color: antiquewhite;
          "
        >
          <el-space spacer="|" wrap>
            <ElButton type="primary" @click="hiddenPlayVideo">隐藏</ElButton>
            <ElButton type="primary" @click="closePlayVideo">关闭</ElButton>
            <ElButton type="primary" @click="fullPlayVideo">满屏</ElButton>
            <ElButton type="primary" @click="moreTag = !moreTag">更多</ElButton>
            <ElTag
                v-for="item in view.contextmenuTarget.Tags"
                key="default"
                type="danger"
                size="large"
                style="margin-left: 0.5rem"
                @click="queryRelation(item)"
            >
              {{ item }}
            </ElTag>

            <el-link :underline="false" type="success">{{
                view.contextmenuTarget.Code
              }}
            </el-link>
            <el-link
                type="warning"
                size="large"
                style="margin-left: 0.5rem"
                @click="queryRelation(view.contextmenuTarget.Actress)"
            >
              {{ view.contextmenuTarget.Actress }}
            </el-link
            >
            <el-link :underline="false" type="success">{{
                view.contextmenuTarget.Name
              }}
            </el-link>
          </el-space>
        </div>
        <ElRow v-if="moreTag">
          <el-space spacer="|" wrap>
            <el-link
                type="warning"
                v-for="item in view.settingInfo.Tags"
                key="default"
                size="large"
                :underline="false"
                style="margin-left: 0.5rem"
                @click="queryRelation(item)"
            >
              {{ item }}
            </el-link
            >
          </el-space>
        </ElRow>
        <div style="margin: 10px auto">
          <ElSpace wrap size="default">
            <ElCard
                v-for="play in view.playlist"
                :key="play"
                :body-style="{ padding: '8px' }"
                style="width: 200px; height: auto"
                @click="startPlayVideo(play)"
            >
              <ElImage :src="getPng(play.Id)"></ElImage>
              <span
                  class="context-text"
                  style="
                  height: 3rem;
                  overflow: hidden;
                  word-break: break-all;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                "
              >{{ play.Name }}</span
              >
            </ElCard>
          </ElSpace>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import {
  AddTag,
  CloseTag,
  DeleteFile,
  DownImageList,
  FileRename,
  FindFileInfo,
  HeartBeatQuery,
  OpenFileFolder,
  PlayMovie,
  QueryDirImageBase64,
  QueryFileList,
  RefreshIndex,
  ResetMovieType,
  SyncFileInfo,
  TansferFile,
  TransferTasksInfo,
} from "@/api/file";
import {PostSettingInfo} from "@/api/setting";

import {useSystemProperty} from "@/store/System";
import {getFileStream, getJpg, getPng, getTempImage,} from "@/utils/ImageUtils";
import {ResultList} from "@/utils/ResultResponse";
import {Eleme} from "@element-plus/icons-vue";
import {
  onKeyStroke,
  useClipboard,
  useDateFormat,
  useTextSelection,
  useWindowScroll,
  useWindowSize,
} from "@vueuse/core";
import {ElMessage, ElMessageBox,} from "element-plus";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {MovieModel, MovieQuery} from ".";
import {
  customerTagEmpty,
  fetchSuggestion,
  fetchTagsLib,
  formItemTagsChange,
  formMovieTypeChange,
  javCode,
  javSearch,
  notBuBing,
  notContainTag,
  notNative,
  notQiBing,
  notSiBaDa,
  volumechange,
} from "@/views/fileList/fileList";
import {TagSizeMap} from "@/api/home";

import "vue3-video-play/dist/style.css";
import "./filelist.css";
import {useRoute, useRouter} from "vue-router";
import {buttonEnum, SettingInfo} from "@/views/settting/index";

const thisRoute = useRoute();
const {replace} = useRouter();

const selectText = useTextSelection();
const {y: windowScrollHheight} = useWindowScroll();
const pagePress = ref(null);


const running = ref(true);
const tagPopover = ref(false);
const moreTag = ref(false);
const loading = ref(false);
const tagData = ref<any>([]);
const refreshIndexFlag = ref(false);
const showStyle = ref("post");
const systemProperty = useSystemProperty();
const source = ref("");
const {copy, text} = useClipboard({source});
const {width: windowWidth, height: windowHeight} = useWindowSize();

const searchStyle = ref({});

const element = document.documentElement;
const isFullscreen = computed(() => {
  return systemProperty.isFullscreen;
});
const changeScreen = () => {
  if (isFullscreen.value) {
    if (element.requestFullscreen && element.requestFullscreen) {
      document.exitFullscreen();
    }
  } else {
    element.requestFullscreen();
  }
  systemProperty.isFullscreen = !systemProperty.isFullscreen;
};

const loadTagSize = async () => {
  const res = await TagSizeMap();
  if (res) {
    tagData.value = (res as any).splice(0, 60);
  }
};

const view = reactive<any>({
  videoUrl: null,
  playlist: [],
  videoVisible: false,
  videoClose: false,
  innerVisible: false,
  formItem: new MovieModel(),
  dialogFormItemVisible: false,
  contextmenuTarget: {},
  addTagShow: false,
  settingInfo: new SettingInfo(),
  showIconNum: 6,
  ModelList: [],
  ResultCnt: 0,
  allPage: 1,
  transferTask: {}
});

const queryParam = reactive<MovieQuery>(new MovieQuery());

const optionsPC = reactive({
  width: "1200px", //播放器高度
  height: "700px", //播放器高度
  color: "#409eff", //主题色
  title: "", //视频名称
  src: "", //视频源
  muted: false, //静音
  preload: "false",
  webFullScreen: false,
  speedRate: ["1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: true, //循环播放
  mirror: false, //镜像画面
  ligthOff: true, //关灯模式
  volume: systemProperty.videoOptions.volume, //默认音量大小
  control: systemProperty.videoOptions.control, //是否显示控制
  controlBtns: systemProperty.videoOptions.controlBtns, //显示所有按钮,
});

//监控剪切板变化
watch(text, (newtext) => {
  ElMessage.warning("已复制：" + newtext);
});
// 任务弹窗升起 1秒 更新一下信息
const timeFunc = ref(null)
const taskPop = ref(false);
watch(taskPop, (newValue, oldValue) => {
  console.log(taskPop, newValue, oldValue)
  if (newValue) {
    clearInterval(timeFunc.value)
    timeFunc.value = setInterval(fetchTransferTask, 1000)
  } else {
    clearInterval(timeFunc.value)
    timeFunc.value = setInterval(fetchTransferTask, 10000)
  }
})


watch(windowWidth, (newWidth) => {
  let newHeight = (newWidth * 9) / 16;
  if (newHeight > windowHeight.value) {
    newHeight = windowHeight.value;
  }
  optionsPC.width = newWidth - 20 + "px";
  optionsPC.height = newHeight - 14 + "px";
});
watch(windowHeight, (newHeight) => {
  const newWidth = (newHeight * 16) / 9;
  optionsPC.width = newWidth - 20 + "px";
  optionsPC.height = newHeight - 14 + "px";
});
watch(windowScrollHheight, () => {
  if (windowScrollHheight.value > 50) {
    searchStyle.value = {
      top: "1px",
      width: "100%",
      zIndex: 100,
      background: "white",
      opacity: 1,
      bgColor: "white",
      position: "fixed",
    };
  } else searchStyle.value = {};
});
watch(selectText.text, (newVal) => {
  if (newVal && newVal.length > 3) {
    // queryParam.Keyword = newVal;
  }
});

onKeyStroke(["`"], (e) => {
  refreshIndex();
});
onKeyStroke(["Enter"], (e) => {
  queryList();
});

const fullScreen = ref(true);
const vue3VideoPlayRef = ref(null);
const isPlaying = ref(false);

const previewPicture = (id: string) => {
  loadDirInfo(id, true);
  view.innerVisible = true;
};


const fetchTransferTask = async () => {
  const res = await TransferTasksInfo("")
  const keys = Object.keys(res.Data)
  view.transferTask = {}
  for (let i = keys.length - 1; i >= 0; i--) {
    const key = keys[i]
    view.transferTask[key] = res.Data[key]
  }
}


const countTransferIng = computed(() => {
  return Object.keys(view.transferTask)?.filter(item => view.transferTask[item].Status === '执行中' || view.transferTask[item].Status === '等待').length
})

const fullPlayVideo = () => {
  if (fullScreen.value) {
    optionsPC.width = windowWidth.value - 20 + "px";
    optionsPC.height = windowHeight.value - 14 + "px";
  } else {
    optionsPC.width = windowWidth.value * 0.988 + "px";
    optionsPC.height = windowHeight.value * 0.988 + "px";
  }
  fullScreen.value = !fullScreen.value;
};

const hiddenPlayVideo = () => {
  view.videoVisible = false;
};

const closePlayVideo = () => {
  view.videoVisible = false;
  view.videoClose = false;
  optionsPC.src = null;
  isPlaying.value = false;
};

const queryRelation = async (keywords) => {
  const pageSize = 999;
  queryParam.Keyword = keywords;
  const palyParam = {
    ...queryParam,
    PageSize: pageSize,
    Page: 1,
  };
  const res = await QueryFileList(palyParam);
  const model = res as unknown as ResultList;
  view.playlist = [];
  view.playlist = [...model.Data];
};

const startPlayVideo = (item: MovieModel) => {
  view.videoClose = true;
  view.contextmenuTarget = item;
  optionsPC.title = item.Name;
  optionsPC.src = getFileStream(item.Id);
  vue3VideoPlayRef.value.play();
  queryRelation(item.Actress);
  fullPlayVideo();
  isPlaying.value = true;
  view.videoVisible = true;
};

const innerVisibleFalse = () => {
  view.innerVisible = false;
};

const noMovieType = (type: string) => {
  if (!type || type === "无") {
    return true;
  }
  return false;
};

const cmenuPlay = async (item?) => {
  if (item) {
    view.contextmenuTarget = item;
  }
  view.videoVisible = true;
  startPlayVideo(view.contextmenuTarget);
};

const codeFormat = (code: string) => {
  if (code && code.length >= 11) {
    const newCode = code.slice(0, 10) + "...";
    return newCode;
  }
  return code;
};

const gotoContext = (id: string) => {
  // console.log("gotoContext", id);
};

const removeFormTag = (tag: string) => {
  const idx = view.formItem.Tags.indexOf(tag);
  view.formItem.Tags.splice(idx, 1);
  view.formItem.Name = view.formItem.Name.replaceAll(tag, "");
  formItemTagsChange(view);
};

const addThisCustomerTag = () => {
  if (!view.formItem.Tags) {
    view.formItem.Tags = [];
  }
  view.formItem.Tags.push(view.customerTag);
  view.customerTag = undefined;
  formItemTagsChange(view);
};

const editItem = (item: MovieModel) => {
  view.formItem = item;
  view.dialogFormItemVisible = true;
};

const editMoveout = async () => {
  view.formItem.MoveOut = true;
  await editItemSubmit();
  view.formItem.MoveOut = false;
};

const editItemSubmit = async () => {
  const {Id, Name, Code, Actress, Tags, MoveOut} = view.formItem;
  let code = Code.trim();
  if (code && code.indexOf("-") < 0) {
    code = "-" + code;
  }
  let name = "";
  if (Actress.length != 0) {
    name += "[" + Actress.trim() + "]";
  }
  if (code.length != 0) {
    name += " [" + code.trim() + "]";
  }
  const arr = Name.trim().split(".");
  const arrLength = arr.length;
  for (let idx = 0; idx < arrLength; idx++) {
    const str = arr[idx];
    if (idx == arrLength - 1) {
      name += "." + str;
    } else if (idx == 0) {
      const strNew = str.replace(str.charAt(0), str.charAt(0).toUpperCase());
      name += strNew;
    } else {
      const strNew = str.replace(str.charAt(0), str.charAt(0).toUpperCase());
      name += " " + strNew;
    }
  }
  const param = {
    Id,
    Name: name,
    Code: code,
    Actress,
    MoveOut,
    Title: arr[0],
    NoRefresh: true,
  };
  const res = await FileRename(param);
  if (res.Code == 200) {
    view.formItem = {};
    view.dialogFormItemVisible = false;
    refreshIndex();
  } else {
    ElMessage.error(res.Message);
  }
};

const moveThis = async (item) => {
  const res = await FileRename({...item, NoRefresh: true, MoveOut: true});
  if (res.Code == 200) {
    ElMessage.success(res.Message);
    refreshData;
  } else {
    ElMessage.error(res.Message);
  }
};

const loadSettingInfo = async () => {
  const res = systemProperty.getSettingInfo;
  if (res) {
    view.settingInfo = {
      DirsCnt: res.Dirs?.length,
      ...res,
      Buttons: res.Buttons || [],
    };
  }
};

const handleCheckAllChange = (val) => {
  view.settingInfo.Dirs = val ? view.settingInfo.DirsLib : [];
  view.isIndeterminateDir = false;
};

const handleCheckedCitiesChange = (value) => {
  let checkedCount = value.length;
  view.settingCheckAll = checkedCount === view.settingInfo.Dirs.length;
  view.isIndeterminateDir =
      checkedCount > 0 && checkedCount < view.settingInfo.Dirs.length;
};

const settingSubmit = async () => {
  const postForm = {...view.settingInfo};
  const res = await PostSettingInfo(postForm);
  if (res.Code === 200) {
    view.settingInfoShow = false;
    ElMessage.success(res.Message);
  } else {
    ElMessage.error(res.Message);
  }
};

const gotoSearch = (tag: string) => {
  queryParam.Keyword = tag;
  queryList();
};

const addTag = async (clickId, title) => {
  const res = await AddTag(clickId, title);
  if (res.Code == 200) {
    view.addTagShow = false;
    ElMessage.success(res.Message);
    refreshIndex();
    //  replace({ path: thisRoute.path, query: { ...queryParam } });
  } else {
    ElMessage.error(res.Message);
  }
};

const addCustomerTag = (clickId: string) => {
  addTag(clickId, view.customerTag);
  view.addTagShow = false;
  view.customerTag = "";
};
const handleSelectTag = (item: string) => {
  view.customerTag = item;
};
const closeTag = async (clickId: string, title: string) => {
  const res = await CloseTag(clickId, title);
  if (res.Code == 200) {
    ElMessage.success(res.Message);
    refreshIndex();
    //  replace({ path: thisRoute.path, query: { ...queryParam } });
  } else {
    ElMessage.error(res.Message);
  }
};

const refreshData = async (params?: any) => {
  let title = queryParam.Keyword;
  replace({path: thisRoute.path, query: {...queryParam}});
  systemProperty.syncSearchParam(queryParam);
  if (queryParam.Keyword && queryParam.Keyword !== "") {
  } else {
    title = "文件";
    queryParam.Page = view.allPage;
  }
  document.title = title;

  const res = await QueryFileList(queryParam);

  if (res) {
    loading.value = false;
    const model = res as unknown as ResultList;
    model &&
    model.Data &&
    model.Data.map((item) => {
      if (item.Code == item.Actress) {
        item.Code = "";
        item.Actress = "";
      }
      if (item.Code.lastIndexOf("-") == item.Code.length - 1) {
        item.Code = item.Code.substring(0, item.Code.length - 1);
      }
      if (item.Code.indexOf("-") == 0) {
        item.Code = item.Code.substring(1, item.Code.length);
      }
      item.name = item.Name.trim();
      item.Name = item.Name.replace("[-" + item.Code + "]", "");
      item.Name = item.Name.replace("[" + item.Code + "-]", "");
      item.Name = item.Name.replace("[" + item.Code + "]", "");
      item.Name = item.Name.replace("[" + item.Actress + "]", "");
    });
    view.ModelList = model.Data;
    view.TotalCnt = model.TotalCnt;
    view.ResultCnt = model.ResultCnt;
    view.CurCnt = model.CurCnt;
    view.TotalPage = model.TotalPage;
    view.TotalSize = model.TotalSize;
    view.ResultSize = model.ResultSize;
    view.CurSize = model.CurSize;
  }
};

const queryList = async (params?: any) => {
  view.ModelList = [];
  loading.value = true;
  await refreshData(params);
  loading.value = false;
};

const selectSuggestion = (item) => {
  queryParam.Keyword = item;
  refreshData();
};

const pageLoading = (num: number) => {
  if (queryParam.Page + num <= 0) {
    queryParam.Page = 1;
  }
  queryParam.Page += num;
  if (!queryParam.Keyword) {
    view.allPage = queryParam.Page;
  }
  queryList();
};

const onlyRepeatQuery = () => {
  // queryParam.OnlyRepeat = true;
  queryList();
};

const isShowCover = (view) => {
  if (showStyle.value == "cover") {
    view.showIconNum = 10;
    return true;
  }
  view.showIconNum = 6;
  return false;
};

const openInfoWindow = async (id: string) => {
  const res = await FindFileInfo(id);
  if (res && res.Id) {
    view.formItem = res;
    view.contextmenuTarget = res;
    view.dialogVisible = true;
  }
};

const loadDirInfo = async (id: string, loading: boolean) => {
  view.sourceList = [];
  const res = await QueryDirImageBase64(id);
  if (res && res.length > 0) {
    view.imageList = [];
    for (let i = 0; i < res.length; i++) {
      if (
          res[i].FileType === "jpg" ||
          res[i].FileType === "png" ||
          res[i].FileType === "gif"
      ) {
        // view.imageList.push(res[i].ImageBase);
        view.imageList.push(getTempImage(res[i].Id));
      }
    }
    if (loading) {
      view.sourceList = view.imageList;
    }
  }
};

const playThis = async (id: string) => {
  const res = await PlayMovie(id);
  if (res.Code === 200) {
    ElMessage.success(res.Message);
  } else {
    ElMessage.error(res.Message);
  }
};

const TransferToMp4 = async (id: string) => {
  const res = await TansferFile(id);
  if (res.Code === 200) {
    ElMessage.success(res.Message);
    fetchTransferTask()
  } else {
    ElMessage.error(res.Message);
  }
};


const syncThis = async (id: string) => {
  const res = await SyncFileInfo(id);
  if (res.Code === 200) {
    ElMessage.success(res.Message);
  } else {
    ElMessage.error(res.Message);
  }
};

const gotoHistory = (history: MovieQuery) => {
  const {Page, PageSize, MovieType, SortField, SortType, Keyword} = history;
  queryParam.Page = Page;
  queryParam.PageSize = PageSize;
  queryParam.MovieType = MovieType;
  queryParam.SortField = SortField;
  queryParam.SortField = SortField;
  queryParam.SortType = SortType;
  queryParam.Keyword = Keyword;
  queryList();
};
const addFavorite = (history: MovieQuery) => {
  systemProperty.addFavorite(history);
};
const setMovieType = async (id: string, typeId: number) => {
  const movieType =
      typeId == 4
          ? "国产"
          : typeId == 3
              ? "斯巴达"
              : typeId == 1
                  ? "步兵"
                  : "骑兵";
  const res = await ResetMovieType(id, movieType);
  if (res.Code === 200) {
    ElMessage.success(res.Message);
  } else {
    ElMessage.error(res.Message);
  }
};

const refreshIndex = async () => {
  refreshIndexFlag.value = true;
  const res = await RefreshIndex();
  if (res.Code === 200) {
    ElMessage.success(res.Message);
    setTimeout(() => {
      refreshData();
      refreshIndexFlag.value = false;
    }, 1000);
  } else {
    ElMessage.error(res.Message);
  }
};

const thisActress = async (actress: string) => {
  queryParam.Keyword = actress;
  queryParam.Page = 1;
  refreshData();
};

const openThisFolder = async (id: string, a?: number) => {
  const res = await OpenFileFolder(id);
  if (res.Code === 200) {
    ElMessage.success(res.Message);
  } else {
    ElMessage.error(res.Message);
  }
};

const heartBeat = async () => {
  HeartBeatQuery()
      .then((res) => {
        if (res.Code == 200) {
          running.value = true;
        } else {
          running.value = false;
          ElMessage.error("系统意外关闭，请重启");
        }
      })
      .catch(() => {
        running.value = false;
        ElMessage.error("系统意外关闭，请重启");
      });
};

const deleteThis = async (id: string) => {
  ElMessageBox.alert("此操作将永久删除该文件, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    callback: async (action) => {
      if (action == "confirm") {
        await DeleteFile(id)
            .then((res) => {
              if (res.Code === 200) {
                ElMessage.success(res.Message);
                refreshIndex();
              } else {
                ElMessage.error(res.Message);
              }
            })
            .catch(() => {
              ElMessage.error("已取消删除");
            });
      }
    },
  });
};

const getImageList = async (params: string) => {
  const res = await DownImageList(params);
  if (res.Code === 200) {
    ElMessage.success(res.Message);
  } else {
    ElMessage.error(res.Message);
  }
};

const keywordChange = (value) => {
  queryParam.Keyword = value;
  queryParam.Page = 1;
  queryList();
};

const handleCurrentChange = (page: number) => {
  queryParam.Page = page;
  if (!queryParam.Keyword) {
    view.allPage = page;
  }
  queryList();
};
const handleSizeChange = (pageSize: number) => {
  queryParam.PageSize = pageSize;
  queryList();
};

setInterval(heartBeat, 60000);
timeFunc.value = setInterval(fetchTransferTask, 10000);

onMounted(() => {
  loadSettingInfo();

  const {Page, PageSize, MovieType, SortField, SortType, Keyword} =
      thisRoute.query;
  if (Page && PageSize) {
    queryParam.Page = Number(Page);
    queryParam.PageSize = Number(PageSize);
    queryParam.MovieType = MovieType as string;
    queryParam.SortField = SortField as string;
    queryParam.SortType = SortType as string;
    queryParam.Keyword = Keyword as string;
  } else {
    queryParam.Page = systemProperty.getSearchParam?.Page;
    queryParam.PageSize = systemProperty.getSearchParam.PageSize;
    queryParam.MovieType = systemProperty.getSearchParam.MovieType;
    queryParam.SortField = systemProperty.getSearchParam.SortField;
    queryParam.SortType = systemProperty.getSearchParam.SortType;
    queryParam.Keyword = systemProperty.getSearchParam.Keyword;
  }
  loadTagSize();
  setTimeout(queryList, 200);
});
</script>

<style scoped>
.tool-button {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
}
</style>
