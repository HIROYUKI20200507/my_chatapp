// TODO:Vuexでストアの管理が常時できるようになったら実装
// export default ({ store, route, redirect }) => {
//   if (
//     !store.getters.isAuthenticated &&
//     route.name !== 'login' &&
//     route.name !== 'register'
//   ) {
//     console.log('失敗')
//     redirect('/login')
//   }
//   if (
//     store.getters.isAuthenticated &&
//     (route.name === 'login' || route.name === 'register')
//   ) {
//     console.log('成功')
//     redirect('/')
//   }
// }
