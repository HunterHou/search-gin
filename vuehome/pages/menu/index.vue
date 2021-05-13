<template>
  <div>
    <h1>Hello world!!!</h1>
    <h2>This is {{ BaseUrl }}</h2>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      BaseUrl: "www.baidu.com"
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      this.fetch()
      this.$nuxt.$loading.finish()
    });
  },
  methods: {
    fetch()  {
      return axios.get('/buttoms').then(res => {
        console.log(res)
        // store.commit('setStars', res.data)
      })
    }
  }
};
</script>
