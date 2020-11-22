<template>
  <v-container>
    <v-row>
      <v-btn class="ml-4 mt-2" dark color="#9816F4" @click="goToAddForm()">
        Cadastrar aluno
        <v-icon right dark>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </v-row>
    <v-card class="elevation-6 mt-4 ml-1">
      <v-toolbar color="#47bac1" dark flat>
        <span class="title mx-4">Consulta de alunos</span>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-spacer></v-spacer>
          <v-col md="4" lg="4" sm="6" class="pt-0">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Digite sua busca"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
              item-key="uuid"
              :items="students"
              :headers="headers"
              sort-by="ra"
              class="elevation-1"
            >
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      search: '',
      students: [],
      editedIndex: -1,
      headers: [
        {
          text: 'Registro Acadêmico',
          align: 'start',
          sortable: false,
          value: 'ra',
        },
        {
          text: 'Nome',
          sortable: false,
          value: 'name',
        },
        {
          text: 'CPF',
          sortable: false,
          value: 'cpf',
        },
        // { text: 'Editar', sortable: false, value: 'edit' },
        // { text: 'Excluir', sortable: false, value: 'delete' },
      ],
    }
  },
  computed: {
    studentList: {
      get() {
        return this.$store.getters['student/getStudentList']
      },
      set(value) {
        this.setStudentList(value)
      },
    },
  },
  async mounted() {
    this.$store.dispatch('main/DisplayLoading', 'Por favor espere...')
    await this.loadData()
    this.$store.dispatch('main/CloseLoading')
  },
  methods: {
    ...mapMutations({
      setStudentList: 'student/setStudentList',
    }),
    async loadData() {
      this.students = []
      try {
        await this.$store.dispatch('student/loadStudents')
        this.studentList.forEach((item) => {
          const student = {
            uuid: item.uuid,
            ra: item.ra,
            name: item.name,
            cpf: item.cpf,
          }
          this.students.push(student)
        })
      } catch (err) {
        this.$store.dispatch('main/DisplayError', err)
      }
    },
    goToAddForm() {
      this.$router.push('/add')
    },
  },
}
</script>
