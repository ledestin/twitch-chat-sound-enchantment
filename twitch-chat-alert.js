import "./header"

/* global GM */
const chatPollDelay = 1000

import Twitch from "./twitch"
import ChatWatcher from "./ChatWatcher"
import logger from "./logger"

const twitch = new Twitch()

function main() {
  logger.debug("Setting up %s", GM.info.script.name)

  if (!twitch.isLoggedIn()) return

  setupChatPolling()
}

function setupChatPolling() {
  const watcher = new ChatWatcher(twitch)
  setInterval(() => watcher.watchChatAndPlayBellOnNewMessages(), chatPollDelay)
}

main()
