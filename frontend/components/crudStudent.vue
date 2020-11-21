<template>
  <v-card class="elevation-6">
    <v-toolbar color="#47bac1" dark flat>
      <span class="title mx-4">{{ header }}</span>
    </v-toolbar>
    <v-card-text>
      <v-form v-model="valid" class="ml-4">
        <v-row>
          <v-col md="3">
            <v-text-field
              v-model="name"
              label="Nome"
              :rules="[required('nome'), minLength('nome', 3)]"
            ></v-text-field>
          </v-col>
          <v-col md="3">
            <v-text-field
              v-model="email"
              label="E-mail"
              :rules="[required('email'), emailFormat()]"
            ></v-text-field>
          </v-col>
          <v-col md="3">
            <v-text-field
              v-model="ra"
              label="RA"
              :rules="[required('ra'), minLength('ra', 1)]"
            ></v-text-field>
          </v-col>
          <v-col md="3">
            <v-text-field
              v-model="cpf"
              label="CPF"
              :rules="[
                required('CPF'),
                minLength('CPF', 11),
                maxLength('CPF', 11),
              ]"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        v-if="closeEnabled"
        color="#448AFF"
        class="mr-6"
        dark
        @click="close()"
      >
        Close
      </v-btn>
      <v-btn
        v-if="clearEnabled"
        color="#448AFF"
        class="mr-6"
        dark
        @click="clear()"
      >
        Clear
      </v-btn>
      <v-btn
        v-if="name && email && ra && cpf"
        color="#9816F4"
        dark
        @click="save()"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapMutations } from 'vuex'
import validations from '@/utils/validations'
export default {
  props: {
    close: Function,
    afterSave: Function, // where to redirect after save?
    header: String,
    clearEnabled: Boolean,
    closeEnabled: Boolean,
    // redirectToListPage: Boolean
  },
  data() {
    return {
      isLoading: false,
      ...validations,
    }
  },
  computed: {
    name: {
      get() {
        return this.$store.getters['student/getStudentName']
      },
      set(value) {
        this.setStudentName(value)
      },
    },
    email: {
      get() {
        return this.$store.getters['student/getStudentEmail']
      },
      set(value) {
        this.setStudentEmail(value)
      },
    },
    ra: {
      get() {
        return this.$store.getters['student/getStudentRa']
      },
      set(value) {
        this.setStudentRa(value)
      },
    },
    cpf: {
      get() {
        return this.$store.getters['student/getStudentCpf']
      },
      set(value) {
        this.setStudentCpf(value)
      },
    },
  },
  methods: {
    ...mapMutations({
      setStudentRa: 'student/setStudentRa',
      setStudentCpf: 'student/setStudentCpf',
      setStudentName: 'student/setStudentName',
      setStudentEmail: 'student/setStudentEmail',
    }),
  },
}
</script>
