<template>
  <div ref="pagePress">
    <ElBacktop :bottom="100" style="width: 50px; height: 50px">
      <div class="up">UP</div>
    </ElBacktop>
    <ElButton style="position: fixed; bottom: 300px; z-index: 99; left: 5px" size="default" type="danger" round
      v-if="!loading && view.ResultCnt > queryParam.PageSize" @click="pageLoading(-1)"><i class="el-icon-back"></i>上一頁
    </ElButton>
    <!-- 键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40 -->
    <ElButton v-if="!loading && view.ResultCnt > queryParam.PageSize"
      style="position: fixed; bottom: 300px; z-index: 99; right: 5px" size="default" type="danger" round
      @click="pageLoading(1)">下一頁<i class="el-icon-right"></i>
    </ElButton>

    <div class="searchRow" :style="searchStyle">
      <ElRow :span="24">
        <ElCol :span="2">
          <ElButton type="success" size="default" :loading-icon="Eleme" :loading="refreshIndexFlag"
            @click="refreshIndex()">
            扫 描
          </ElButton>
          <ElPopover placement="bottom-end" v-model="view.settingInfoShow" width="800px" trigger="click">
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
                        <span>视频类型：</span>
                      </ElCol>
                      <ElCol :span="20">
                        <ElSelect v-model="view.settingInfo.VideoTypes" multiple placeholder="请选择" style="width: 90%">
                          <ElOption v-for="item in view.settingInfo.Types" :key="item" :label="item" :value="item">
                          </ElOption>
                        </ElSelect>
                      </ElCol>
                    </ElRow>
                    <ElRow>
                      <ElCol :span="4">
                        <span>扫描路径：</span>
                      </ElCol>
                      <ElCol :span="20">
                        <el-checkbox size="small" :indeterminate="view.isIndeterminateDir"
                          v-model="view.settingCheckAll" @change="handleCheckAllChange">全选
                        </el-checkbox>
                        <el-checkbox-group v-model="view.settingInfo.Dirs" @change="handleCheckedCitiesChange">
                          <el-checkbox v-for="dir in view.settingInfo.DirsLib" :label="dir" :key="dir">{{ dir }}
                          </el-checkbox>
                        </el-checkbox-group>
                      </ElCol>
                    </ElRow>
                  </ElCol>
                  <ElCol :span="4">
                    <ElButton type="primary" style="height: 50px; width: 120px" @click="settingSubmit">提 交</ElButton>
                  </ElCol>
                </ElRow>
              </div>
            </template>
          </ElPopover>
        </ElCol>
        <ElCol :span="1">
          <ElLink style="color: green">
            <i :underline="true" class="ElIcon-zoom-out" title="重复" @click="onlyRepeatQuery()">重</i>
          </ElLink>
        </ElCol>
        <ElCol :span="3">
          <ElRadioGroup v-model="queryParam.SortField" @change="queryList" size="default">
            <ElRadioButton label="Code">名</ElRadioButton>
            <ElRadioButton label="MTime">时</ElRadioButton>
            <ElRadioButton label="Size">容</ElRadioButton>
          </ElRadioGroup>
        </ElCol>
        <ElCol :span="2">
          <ElRadioGroup v-model="queryParam.SortType" @change="queryList" size="default">
            <ElRadioButton label="desc">倒</ElRadioButton>
            <ElRadioButton label="asc">正</ElRadioButton>
          </ElRadioGroup>
        </ElCol>
        <ElCol :span="5">
          <ElRadioGroup v-model="queryParam.MovieType" @change="queryList" size="default">
            <ElRadioButton label="">~</ElRadioButton>
            <ElRadioButton label="骑兵">骑</ElRadioButton>
            <ElRadioButton label="步兵">步</ElRadioButton>
            <ElRadioButton label="国产">国</ElRadioButton>
            <ElRadioButton label="斯巴达">欧</ElRadioButton>
          </ElRadioGroup>
        </ElCol>

        <ElCol :span="5">
          <ElAutocomplete id="searchInput" style="min-width: 80px; width: auto" placeholder="请输入关键词"
            v-model="queryParam.Keyword" clearable size="default" @change="keywordChange" @select="selectSuggestion"
            :fetch-suggestions="fetchSuggestion" @keyup.enter.native="queryList">
            <template #append>
              <ElButton slot="append" type="primary" size="default" icon="ElIcon-search" @click="
                () => {
                  queryParam.Page = 1;
                  queryList();
                }
              ">Enter
              </ElButton>
            </template>
            <template #default="{ item }">
              <div class="value">{{ item }}</div>
            </template>
          </ElAutocomplete>
        </ElCol>
        <!-- x:{{ x }} y:{{ y }} {{ pressed}} -->
      </ElRow>
      <ElRow>
        <ElCol :span="3">
          <el-radio-group v-model="showStyle" size="small">
            <el-radio-button label="cover">封面</el-radio-button>
            <el-radio-button label="post">海报</el-radio-button>
          </el-radio-group>
        </ElCol>

        <ElCol :span="12">
          <span v-if="!running" style="color: red">运行异常</span>
          <ElDivider v-if="!running" direction="vertical"></ElDivider>
          <ElLink :underline="false" @click="
            (e) => {
              queryParam.Page = 1;
              queryParam.Keyword = '';
              queryList();
            }
          ">
            <span> 总：{{ view.TotalSize }}({{ view.TotalCnt }}) </span>
          </ElLink>

          <ElDivider direction="vertical"></ElDivider>
          <span> 搜：{{ view.ResultSize }}({{ view.ResultCnt }}) </span>
          <ElDivider direction="vertical"></ElDivider>
          <span> 页：{{ view.CurSize }}({{ view.CurCnt }})</span>
          <ElDivider direction="vertical"></ElDivider>
        </ElCol>
        <div v-if="isPlaying">
          <ElLink type="success" plain size="large" @click="view.videoVisible = true" :underline="false"
            style="font-size: 16px">
            播放中： 【
            <ElButton type="success" plain size="large" loading :link="true" />
            {{
                view.contextmenuTarget.Code + "-" + view.contextmenuTarget.Actress
            }}
            <ElButton type="success" plain size="large" loading :link="true" />
            】
          </ElLink>
          <ElLink type="danger" plain size="large" @click="closePlayVideo" :underline="false" style="font-size: 16px">
            关闭
          </ElLink>
        </div>
      </ElRow>
    </div>
    <ElCard id="cmenu" class="cmenu" v-show="cmenuShow" ref="target" :body-style="{ padding: '4px' }">
      <span>{{ view.contextmenuTarget.Code ?? view.contextmenuTarget.Name }}
      </span>
      &nbsp;&nbsp;
      <ElButton type="danger" @click="cmenuClose" circle>
        <ElIcon>
          <CloseBold />
        </ElIcon>
      </ElButton>
      <ElRow :span="2">
        <ElCol>
          <ElButton class="cmenuButton" @click="cmenuPlay">
            <ElIcon>
              <VideoPlay />
            </ElIcon>
            播放
          </ElButton>
        </ElCol>
      </ElRow>
      <ElRow :span="2">
        <ElCol>
          <ElButton class="cmenuButton" @click="cmenuSync">
            <ElIcon>
              <Refresh />
            </ElIcon>
            同步
          </ElButton>
        </ElCol>
      </ElRow>
      <ElRow :span="2">
        <ElCol>
          <ElButton class="cmenuButton" @click="cmenuCode">
            <ElIcon>
              <Share />
            </ElIcon>
            源链接
          </ElButton>
        </ElCol>
      </ElRow>

      <ElRow :span="2">
        <ElCol>
          <ElButton class="cmenuButton" @click="cmenuOpenDir">
            <ElIcon>
              <UserFilled />
            </ElIcon>
            打开
          </ElButton>
        </ElCol>
      </ElRow>
      <ElRow :span="2">
        <ElCol>
          <ElButton class="cmenuButton" @click="cmenuGetImageList">
            <ElIcon>
              <Magnet />
            </ElIcon>
            刮图
          </ElButton>
        </ElCol>
      </ElRow>
    </ElCard>

    <div v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="ElIcon-loading"
      style="min-height: 700px">
      <ElSpace wrap size="default">
        <div :class="isShowCover() ? 'list-item-cover' : 'list-item'" v-for="item in view.ModelList" :key="item.Id">
          <div class="tag-area">
            <li v-for="tag in item.Tags" :key="tag">
              <ElTag closable effect="dark" :size="isShowCover() ? 'small' : 'small'" @close="closeTag(item.Id, tag)">
                <el-link :underline="false" plain @click="gotoSearch(tag)">
                  <span> {{ tag }}</span>
                </el-link>
              </ElTag>
            </li>
          </div>
          <ElPopover placement="bottom-start" width="auto" v-model="view.addTagShow" trigger="click" :auto-close="0">
            <template #reference>
              <ElButton :class="isShowCover() ? 'tag-buttom-cover' : 'tag-buttom'"
                :size="isShowCover() ? 'default' : 'large'" type="warning" @click="
                  () => {
                    view.addTagShow = !view.addTagShow;
                  }
                ">
                <b>
                  {{ item.MovieType ? item.MovieType : "无" }}
                </b>
              </ElButton>
            </template>
            <template #default>
              <div v-if="item.MovieType != ''" style="max-width: 400px">
                <ElButton type="warning" plain v-for="tag in view.settingInfo.Tags" :key="tag" style="margin: 1px 2px"
                  :disabled="!notContainTag(item.Tags, tag)" @click="addTag(item.Id, tag)">
                  <span style="font-size: 12px">{{ tag }}</span>
                </ElButton>
                <br /><br />
                <ElAutocomplete placeholder="新标签" v-model="view.customerTag" :fetch-suggestions="fetchTagsLib"
                  @select="handleSelectTag" size="small" style="width: 240px">
                  <template #append>
                    <ElButton size="default" type="primary" :disabled="customerTagEmpty()"
                      @click="addCustomerTag(item.Id)" style="font-size: 16px">加
                    </ElButton>
                  </template>
                  <template #default="{ item }">
                    <div v-if="item" style="font-size: 16px" class="value">
                      {{ item }}
                    </div>
                  </template>
                </ElAutocomplete>
              </div>
              <div v-if="item.MovieType == ''" style="float: right">
                <ElButton plain size="default" @click="setMovieType(item.Id, 2)">
                  <i class="el-icon-bicycle icon-style" title="骑兵">骑兵</i>
                </ElButton>
                <ElButton plain size="default" @click="setMovieType(item.Id, 1)">
                  <i class="el-icon-sunny icon-style" title="步兵">步兵</i>
                </ElButton>
                <ElButton plain size="default" @click="setMovieType(item.Id, 4)">
                  <i class="el-icon-location icon-style" title="国产">国产</i>
                </ElButton>
                <ElButton plain size="default" @click="setMovieType(item.Id, 3)">
                  <i class="el-icon-ship icon-style" title="欧美">斯巴达</i>
                </ElButton>
              </div>
            </template>
          </ElPopover>
          <ElCard class="ecard" shadow="always" :body-style="{
            padding: '0px',
            margin: '4px 2px',
            background: item.MovieType ? '' : 'rgb(205, 138, 50)',
          }">
            <div v-if="item" :class="isShowCover() ? 'img-list-item-cover' : 'img-list-item'">
              <el-image style="width: 100%; height: 100%" :src="isShowCover() ? getJpg(item.Id) : getPng(item.Id)"
                @click="openInfoWindow(item.Id)" @contextmenu.prevent.native="
                  () => {
                    imageContextmenu(item);
                  }
                " fit="contain" lazy />
            </div>
            <div class="image-tool">
              <ElSpace wrap>
                <ElButton type="danger" plain class="icon-button" title="在线" @click="cmenuPlay(item)">
                  <ElIcon>
                    <VideoPlay />
                  </ElIcon>
                </ElButton>

                <ElButton type="primary" plain class="icon-button" title="播放" @click="playThis(item.Id)">
                  <ElIcon>
                    <VideoPlay />
                  </ElIcon>
                </ElButton>

                <ElButton type="warning" plain class="icon-button" title="优优" @click="thisActress(item.Actress)">
                  <ElIcon>
                    <UserFilled />
                  </ElIcon>
                </ElButton>
                <ElButton type="success" plain class="icon-button" title="文件夹" @click="openThisFolder(item.Id, 2)">
                  <ElIcon>
                    <FolderOpened />
                  </ElIcon>
                </ElButton>
                <ElButton plain type="success" class="icon-button" title="编辑" @click="
                  () => {
                    editItem(item);
                  }
                ">
                  <ElIcon>
                    <Edit />
                  </ElIcon>
                </ElButton>

                <ElButton v-if="!item.MovieType" type="danger" plain class="icon-button" title="同步"
                  @click="syncThis(item.Id)">
                  <ElIcon>
                    <Refresh />
                  </ElIcon>
                </ElButton>
                <ElButton type="info" plain class="icon-button" v-if="7 < view.showIconNum && notQiBing(item.MovieType)"
                  title="骑兵" @click="setMovieType(item.Id, 2)">
                  <ElIcon>
                    <Bicycle />
                  </ElIcon>
                </ElButton>
                <ElButton plain type="info" class="icon-button" v-if="notBuBing(item.MovieType) && 7 < view.showIconNum"
                  title="步兵" @click="setMovieType(item.Id, 1)">
                  <ElIcon>
                    <Sunny />
                  </ElIcon>
                </ElButton>
                <ElButton plain type="info" class="icon-button" v-if="notNative(item.MovieType) && 7 < view.showIconNum"
                  title="国产" @click="setMovieType(item.Id, 4)">
                  <ElIcon>
                    <Location />
                  </ElIcon>
                </ElButton>
                <ElButton plain type="info" class="icon-button" v-if="notSiBaDa(item.MovieType) && 7 < view.showIconNum"
                  title="欧美" @click="setMovieType(item.Id, 3)">
                  <ElIcon>
                    <Ship />
                  </ElIcon>
                </ElButton>
                <ElIcon v-if="7 >= view.showIconNum">
                  <ElDropdown placement="top-start">
                    <MoreFilled />
                    <template #dropdown>
                      <ElDropdownMenu>
                        <ElDropdownItem v-if="notQiBing(item.MovieType)" title="骑兵" @click="setMovieType(item.Id, 2)">
                          <ElIcon type="info" plain class="icon-button">
                            <Bicycle />
                          </ElIcon>骑兵
                        </ElDropdownItem>
                        <ElDropdownItem v-if="notBuBing(item.MovieType)" title="步兵" @click="setMovieType(item.Id, 1)">
                          <ElIcon plain type="info" class="icon-button">
                            <Sunny />
                          </ElIcon>步兵
                        </ElDropdownItem>
                        <ElDropdownItem v-if="notNative(item.MovieType)" title="国产" @click="setMovieType(item.Id, 4)">
                          <ElIcon plain type="info" class="icon-button">
                            <Location />
                          </ElIcon>国产
                        </ElDropdownItem>
                        <ElDropdownItem v-if="notSiBaDa(item.MovieType)" title="欧美" @click="setMovieType(item.Id, 3)">
                          <ElIcon plain type="info" class="icon-button">
                            <Ship />
                          </ElIcon>欧美
                        </ElDropdownItem>
                        <ElDropdownItem @click="deleteThis(item.Id, 2)">
                          <ElIcon type="info" plain class="icon-button">
                            <DeleteFilled />
                          </ElIcon>删除
                        </ElDropdownItem>
                      </ElDropdownMenu>
                    </template>
                  </ElDropdown>
                </ElIcon>
              </ElSpace>

              <div class="context-text" style="font-size: 13px">
                <ElLink v-if="item.Actress" style="color: green" @click="copy(item.Actress)">{{ item.Actress }}</ElLink>
                <ElDivider direction="vertical"></ElDivider>
                <ElLink v-if="item.Code" style="color: orange" @click="copy(item.Code)">{{ item.Code }}</ElLink>
                <ElDivider direction="vertical"></ElDivider>
                <ElPopover placement="top" width="400px" trigger="hover" :auto-close="1" :show-after="500">
                  <template #reference>
                    <span style="color: red"> {{ item.SizeStr }}</span>
                  </template>
                  <template #default>
                    <ElLink v-if="item.Actress" style="color: green" @click="copy(item.Actress)">{{ item.Actress }}
                    </ElLink>
                    <ElDivider v-if="item.Actress" direction="vertical"></ElDivider>
                    <ElLink v-if="item.Code" style="color: orange" @click="copy(item.Code)">{{ item.Code }}</ElLink>
                    <ElDivider v-if="item.Code" direction="vertical"></ElDivider>
                    <span style="color: red">【{{ item.SizeStr }}】</span>
                    {{
                        useDateFormat(item.MTime, "YYYY-MM-DD HH:MM", {
                          locales: "zh-cn",
                        })
                    }}
                    <hr />
                    <span style="
                        margin-buttom: 30px;
                        margin-top: 30px;
                        margin-left: 30px;
                        margin-right: 30px;
                      ">
                      {{ item.Name }}</span>
                  </template>
                </ElPopover>
                {{ item.Name }}
              </div>
            </div>
          </ElCard>
        </div>
      </ElSpace>
      <ElPagination class="pageTool" v-model:currentPage="queryParam.Page" v-model:page-size="queryParam.PageSize"
        :page-sizes="[12, 16, 30, 50, 200]" layout="total, sizes, prev, pager, next, jumper" :total="view.ResultCnt"
        :background="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <ElDialog title="文件信息" v-model="view.dialogFormItemVisible" :close-on-press-escape="false"
      :close-on-click-modal="false">
      <ElForm label-position="right" :model="view.formItem" size="large" label-width="18%">
        <ElFormItem label="类型">
          <el-radio-group v-model="view.formItem.MovieType" @change="formMovieTypeChange" size="large">
            <el-radio-button label="">无</el-radio-button>
            <el-radio-button label="骑兵">骑</el-radio-button>
            <el-radio-button label="步兵">步</el-radio-button>
            <el-radio-button label="国产">国</el-radio-button>
            <el-radio-button label="斯巴达">欧</el-radio-button>
          </el-radio-group>
        </ElFormItem>
        <ElFormItem label="脸谱">
          <ElInput v-model="view.formItem.Actress" autocomplete="off"></ElInput>
        </ElFormItem>
        <ElFormItem label="编码">
          <ElInput v-model="view.formItem.Code" autocomplete="off"></ElInput>
        </ElFormItem>
        <ElFormItem label="文件名称">
          <ElInput type="textarea" v-model="view.formItem.Name" autocomplete="off"></ElInput>
        </ElFormItem>
        <ElFormItem label="标签">
          <ElTag v-for="tag in view.formItem.Tags" :key="tag" effect="dark" closable style="margin-right: 8px" type=""
            size="large" @close="removeFormTag(tag)">
            {{ tag }}
          </ElTag>
          <ElAutocomplete placeholder="新标签" v-model="view.customerTag" :fetch-suggestions="fetchTagsLib"
            @select="handleSelectTag" size="small" style="width: 160px">
            <template #append>
              <ElButton size="default" type="primary" :disabled="customerTagEmpty()" @click="addThisCustomerTag"
                style="font-size: 12px">加
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
        <el-button size="large" @click="view.dialogFormItemVisible = false">取 消</el-button>
        <el-button type="primary" size="large" @click="editItemSubmit">确 定</el-button>
      </div>
    </ElDialog>
    <ElDialog width="66%" :modal="true" :title="'  ' + view.formItem.Code + ' '" v-model="view.dialogVisible"
      :before-close="
        () => {
          innerVisibleFalse();
          view.dialogVisible = false;
        }
      " :destroy-on-close="true">
      <div v-if="view.formItem">
        <div>
          <ElImage :src="getJpg(view.formItem.Id)" style="margin: 1px auto; width: 80%; height: auto" @click="
            () => {
              if (view.sourceList && view.sourceList.length > 0) {
                view.innerVisible = true;
              }
            }
          " />
          <ElRow :gutter="24">
            <ElCol :span="4" tyle="text-align:right"> YY： </ElCol>
            <ElCol :span="8" tyle="text-align:right">
              <a href="javascript:void(0);" @click="javSearch(view.formItem.Actress)">
                <span>{{ view.formItem.Actress }}</span></a>
            </ElCol>
          </ElRow>
          <ElRow :gutter="24">
            <ElCol :span="4" tyle="text-align:right"> Code </ElCol>
            <ElCol :span="8">
              <a href="javascript:void(0);" @click="javCode(view.formItem.Code)"><span>{{ view.formItem.Code
              }}</span></a>
            </ElCol>
          </ElRow>
          <ElRow :gutter="24">
            <ElCol :span="4" tyle="text-align:right"> 大小： </ElCol>
            <ElCol :span="8" v-if="view.formItem.Tags" tyle="text-align:right">
              <ElTag v-for="tag in view.formItem.Tags" :key="tag" effect="dark" style="margin-right: 8px" type=""
                size="large">
                {{ tag }}
              </ElTag>
            </ElCol>
            <ElCol :span="8">
              <span @click="gotoContext(view.formItem.Id)">【{{ view.formItem.SizeStr }}】</span>
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
      <teleport to="body">
        <div v-show="view.innerVisible" style="
            width: 100%;
            height: 100%;
            z-index: 9999;
            top: 0px;
            position: fixed;
            overflow: auto;
          " @click="innerVisibleFalse">
          <div v-for="(item, index) in view.sourceList" :key="index" style="display: flex; margin: 1px auto">
            <ElImage style="
                min-width: 1200px;
                width: auto;
                margin: 0 auto;
                opacity: 9;
                z-index: 9999;
              " :src="item">
              @click.stop="innerVisibleFalse"
            </ElImage>
          </div>
        </div>
      </teleport>

      <!-- <div v-for="(item, index) in view.sourceList" :key="index" style="display: flex; margin: 10px auto">
        <ElImage style="min-width: 800px;width: auto; margin: 0 auto" :src="item" lazy
          @click="view.innerVisible = true">
        </ElImage>
      </div> -->
    </ElDialog>
    <!--  -->
  </div>
  <teleport to="body">
    <div v-show="view.videoVisible" style="
        width: 100%;
        height: 100%;
        z-index: 9999;
        top: 0;
        position: fixed;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.7);
        float: left;
      " id="videoDiv">
      <div style="
          top: 0;
          height: 2rem;
          width: 100%;
          margin: 1rem auto;
          position: absolute;
          color: white;
          z-index: 9999;
          float: right;
        ">
        <span style="
            margin-left: 2rem;
            text-overflow: ellipsis;
            white-space: nowrap;
          ">
          <ElTag v-for="item in view.contextmenuTarget.Tags" key="default" type="danger" size="large"
            style="margin-left: 0.5rem">
            {{ item }}
          </ElTag>
          {{ view.contextmenuTarget.Code }}
          {{ view.contextmenuTarget.Actress }}
          {{ view.contextmenuTarget.Name }}
        </span>
        <div style="
            right: 1rem;
            top: 0;
            height: 2rem;
            position: absolute;
            z-index: 9999;
          ">
          <ElButton type="primary" @click="hiddenPlayVideo">隐藏</ElButton>
          <ElButton type="primary" @click="closePlayVideo">关闭</ElButton>
          <ElButton type="primary" @click="fullPlayVideo">满屏</ElButton>
        </div>
      </div>
      <!-- <video id="video" :src="view.videoUrl" controls style="right: 0;top: 0;position:absolute">
        您的浏览器不支持 video 标签。
      </video> -->
      <vue3VideoPlay v-if="view.videoClose" v-bind="options" />
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
} from "@/api/file";
import { PostSettingInfo } from "@/api/setting";

