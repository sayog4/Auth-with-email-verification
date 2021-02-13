const formatError = error => {
  let errors = {}
  error.inner.map(e => {
    e.path = `${e.path}Error`
    errors = {
      ...errors,
      [e.path]: e.message
    }
  })
  return errors
}
export default formatError
