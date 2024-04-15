<template>
  <div class="tag-popup">
    <div>
      <q-btn
        size="sm"
        icon="ti-minus"
        square
        text-color="white"
        color="green"
        class="tag-item"
        v-for="tag in props.item.Tags"
        :key="tag"
        :label="tag"
        @click="commonExec(CloseTag(props.item.Id, tag), true)"
      />
    </div>
    <div>
      <q-btn
        size="sm"
        icon="ti-plus"
        square
        text-color="white"
        color="red"
        class="tag-item"
        v-for="tag in systemProperty.SettingInfo.Tags"
        :key="tag"
        :label="tag"
        @click="commonExec(AddTag(props.item.Id, tag), true)"
      />
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';

import { CloseTag, AddTag } from 'components/api/searchAPI';
import { FileModel } from 'components/model/File';
import { useSystemProperty } from 'stores/System';

const systemProperty = useSystemProperty();

const props = defineProps({
  item: {
    type: FileModel,
    default: () => {
      new FileModel();
    },
  },
});

const emmits = defineEmits('doneNext');

const $q = useQuasar();

const commonExec = async (exec, refresh) => {
  const { Code, Message } = (await exec) || {};
  console.log(Code, Message);
  if (Code != 200) {
    $q.notify({ message: `${Message}` });
  } else {
    if (refresh) {
      emmits('doneNext');
    }
  }
};
</script>
