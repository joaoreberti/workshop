<template>
  <div class="sync">
    <CloudCheckIcon v-if="$root.synced" />
    <SyncIcon
      @click="tryAndSync"
      class="pointer"
      v-else-if="$root.synced === false"
    />
    <SyncAlertIcon v-else />
    <!-- <SyncOffIcon /> -->
  </div>
</template>

<script>
import SyncAlertIcon from "vue-material-design-icons/SyncAlert.vue";
import SyncIcon from "vue-material-design-icons/Sync.vue";
import CloudCheckIcon from "vue-material-design-icons/CloudCheck.vue";

export default {
  watch: {
    "$root.synced": function (newValue) {
      console.log("newValue sync", newValue);
    },
  },
  components: {
    SyncAlertIcon,
    SyncIcon,
    CloudCheckIcon,
  },
  methods: {
    tryAndSync() {
      this.$root.syncItems();
      console.log("try and sync");
    },
  },
};
</script>

<style scoped>
.sync {
  position: fixed;
  right: 0;
  top: 0;
}
.pointer {
  cursor: pointer;
}
</style>