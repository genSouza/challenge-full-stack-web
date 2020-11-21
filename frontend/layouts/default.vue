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
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          class="mt-0"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
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
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import ModalError from '@/components/ModalError'
import ModalSuccess from '@/components/ModalSuccess'
import ModalLoading from '@/components/ModalLoading'

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
      items: [
        {
          icon: 'mdi-school-outline',
          title: 'Alunos',
          to: '/',
        },
      ],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'Módulo Acadêmico',
    }
  },
}
</script>
