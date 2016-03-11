import Expectation from './Expectation'

const Extensions = []

function extend(extension) {
  if (Extensions.indexOf(extension) === -1) {
    Extensions.push(extension)

    for (const p in extension)
      if (extension.hasOwnProperty(p))
        Expectation.prototype[p] = extension[p]
  }
}

export default extend