import { useSystemProperty } from "@/store/System";
import { getFileStream, getJpg, getPng } from "@/utils/ImageUtils";
import { ResultList } from "@/utils/ResultResponse";
import { Eleme } from "@element-plus/icons-vue";
import {
  onKeyStroke,
  useClipboard,
  useDateFormat,
  useMouseInElement,
  useTextSelection,
  useWindowScroll,
  useWindowSize,
} from "@vueuse/core";
import {
  ElBacktop,
  ElCol,
  ElDialog,
  ElDivider,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElImage,
  ElLink,
  ElMessage,
  ElMessageBox,
  ElPagination,
  ElPopover,
  ElRadioButton,
  ElRadioGroup,
  ElRow,
  ElSpace,
} from "element-plus";
import { onMounted, reactive, ref, watch } from "vue";
import { MovieModel, MovieQuery } from ".";

import "vue3-video-play/dist/style.css";

const target = ref(null);
const selectText = useTextSelection();
const { y: windowScrollHheight } = useWindowScroll();
const { x, y, isOutside } = useMouseInElement(target);
const pagePress = ref(null);

const running = ref(true);
const loading = ref(false);
const refreshIndexFlag = ref(false);
const showStyle = ref("post");
const systemProperty = useSystemProperty();
const cmenuShow = ref(false);
const source = ref("");
const { copy } = useClipboard({ source });
const { width: windowWidth, height: windowHeight } = useWindowSize();

