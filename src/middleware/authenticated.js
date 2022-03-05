export default function ({ store, route, redirect }) {
  if (!store.getters['chat/isAuthenticated'] && route.name !== 'login') {
    redirect('/login')
  }
  if (store.getters['chat/isAuthenticated'] && route.name === 'login') {
    redirect('/')
  }
}
