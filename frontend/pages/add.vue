<template>
  <v-card class="elevation-6 mt-5">
    <v-toolbar color="#47bac1" dark flat>
      <span class="title mx-4">Cadastro de alunos</span>
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
              v-mask="'###.###.###-##'"
              :rules="[required('CPF')]"
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
        v-if="name && email && ra && cpf.length == 14"
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
import { mapGetters } from 'vuex'
import validations from '@/utils/validations'
export default {
  data() {
    return {
      ip: null,
      valid: false,
      name: null,
      email: null,
      ra: null,
      cpf: '',
      ...validations,
    }
  },
  computed: {
    ...mapGetters({
      exceptionMessage: 'student/getExceptionMessage',
    }),
  },
  methods: {
    async save() {
      this.$store.dispatch('main/DisplayLoading', 'Carregando...')
      try {
        const studentDto = {
          name: this.name,
          email: this.email,
          ra: Number(this.ra),
          cpf: this.cpf,
        }
        await this.$store.dispatch('student/save', studentDto)
        this.$store.dispatch('main/CloseLoading')
        this.$store.dispatch('main/DisplaySuccess', `Dados salvos com sucesso!`)
        location.reload()
      } catch (err) {
        this.$store.dispatch('main/CloseLoading')
        this.$store.dispatch('main/DisplayError', this.exceptionMessage)
      }
    },
    close() {
      this.$router.push('/')
    },
  },
}
</script>
