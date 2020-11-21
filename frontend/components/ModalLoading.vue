<template>
  <v-row justify="center">
    <v-dialog v-model="displayLoadingDialog" persistent max-width="450">
      <v-card color="primary" dark>
        <v-card-text>
          {{ loadingMessage }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0 mt-4"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      displayLoadingDialog: 'main/getDisplayLoadingDialog',
      loadingMessage: 'main/getLoadingMessage',
    }),
  },
}
</script>
