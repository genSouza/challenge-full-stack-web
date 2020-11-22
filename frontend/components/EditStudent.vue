<template>
  <v-card class="elevation-6">
    <v-toolbar color="#47bac1" dark flat>
      <span class="title mx-4">Editar aluno</span>
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
              :disabled="true"
            ></v-text-field>
          </v-col>
          <v-col md="3">
            <v-text-field
              v-model="cpf"
              label="CPF"
              :disabled="true"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="#448AFF" class="mr-6" dark @click="close()">
        Cancelar
      </v-btn>
      <v-btn
        v-if="name && email && ra && cpf"
        color="#9816F4"
        dark
        @click="save()"
      >
        Salvar
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
  },
  data() {
    return {
      valid: false,
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
    async save() {
      this.$store.dispatch('main/DisplayLoading', 'Please await')
      try {
        const dto = {
          name: this.name,
          email: this.email,
        }
        await this.$store.dispatch('student/update', dto)
        this.$store.dispatch('main/DisplaySuccess', `Salvo com sucesso!`)
        this.afterSave()
      } catch (err) {
        this.$store.dispatch(
          'main/DisplayError',
          this.$store.getters['student/getExceptionMessage']
        )
      } finally {
        this.$store.dispatch('main/CloseLoading')
      }
    },
  },
}
</script>
