<template>
  <div>
    <select v-model="type">
      <option value="ean">ean</option>
      <option value="sku">sku</option>
    </select>
    <label for="ean" />Ean
    <input v-model="input" name="ean" />
    <button @click="saveInputInIndexedDB">Save</button>
  </div>
</template>

<script>
export default {
  name: "ScanComponent",
  data() {
    return {
      input: "",
      type: "ean",
    };
  },
  watch: {
    type() {
      //console.log(this.type);
    }, //,
  },
  methods: {
    async saveInputInIndexedDB(event) {
      const idbResponse = await this.$dbHelper.saveInput({
        value: this.input,
        type: this.type,
        status: 0,
        url: "",
      });

      if (idbResponse && idbResponse.status) {
        //console.log(idbResponse.data);
        this.$root.latestInputAdded = idbResponse.data;
        return;
      }

      //console.log("error on save");
      this.input = "";
    },
  },
};
</script>

<style>
</style>