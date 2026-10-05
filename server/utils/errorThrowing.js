export const errorThrowing = (msg, status = null) => {
  const err = new Error(msg)
  if (status) err.statusCode = status
  throw err
}