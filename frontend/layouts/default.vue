<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :width="250"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <!--program logo-->
        <v-list-item>
          <v-img
            src="/grupoa.png"
            alt="Grupo A"
            max-width="125"
            class="ml-8 pb-2"
          />
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
      <v-list>
        <!--Menu items-->
        <v-list>
          <v-list-group
            v-for="(item, index) in items.menus"
            :key="index"
            :value="item.active"
            :prepend-icon="item.icon"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(subitem, i) in item.sub_menus"
              :key="i"
              class="pl-5"
              @click.stop="goToPage(subitem.to)"
            >
              <template>
                <v-list-item-action>
                  <v-icon dense x-small color="#26a69a">mdi-circle</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-text="subitem.title"></v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app dark color="#47bac1">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <ModalError></ModalError>
      <ModalSuccess></ModalSuccess>
      <ModalLoading></ModalLoading>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span
        >&copy; {{ new Date().getFullYear() }} GrupoA. Todos os direitos
        reservados</span
      >
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import ModalError from '@/components/ModalError'
import ModalSuccess from '@/components/ModalSuccess'
import ModalLoading from '@/components/ModalLoading'
import menuData from '../data/menu_data'

export default {
  components: {
    ModalError,
    ModalSuccess,
    ModalLoading,
  },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'Módulo Acadêmico',
    }
  },
  computed: {
    ...mapGetters({
      items: 'main/getMenu',
    }),
  },
  created() {
    this.$store.dispatch('main/loadMenu', menuData)
  },
  methods: {
    goToPage(url) {
      this.$router.push(url)
    },
  },
}
</script>
