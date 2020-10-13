/* globals _ */
import logger from "./logger"

class ChatWatcher {
  static processedMessageClass = "chat-sound-enchantment-processed"
  static newMessageSelector = `.chat-line__message:not(.${ChatWatcher.processedMessageClass})`
  static bellSoundUrl =
    "https://raw.githubusercontent.com/ledestin/twitch-chat-sound-enchantment/main/sounds/bell-candle-damper.mp3"
  static soundDelay = 3000

  constructor(twitch) {
    this.twitch = twitch
    this.debouncedPlayBell = _.debounce(this.playBell, ChatWatcher.soundDelay, {
      leading: true,
      trailing: true,
    })
  }

  watchChatAndPlayBellOnNewMessages() {
    if (!this.twitch.isOnMyChannel()) return

    const newMessages = this.fetchNewMessages()
    if (newMessages.length === 0) return

    this.markNewMessagesAsProcessed(newMessages)
    logger.debug(`${newMessages.length} new message(s) found`)
    this.debouncedPlayBell()
  }

  // private

  fetchNewMessages() {
    return document.querySelectorAll(ChatWatcher.newMessageSelector)
  }

  markNewMessagesAsProcessed(newMessages) {
    newMessages.forEach((message) => {
      message.classList.add(ChatWatcher.processedMessageClass)
    })
  }

  playBell = () => {
    var audioformsg = new Audio()
    audioformsg.src = ChatWatcher.bellSoundUrl
  }
}

export default ChatWatcher
