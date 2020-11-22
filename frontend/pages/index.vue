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
      <v-dialog v-model="editDialog" persistent max-width="1000px">
        <EditStudent :close="CloseEditDialog" :afterSave="afterSave">
        </EditStudent>
      </v-dialog>
      <v-dialog v-model="deleteDialog" persistent max-width="300px">
        <v-card>
          <v-card-title>
            <span class="headline">Deletar item</span>
          </v-card-title>
          <v-card-text>
            Deseja deletar? Esta ação não pode ser desfeita.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" class="mr-4" dark @click="closeDeleteDialog"
              >Cancelar</v-btn
            >
            <v-btn color="error" @click="deleteStudent">Deletar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
              :search="search"
              sort-by="ra"
              class="elevation-1"
            >
              <template v-slot:item.edit="{ item }">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="warning"
                  @click="ShowEditDialog(item)"
                >
                  <v-icon dark>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <template v-slot:item.delete="{ item }">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="error"
                  @click="showDeleteDialog(item)"
                >
                  <v-icon dark>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import EditStudent from '@/components/EditStudent'
export default {
  components: {
    EditStudent,
  },
  data() {
    return {
      deleteDialog: false,
      editDialog: false,
      itemToDelete: null,
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
        { text: 'Editar', sortable: false, value: 'edit' },
        { text: 'Excluir', sortable: false, value: 'delete' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      exceptionMessage: 'student/getExceptionMessage',
    }),
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
        await this.$store.dispatch('student/list')
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
    showDeleteDialog(item) {
      this.itemToDelete = item
      this.deleteDialog = true
    },
    closeDeleteDialog() {
      this.itemToDelete = null
      this.deleteDialog = false
    },
    async deleteStudent() {
      this.$store.dispatch('main/DisplayLoading', 'Espere...')
      try {
        await this.$store.dispatch('student/delete', this.itemToDelete.uuid)
        await this.loadData()
        this.$store.dispatch('main/DisplaySuccess', `Dados removidos!`)
      } catch (err) {
        this.$store.dispatch('main/DisplayError', this.exceptionMessage)
      } finally {
        this.$store.dispatch('main/CloseLoading')
        this.itemToDelete = null
        this.deleteDialog = false
      }
    },
    async ShowEditDialog(item) {
      this.$store.dispatch('main/DisplayLoading', 'Espere...')
      try {
        await this.$store.dispatch('student/findById', item.uuid)
        this.editDialog = true
      } catch (err) {
        this.$store.dispatch('main/DisplayError', this.exceptionMessage)
      } finally {
        this.$store.dispatch('main/CloseLoading')
      }
    },
    CloseEditDialog() {
      // this.$store.dispatch('student/clearStudentDto')
      this.editDialog = false
    },
    async afterSave() {
      this.CloseEditDialog()
      this.$store.dispatch('main/DisplayLoading', 'Espere...')
      await this.loadData()
      this.$store.dispatch('main/CloseLoading')
    },
  },
}
</script>
