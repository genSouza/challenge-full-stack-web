<template>
  <v-row justify="center">
    <v-dialog v-model="displayErrorDialog" persistent max-width="450">
      <v-card>
        <v-toolbar color="red darken-1" dark>
          <v-row justify="center">
            <v-icon size="50" dark>mdi-alert-circle-outline </v-icon>
          </v-row>
        </v-toolbar>
        <v-card-text class="mt-4 mb-4">
          <v-row justify="center" class="mb-5">
            <span class="title">An error happened:</span>
          </v-row>
          <v-row justify="center">{{ errorMessage }}</v-row>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn color="red darken-1" dark @click="close()"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      displayErrorDialog: 'main/getDisplayErrorDialog',
      errorMessage: 'main/getErrorMessage',
    }),
  },
  methods: {
    close() {
      this.$store.commit('main/setDisplayErrorDialog', false)
      this.$store.commit('main/setErrorMessage', null)
    },
  },
}
</script>
