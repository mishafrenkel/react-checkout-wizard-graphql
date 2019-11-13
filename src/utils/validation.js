import * as R from 'ramda'

export const errorMessages = (fields, errors) => {
  const conditions = R.map(({ path, message }) =>
    R.when(R.propEq('path', path), R.assoc('message', message)),
  )(fields)

  const transformErrors = R.map(
    R.compose(...conditions)
  )

  return transformErrors(errors).reduce((acc, item, key) => {
    acc[item.path] = item.message
    return acc
  }, {})
}
