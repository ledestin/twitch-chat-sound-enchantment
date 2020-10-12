const debugFlag = true

// {{{1 logger
const noop = function noop(..._args) {}
const logger = {
  debug: debugFlag ? console.log : noop,
  info: console.log,
}
// }}}1

export default logger
