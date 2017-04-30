export function requireAuth (to, from, next) {
  if (!localStorage.token) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export function isLoging (to, from, next) {
  if (localStorage.token) {
    next('/admin/dashboard')
  } else {
    next()
  }
}

export function isAdmin (to, from, next) {
  next('/admin/dashboard')
}