const searchStyle = ref({});

const view = reactive<any>({
  videoUrl: null,
  videoVisible: false,
  videoClose: false,
  innerVisible: false,
  formItem: new MovieModel(),
  dialogFormItemVisible: false,
  contextmenuTarget: {},
  addTagShow: false,
  settingInfo: {},
  showIconNum: 6,
  ModelList: [],
  ResultCnt: 0,
});
const options = reactive({
  width: "1200px", //播放器高度
  height: "700px", //播放器高度
  color: "#409eff", //主题色
  title: "", //视频名称
  src: "", //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.8, //默认音量大小
  control: true, //是否显示控制
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ], //显示所有按钮,
});
const queryParam = reactive<MovieQuery>(new MovieQuery());

watch(windowWidth, (newWidth) => {
  let newHeight = (newWidth * 9) / 16;
  if (newHeight > windowHeight.value) {
    newHeight = windowHeight.value;
  }
  options.width = newWidth - 20 + "px";
  options.height = newHeight - 14 + "px";
});
watch(windowHeight, (newHeight) => {
  const newWidth = (newHeight * 16) / 9;
  options.width = newWidth - 20 + "px";
  options.height = newHeight - 14 + "px";
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
  if (newVal) {
    queryParam.Keyword = newVal;
  }
});

