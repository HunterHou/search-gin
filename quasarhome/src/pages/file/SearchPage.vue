<template>
  <div class="q-pa-md">
    <!--
         :card-container-class="cardContainerClass"
         :columns="columns"
         :filter="filter"
         v-model:pagination="pagination"
         :rows-per-page-options="rowsPerPageOptions"
       -->
    <q-table grid title="Treats" row-key="name" hide-header :rows="view.resultData.Data">
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="view.queryParam.Keyword" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">

          <q-card>
            <q-img :src="getPng(props.row.Id)" spinner-color="white" style="height: 140px; max-width: 150px" />
 
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { axios } from '../../boot/axios';
import { getPng } from '../../components/utils/images';

const view = reactive({
  queryParam: {
    Keyword: '',
    MovieType: '',
    OnlyRepeat: false,
    Page: 1,
    PageSize: 10,
    SortField: 'MTime',
    SortType: 'desc',
  },
  resultData: {},
});


</script>
