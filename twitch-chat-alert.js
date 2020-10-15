import "./header"

import ChatWatcher from "./ChatWatcher"
import Twitch from "./twitch"
import logger from "./logger"

/* global GM */
const chatPollDelay = 1000

const twitch = new Twitch()

function main() {
  if (!twitch.isLoggedIn()) return

  logger.debug("Setting up %s", GM.info.script.name)
  setupChatPolling()
}

function setupChatPolling() {
  const watcher = new ChatWatcher(twitch)
  setInterval(() => watcher.watchChatAndPlayBellOnNewMessages(), chatPollDelay)
}

main()
