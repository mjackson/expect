import objectKeys from 'object-keys'

const ownKeys = (object) => {
  if (typeof Reflect === 'object' && typeof Reflect.ownKeys === 'function') {
    return Reflect.ownKeys(object)
      .filter(key => Object.getOwnPropertyDescriptor(object, key).enumerable)
  }

  if (typeof Object.getOwnPropertySymbols === 'function') {
    return Object.getOwnPropertySymbols(object)
      .filter(key => Object.getOwnPropertyDescriptor(object, key).enumerable)
      .concat(objectKeys(object))
  }

  return objectKeys(object)
}


export default ownKeys
