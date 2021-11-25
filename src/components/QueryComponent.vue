<template>
  <div>
    <input v-model="type" placeholder="type" type="text" />
    <input v-model="value" placeholder="value" type="value" />
    <button @click="getRecord">query</button>
    <div>result: {{ JSON.stringify($root.queriedRecord) }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: '',
      value: ''
    }
  },
  methods: {
    async getRecord() {
      this.$root.queriedRecord = await this.$dbHelper.get([
        this.value,
        this.type
      ])
    }
  }
}
</script>

<style></style>