onKeyStroke(["`"], (e) => {
  refreshIndex();
});
onKeyStroke(["Enter"], (e) => {
  queryList();
});

const fullScreen = ref(true);
const isPlaying = ref(false);

const fullPlayVideo = () => {
  if (fullScreen.value) {
    options.width = windowWidth.value - 20 + "px";
    options.height = windowHeight.value - 14 + "px";
  } else {
    options.width = windowWidth.value * 0.988 + "px";
    options.height = windowHeight.value * 0.988 + "px";
  }
  fullScreen.value = !fullScreen.value;
};

const hiddenPlayVideo = () => {
  view.videoVisible = false;
};

const closePlayVideo = () => {
  view.videoVisible = false;
  view.videoClose = false;
  options.src = null;
  isPlaying.value = false;
};

const startPlayVideo = () => {
  view.videoClose = true;
  fullScreen.value = false;
  fullPlayVideo();
  const stream = getFileStream(view.contextmenuTarget.Id);
  options.title = view.contextmenuTarget.Name;
  options.src = stream;
  isPlaying.value = true;
  view.videoVisible = true;
};

const innerVisibleFalse = () => {
  view.innerVisible = false;
};
const imageContextmenu = (item: MovieModel) => {
  cmenuShow.value = false;
  setTimeout(() => {
    view.contextmenuTarget = item;
    document.getElementById("cmenu").style.marginLeft = x.value - 30 + "px";
    document.getElementById("cmenu").style.marginTop = y.value - 150 + "px";
    cmenuShow.value = true;
  }, 100);
};

