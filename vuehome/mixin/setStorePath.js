export default {
    mounted() {
        const { path } = this.$route;
        this.$store.commit("setStorePath", path);
    },
}