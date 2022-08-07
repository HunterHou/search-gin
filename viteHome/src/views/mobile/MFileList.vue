<script setup lang="ts">
  import { Button ,Row,Col} from 'vant';
  import 'vant/lib/index.css';
</script>
<template>
<Button>bnt</Button>
<Row>
  <Col span="8">span: 8</Col>
  <Col span="8">span: 8</Col>
  <Col span="8">span: 8</Col>
</Row>

<Row>
  <Col span="4">span: 4</Col>
  <Col span="10" offset="4">offset: 4, span: 10</Col>
</Row>

<Row>
  <Col offset="12" span="12">offset: 12, span: 12</Col>
</Row>
</template>