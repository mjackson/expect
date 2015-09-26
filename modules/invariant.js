import inspect from 'object-inspect'

function invariant(condition, messageFormat) {
  if (condition)
    return
    
  const extraArgs = Array.prototype.slice.call(arguments, 2)
  const index = 0

  const message = messageFormat.replace(/%s/g, function () {
    return inspect(extraArgs[index++])
  })

  throw new Error(message)
}

export default invariant
