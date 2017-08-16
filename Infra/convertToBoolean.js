module.exports = function convertToBoolean (value) {
  if (value === null || value === undefined) {
    return false
  }

  const valueAsString = value.toString()

  if (valueAsString === 'false') {
    return false
  }

  return true
}
