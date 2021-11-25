<template>
  <div>
    <table>
      <thead>
        <th>type</th>
        <th>value</th>
        <th>status</th>
        <th>img url</th>
      </thead>
      <tr
        v-for="(savedInput, index) in savedInputs"
        :key="index"
        :class="dynamicClass(savedInput.status)"
      >
        <td>{{ savedInput.type }}</td>
        <td>{{ savedInput.value }}</td>
        <td>{{ savedInput.status }}</td>
        <!--  <th>
          <img :src="images(savedInput.url)" alt="" srcset="" />
          {{ images(savedInput.url) }}
        </th> -->
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "ListComponent",
  data() {
    return {
      savedInputs: null,
    };
  },
  computed: {
    dynamicClass() {
      return (status) => {
        if (status === 0) {
          return "por-sincronizar";
        }
        if (status === 1) {
          return "sincronizado";
        }
        if (status === -1) {
          return "erro-sincronizar";
        }
      };
    },
    /*   images() {
      return (url) => {
        console.log({ url });
        return url;
      };
    }, */
  },
  methods: {
    async initializeComponent() {
      const idbResponde = await this.$dbHelper.getSavedInputs();
      //console.log("resp", idbResponde.data);
      this.savedInputs = idbResponde.data;
    },
  },
  watch: {
    "$root.latestInputAdded": function (newValue) {
      this.initializeComponent();
    },
    async savedInputs() {
      if (!this.savedInputs || this.savedInputs.length === 0) {
        this.$root.synced = true;
      }

      const itemsToSync = this.savedInputs.filter((input) => {
        if ([0, -1].includes(input.status)) {
          return true;
        }
        return false;
      });

      if (itemsToSync && itemsToSync.length > 0) {
        this.$root.synced = false;
      }
      if (itemsToSync && itemsToSync.length > 5) {
        //console.log("A tentar sincronizar");

        this.$root.syncItems();
        /* const apiResponse = await this.$mockApi.syncData(); */

        /*  if (apiResponse.statusCode === 200) {
          const idDBresponse = await this.$dbHelper.saveArrayOfInputs(
            apiResponse.data
          );

          if (idDBresponse && idDBresponse.status) {
            this.$root.synced = true;
            console.log("sincronizou com sucesso", idDBresponse);
          }
        } */
      }
    },
  },
  created() {
    this.initializeComponent();
  },
};
</script>

<style scoped>
.por-sincronizar {
  background-color: yellow;
}

.sincronizado {
  background-color: green;
}

.erro-sincronizar {
  background-color: red;
}
</style>