const cmenuSync = async () => {
  await syncThis(view.contextmenuTarget.Id);
  cmenuShow.value = false;
};
const cmenuCode = async () => {
  await javCode(view.contextmenuTarget.Code);
  cmenuShow.value = false;
};
const cmenuPlay = async (item?) => {
  // await playThis(view.contextmenuTarget.Id);
  if (item) {
    view.contextmenuTarget = item;
  }
  view.videoVisible = true;
  cmenuShow.value = false;
  startPlayVideo();
};
const cmenuOpenDir = async () => {
  await openThisFolder(view.contextmenuTarget.Id);
  cmenuShow.value = false;
};
const cmenuGetImageList = async () => {
  await getImageList(view.contextmenuTarget.Id);
  cmenuShow.value = false;
};

const cmenuClose = async () => {
  cmenuShow.value = false;
};

const gotoContext = (id: string) => {
  console.log("gotoContext", id);
};
const javSearch = (actress: string) => {
  const url = view.settingInfo.BaseUrl + "/search/" + actress;
  window.open(url);
};
const javCode = (code: string) => {
  const url = view.settingInfo.BaseUrl + "/" + code;
  window.open(url);
};

const removeFormTag = (tag: string) => {
  const idx = view.formItem.Tags.indexOf(tag);
  view.formItem.Tags.splice(idx, 1);
  view.formItem.Name = view.formItem.Name.replaceAll(tag, "");
  formItemTagsChange();
};

