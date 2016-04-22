import inspect from 'object-inspect'

const formatString = (string, args) => {
  let index = 0
  return string.replace(/%s/g, () => inspect(args[index++]))
}

const assert = (condition, createMessage, ...extraArgs) => {
  if (condition)
    return

  const message = (typeof createMessage === 'string')
    ? formatString(createMessage, extraArgs)
    : createMessage(extraArgs)

  throw new Error(message)
}

export default assert
