export const state = () => ({
  baseUrl: "",
  activePage: "/home",
});
export const mutations = {
  setStorePath(state, path) {
    state.activePage = path;
  },
};
