const debugFlag = true

const noop = function noop(..._args) {}
const logger = {
  debug: debugFlag ? console.log : noop,
  info: console.log,
}

export default logger