const addThisCustomerTag = () => {
  if (!view.formItem.Tags) {
    view.formItem.Tags = [];
  }
  console.log(view.customerTag);
  view.formItem.Tags.push(view.customerTag);
  view.customerTag = undefined;
  formItemTagsChange();
};

const formItemTagsChange = () => {
  let { Name, Tags, FileType } = view.formItem;
  let newName = "";
  if (Name.indexOf("《") >= 0) {
    const startC = Name.substr(0, Name.indexOf("《") + 1);
    const endC = Name.substr(Name.indexOf("》"), Name.length);
    newName = startC;
    if (Tags && Tags.length > 0) {
      newName += Tags;
    }
    newName += endC;
  } else {
    newName = Name.replaceAll("." + FileType, "");
    newName = newName + "《" + Tags + "》" + "." + FileType;
  }
  view.formItem.Name = newName;
};

const editItem = (item: MovieModel) => {
  cmenuShow.value = false;
  view.formItem = item;
  view.dialogFormItemVisible = true;
};

const editItemSubmit = async () => {
  const { Id, Name, Code, Actress, Tags } = view.formItem;
  const code = Code.trim();
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
  const param = { Id, Name: name, Code: code, Actress };
  const res = await FileRename(param);
  if (res.Code == 200) {
    view.formItem = {};
    view.dialogFormItemVisible = false;
    refreshIndex();
  } else {
    ElMessage.error(res.Message);
  }
};

