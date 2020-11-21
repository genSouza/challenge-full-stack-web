<template>
  <v-row justify="center">
    <v-dialog v-model="displaySuccessDialog" persistent max-width="450">
      <v-card>
        <v-toolbar color="green darken-1" dark>
          <v-row justify="center">
            <v-icon size="50" dark>mdi-check-circle-outline </v-icon>
          </v-row>
        </v-toolbar>
        <v-card-text class="mt-4 mb-4">
          <v-row justify="center" class="mb-5">
            <span class="title">OK</span>
          </v-row>
          <v-row justify="center"> {{ successMessage }}</v-row>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn color="green darken-1" dark @click="close()"> Close </v-btn>
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
      displaySuccessDialog: 'main/getDisplaySuccessDialog',
      successMessage: 'main/getSuccessMessage',
    }),
  },
  methods: {
    close() {
      this.$store.commit('main/setDisplaySuccessDialog', false)
      this.$store.commit('main/setSuccessMessage', null)
    },
  },
}
</script>
