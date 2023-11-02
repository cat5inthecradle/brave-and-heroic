export default class GameState {
  constructor(initialState = {}) {
    this.data = initialState
  }

  load(newGameState) {
    this.data = newGameState
  }

  check(keyStr, value) {
    const [noun, verb, mod] = keyStr.split('.')
    const invert = mod === 'not';
    const currentStateValue = this.data[noun]?.[verb]

    let result = false;
    if (Array.isArray(currentStateValue)) {
      result = currentStateValue.includes(value)
    } else {
      result = currentStateValue === value
    }
    return invert ? !result : result;
  }

  /**
   * Set the value of a key in the game state, or append to an array if the
   * the key represents an array.
   * @param {String} keyStr
   * @param {*} value
   */
  set(keyStr, value) {
    const [noun, verb] = keyStr.split('.')
    console.log('set', keyStr, value, this.data)

    // We don't support objects yet
    if (typeof value === 'object') {
      throw new Error('No, thank you.')
    }

    // If the noun doesn't exist, throw
    if (this.data[noun] === undefined) {
      throw new Error(`No noun "${noun}" in game state`)
    }

    // If the value is an array, replace the old value
    if (Array.isArray(value)) {
      this.data[noun][verb] = value
      // If the value is not an array, but the old value is, append it
    } else if (Array.isArray(this.data[noun]?.[verb])) {
      this.data[noun][verb].push(value)
      // Otherwise, just set the value
    } else {
      this.data[noun][verb] = value
    }
  }

  //   remove(keyStr, value) {
  //     const keys = keyStr.split('.')
  //     let currentObject = this.data
  //     for (const key of keys.slice(0, -1)) {
  //       if (currentObject.hasOwnProperty(key)) {
  //         currentObject = currentObject[key]
  //       } else {
  //         return // Intermediate key doesn't exist, exit early
  //       }
  //     }
  //     const lastKey = keys[keys.length - 1]
  //     if (Array.isArray(currentObject[lastKey])) {
  //       const index = currentObject[lastKey].indexOf(value)
  //       if (index !== -1) {
  //         currentObject[lastKey].splice(index, 1)
  //       }
  //     }
  //   }
}

// const defaultState = { Tamlin: { is: ["unsafe"] }, Tryst: { is: "lost" } };
// const gameState = new GameState(defaultState);
// gameState.add("Tamlin.is", "safe");  // gameState.data is now { Tamlin: { is: ["unsafe", "safe"] }, Tryst: { is: "lost" } }
// gameState.remove("Tamlin.is", "unsafe");  // gameState.data is now { Tamlin: { is: ["safe"] }, Tryst: { is: "lost" } }