const formMovieTypeChange = () => {
  let { MovieType, Name, FileType } = view.formItem;
  let newName = "";
  if (Name.indexOf("{{") >= 0) {
    const startC = Name.substr(0, Name.indexOf("{{"));
    const endC = Name.substr(Name.indexOf("}}") + 2, Name.length);
    newName = startC;
    if (MovieType && MovieType !== "") {
      newName += "{{" + MovieType + "}}";
    }
    newName += endC;
  } else {
    newName = Name.replaceAll("." + FileType, "");
    newName = newName + "{{" + MovieType + "}}" + "." + FileType;
  }
  view.formItem.Name = newName;
};

const loadSettingInfo = async () => {
  const res =await systemProperty.getSettingInfo;
  //const res = await GetSettingInfo();
  if (res) {
    view.settingInfo = { DirsCnt: res.Dirs?.length, ...res };
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
  const postForm = { ...view.settingInfo };
  const res = await PostSettingInfo(postForm);
  if (res.Code === 200) {
    view.settingInfoShow = false;
    ElMessage.success(res.Message);
  } else {
    ElMessage.error(res.Message);
  }
};

const notContainTag = (tags: string[], tag: string) => {
  if (!tags || !tag) {
    return true;
  }
  if (tags.indexOf(tag) < 0) {
    return true;
  }
  return false;
};

const gotoSearch = (tag: string) => {
  queryParam.Keyword = tag;
  queryList();
};

const fetchTagsLib = (queryString, callback) => {
  const suggrestTagsLib = view.settingInfo?.TagsLib;
  const results = queryString
    ? suggrestTagsLib.filter(createFilter(queryString))
    : suggrestTagsLib;
  callback(results);
};
const customerTagEmpty = () => {
  if (view.customerTag) {
    return false;
  }
  return true;
};

const addTag = async (clickId, title) => {
  const res = await AddTag(clickId, title);
  if (res.Code == 200) {
    view.addTagShow = false;
    for (var i = 0; i < view.ModelList.length; i++) {
      if (view.ModelList[i].Id == clickId) {
        if (!view.ModelList[i].Tags) {
          view.ModelList[i].Tags = [];
        }
        view.ModelList[i].Tags.push(title);
        return;
      }
    }
    ElMessage.success(res.Message);
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
  console.log(clickId, title);
  const res = await CloseTag(clickId, title);
  if (res.Code == 200) {
    ElMessage.success(res.Message);
    for (var i = 0; i < view.ModelList.length; i++) {
      if (view.ModelList[i].Id == clickId) {
        const idx = view.ModelList[i].Tags.indexOf(title);
        view.ModelList[i].Tags.splice(idx, 1);
      }
      return;
    }
    refreshIndex();
  } else {
    ElMessage.error(res.Message);
  }
};

const queryList = async (params?: any) => {
  let title = queryParam.Keyword;
  systemProperty.syncSearchParam(queryParam);
  if (queryParam.Keyword && queryParam.Keyword !== "") {
  } else {
    title = "文件";
  }
  document.title = title;
  view.ModelList = [];
  loading.value = true;
  const res = await QueryFileList(queryParam);

  if (res) {
    loading.value = false;
    const model = res as unknown as ResultList;
    model.Data.map((item) => {
      if (item.Code == item.Actress) {
        item.Code = "";
        item.Actress = "";
      }
      if (item.Code.lastIndexOf("-") == item.Code.length - 1) {
        item.Code = item.Code.substring(0, item.Code.length - 1);
      }
      item.name = item.Name.trim();
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

const selectSuggestion = (item) => {
  queryParam.Keyword = item;
  queryList();
};

const pageLoading = (num: number) => {
  if (queryParam.Page + num <= 0) {
    queryParam.Page = 1;
  }
  queryParam.Page += num;

  queryList();
};

const fetchSuggestion = (queryString: string, callback) => {
  // const sourceSuggestions = view.suggestions;
  const sourceSuggestions = systemProperty.getSuggestions;
  if (!sourceSuggestions) {
    return;
  }
  const results = queryString
    ? sourceSuggestions.filter(createFilter(queryString))
    : sourceSuggestions;
  // 调用 callback 返回建议列表的数据
  const finalResults = results.slice(0, 50);
  callback(finalResults);
};

const createFilter = (queryString) => {
  return (res) => {
    return res.toLowerCase().indexOf(queryString.toLowerCase()) >= 0;
  };
};

const onlyRepeatQuery = () => {
  queryParam.OnlyRepeat = true;
  queryList();
};

const isShowCover = () => {
  if (showStyle.value == "cover") {
    view.showIconNum = 10;
    return true;
  }
  view.showIconNum = 6;
  return false;
};

const openInfoWindow = async (id: string) => {
  cmenuShow.value = false;
  const res = await FindFileInfo(id);
  view.sourceList = [];
  if (res) {
    view.formItem = res;
    view.dialogVisible = true;
    loadDirInfo(view.formItem.Id, true);
  }
};

const loadDirInfo = async (id: string, loading: boolean) => {
  const res = await QueryDirImageBase64(id);
  if (res && res.length > 0) {
    view.imageList = [];
    for (let i = 0; i < res.length; i++) {
      if (res[i].FileType == "jpg" || res[i].FileType == "png") {
        view.imageList.push(res[i].ImageBase);
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

const syncThis = async (id: string) => {
  const res = await SyncFileInfo(id);
  if (res.Code === 200) {
    ElMessage.success(res.Message);
  } else {
    ElMessage.error(res.Message);
  }
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
    await queryList();
    refreshIndexFlag.value = false;
  } else {
    ElMessage.error(res.Message);
  }
};

const thisActress = async (actress: string) => {
  queryParam.Keyword = actress;
  queryParam.Page = 1;
  queryList();
};

const openThisFolder = async (id: string, a?: number) => {
  console.log("openThisFolder", id, "a", a);
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

const deleteThis = async (id: string, a?: number) => {
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

const infoThis = async (id: string) => {
  const res = await FindFileInfo(id);
  if (res.Code === 200) {
    ElMessage.success(res.Message);
  } else {
    ElMessage.error(res.Message);
  }
};

const notQiBing = (movieType: string): boolean => {
  if (movieType !== "骑兵") {
    return true;
  }
  return false;
};

const notSiBaDa = (movieType: string): boolean => {
  if (movieType !== "斯巴达") {
    return true;
  }
  return false;
};
const notNative = (movieType: string): boolean => {
  if (movieType !== "国产") {
    return true;
  }
  return false;
};

const notBuBing = (movieType: string): boolean => {
  if (movieType !== "步兵") {
    return true;
  }
  return false;
};

const keywordChange = (value) => {
  queryParam.Keyword = value;
  queryList();
};

const handleCurrentChange = (page: number) => {
  queryParam.Page = page;
  queryList();
};
const handleSizeChange = (pageSize: number) => {
  queryParam.PageSize = pageSize;
  queryList();
};

setInterval(heartBeat, 10000);

// const suggestionsInit = () => {
//   const suggestionsCaches = localStorage.getItem("searchSuggestions");
//   if (suggestionsCaches) {
//     view.suggestions = suggestionsCaches.split(",");
//   }
// }

onMounted(() => {
  // suggestionsInit()
  loadSettingInfo();
  console.log(systemProperty.getSearchParam)
  queryParam.Page = systemProperty.getSearchParam?.Page;
  queryParam.PageSize = systemProperty.getSearchParam.PageSize;
  queryParam.MovieType = systemProperty.getSearchParam.MovieType;
  queryParam.SortField = systemProperty.getSearchParam.SortField;
  queryParam.SortType = systemProperty.getSearchParam.SortType;
  queryParam.Keyword = systemProperty.getSearchParam.Keyword;
  setTimeout(queryList, 200);
});
</script>

<style scoped>
.searchRow {
  padding: 0px;
}

.image-tool {
  margin-top: 2px;
  margin-bottom: 1px;
}

.redbackground {
  background-color: rgb(205, 138, 50);
}

.icon-style {
  font-size: 18px;
  color: red;
  margin-left: 2px;
}

.context-text {
  font-size: 10px;
  font-size-adjust: inherit;
  margin-right: 1px;
  margin-left: 1px;
  position: relative;
  height: 46px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.popperClass {
  height: auto;
  width: 400px;
}

.ecard {
  padding: 0;
  margin-bottom: 40px;
  /* background: #e4e6d1; */
}

.list-item {
  width: 220px;
  height: 358px;
  /* float: left; */
  /* list-style: none; */
}

.image-tag {
  position: fixed;
}

.img-list-item {
  width: auto;
  height: 270px;
}

.list-item-cover {
  width: 420px;
  height: 358px;
  /* float: left; */
  /* list-style: none; */
}

.img-list-item-cover {
  width: auto;
  height: 270px;
}

.pageTool {
  position: fixed;
  bottom: 4px;
  z-index: 99;
  margin-bottom: 8px;
}

.up {
  height: 100%;
  width: 100%;
  background-color: #f2f5f6;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
}

.tag-area {
  position: absolute;
  z-index: 99;
  opacity: 1;
  margin: 4px 4px;
}

.tag-buttom {
  margin-left: 64px;
  filter: alpha(opacity=100);
  position: absolute;
  z-index: 99;
  height: 28px;
  float: right;
  text-align: justify;
  text-align-last: justify;
}

.tag-buttom-cover {
  margin-left: 156px;
  filter: alpha(opacity=100);
  opacity: 1;
  position: absolute;
  z-index: 99;
  margin-top: 2px;
  float: right;
  text-align: justify;
  text-align-last: justify;
}

.tag-area span {
  filter: alpha(opacity=90);
  opacity: 0.9;
  background: #94df71;
  margin-bottom: 0px;
  z-index: 99;
  height: 28px;
  color: #000;
  line-height: 28px;
}

.icon-button {
  margin: 1px 2px;
  padding: 0;
  width: 24px;
  height: 24px;
  font-size: 16px;
  text-align: center;
}

.mainButtomFloat {
  top: 0px;
  opacity: 1;
  position: fixed;
  z-index: 99;
  width: 100%;
  background: #b8aeae;
}

.mainButtomRowFloat {
  margin: 8px auto;
}

.right-font {
  font-size: 16px;
}

.cmenu {
  padding: 4px;
  width: 180px;
  height: auto;
  border: 1;
  z-index: 99;
  position: absolute;
  background: white;
  opacity: 1;
}

.cmenuButton {
  width: 100%;
  margin-top: 2px;
}
</style>
