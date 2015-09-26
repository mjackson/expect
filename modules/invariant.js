import inspect from 'object-inspect'

function invariant(condition, messageFormat) {
  if (condition)
    return
    
  let extraArgs = Array.prototype.slice.call(arguments, 2)
  let index = 0

  throw new Error(
    messageFormat.replace(/%s/g, function () {
      return inspect(extraArgs[index++])
    })
  )
}

export default invariant
