<template>
  <div id="app">
    <button @click="clearIdb">Clear indexedDB</button>
    <button @click="clearSyncedInputs">Clear synced</button>
    <div>
      <input v-model="$root.newRecords" />
      <button @click="$root.insert_N_records">
        creat {{$root.newRecords}} new records
      </button>
    </div>
    <QueryComponent></QueryComponent>
    <SyncComponent></SyncComponent>
    <ScanComponent></ScanComponent>
    <ListComponent></ListComponent>
  </div>
</template>

<script>
import ScanComponent from './components/ScanComponent'
import ListComponent from './components/ListComponent'
import SyncComponent from './components/SyncComponent'
import QueryComponent from "./components/QueryComponent"
export default {
  name: 'App',
  components: {
    ScanComponent,
    ListComponent,
    SyncComponent,
    QueryComponent
  },
  methods: {
    async clearIdb() {
      const idbResponse = await this.$dbHelper.clearIdb()
      if (idbResponse && idbResponse.status) {
        this.$root.latestInputAdded = Math.random() * 1000
      }
    },
    async clearSyncedInputs() {
      const getIdbResponse = await this.$dbHelper.getSavedInputs()
      if (!getIdbResponse || !getIdbResponse.status) {
        return
      }

      const inputsToClear = getIdbResponse.data.filter((input) => {
        if (input.status === 1) {
          return true
        }
        return false
      })

      const idbResponse = await this.$dbHelper.clearSynced(inputsToClear)
      if (idbResponse && idbResponse.status) {
        this.$root.latestInputAdded = Math.random() * 1000
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
