export default {
  menus: [
    {
      icon: 'mdi-school-outline',
      title: 'Alunos',
      active: false,
      sub_menus: [
        {
          title: 'Consulta',
          to: '/',
        },
        {
          title: 'Cadastro',
          to: '/add',
        },
      ],
    },
  ],
}
