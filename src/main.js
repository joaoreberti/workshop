import Vue from "vue";
import App from "./App.vue";
import dbHelper from "./dbHelper";
import MockApi from "./api/mockApi";
Vue.prototype.$dbHelper = new dbHelper();
Vue.prototype.$mockApi = new MockApi();

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  async created() {
    await this.$dbHelper.getDb();
    //console.log("db created");
  },
  data() {
    return {
      latestInputAdded: null,
      synced: null
    };
  },
  methods: {
    syncItems: async function () {
      const idbResponse = await this.$dbHelper.getSavedInputs();
      if (!idbResponse || !idbResponse.status) {
        return;
      }

      const savedInputs = idbResponse.data;

      const inputsToSync = savedInputs.filter((input) => {
        if ([0, -1].includes(input.status)) {
          return true;
        }
        return false;
      });
      const apiResponse = await this.$mockApi.syncData(inputsToSync);
      if (apiResponse.statusCode === 200) {
        const idDBresponse = await this.$dbHelper.saveArrayOfInputs(
          apiResponse.data
        );

        if (idDBresponse && idDBresponse.status) {
          this.$root.synced = true;
          console.log("sincronizou com sucesso", idDBresponse);
          this.$root.latestInputAdded = Math.random() * 1000;
        }
      }
    }
  }
}).$mount("#app");
