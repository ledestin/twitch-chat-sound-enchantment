// ==UserScript==
// @name     Twitch Chat Sound Enchantment
// @description Play sound, when there are new messages on your Twitch channel
// @namespace https://rubyclarity.com
// @version  1
// @supportURL https://github.com/ledestin/twitch-chat-sound-enchantment/issues
// @author Dmitry Maksyoma (https://twitter.com/oledestin)
// @grant    none
// @require https://cdn.jsdelivr.net/npm/cookies-js@1.2.3/dist/cookies.min.js
// @require https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js
// @include      http*://www.twitch.tv/*
//
// "Bell, Candle Damper, A (H1)" by InspectorJ (www.jshaw.co.uk) of Freesound.org
// ==/UserScript==

const debug_flag = true

/* global _, Cookies, GM */
/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }] */
const processedClass = "chat-sound-enchantment-processed"
const newMessageSelector = `.chat-line__message:not(.${processedClass})`
const bellSoundUrl = "https://emoji-cheat-sheet.campfirenow.com/sounds/bell.mp3"
const chatPollDelay = 1000
const soundDelay = 3000
const debug = debug_flag ? console.log : noop
const info = console.log
const debouncedPlayBell= _.debounce(playBell, soundDelay, {
  'leading': true,
  'trailing': true
})

let currentTwitchUser
let intervalHandle = null

function main() {
  currentTwitchUser = fetchCurrentTwitchUser()
  if (!currentTwitchUser)
    return

  window.addEventListener('load', (_event) => {
    setupMainLoopToRun()
  })
}

function myChannelUrl() {
  return `https://www.twitch.tv/${currentTwitchUser}`
}

function fetchCurrentTwitchUser() {
  const twitchUserCookie = Cookies.get('twilight-user')

  if (!twitchUserCookie) {
    info("couldn't detect Twitch user, please login first")
    return
  }

  try {
    const { login } = JSON.parse(twitchUserCookie)
    return login
  } catch {
    info("failed to parse Twitch cookie")
    return
  }
}

function setupMainLoopToRun() {
  if (intervalHandle)
    return

  debug("Setting up %s", GM.info.script.name)
  intervalHandle = setInterval(mainLoop, chatPollDelay)
}

function isOnMyChannel() {
  return myChannelUrl() === window.location.href
}

function mainLoop() {
  if (!isOnMyChannel())
    return

  watchChatAndPlayBellOnNewMessages()
}

function noop(..._args) { }

function fetchNewMessages() {
  return document.querySelectorAll(newMessageSelector)
}

function markNewMessagesAsProcessed(newMessages) {
  newMessages.forEach(message => {
    message.classList.add(processedClass)
  })
}

function watchChatAndPlayBellOnNewMessages() {
  const newMessages = fetchNewMessages()
  if (newMessages.length === 0)
    return

  markNewMessagesAsProcessed(newMessages)
  debug(`${newMessages.length} new message(s) found`)
  debouncedPlayBell()
}

function playBell() {
  var audioformsg = new Audio()
  audioformsg.src = bellSoundUrl
  audioformsg.autoplay = true
}

main()
