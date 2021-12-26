<template>
  <div class="container">
   <h1 align="center">Hello World!!!</h1>
  </div>
</template>
<script>
export default {
  created() {
    this.$router.push("/home")
  },
  mounted(){
     document.title="设置"
  }
}
</script>

