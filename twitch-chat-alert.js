// ==UserScript==
// @name     Twitch Chat Sound Enchancement
// @description Play sound, when there are new messages on your Twitch channel
// @namespace https://rubyclarity.com
// @version  1
// @grant    none
// @include      http*://www.twitch.tv/*
// ==/UserScript==

const debug_flag = true

const processedClass = "pancake-processed"
const myChannelUrl = "https://www.twitch.tv/pancakesummer"
const bellSoundUrl = "https://emoji-cheat-sheet.campfirenow.com/sounds/bell.mp3"
const chatPollDelay = 1000
const debug = debug_flag ? console.log : noop

let intervalHandle = null

function main() {
  window.addEventListener('load', (event) => {
    setupMainLoopToRun()
  })
}

function setupMainLoopToRun() {
  if (intervalHandle)
    return

  debug("Setting up %s", GM.info.script.name)
  intervalHandle = setInterval(mainLoop, chatPollDelay)
}

function isOnMyChannel() {
  return openChannelHref() === window.location.href
}

function openChannelHref() {
  return document.querySelector('.channel-info-content a.tw-interactive')?.href
}

function mainLoop() {
  if (!isOnMyChannel())
    return

  chatSoundAlert()
}

function noop(...args) { }

function chatSoundAlert() {
  let gotNewMessage = false

  const messages = document.querySelectorAll(`.chat-line__message:not(.${processedClass})`)
  messages.forEach(message => {
    message.classList.add(processedClass)
    gotNewMessage = true
  })

  if (gotNewMessage) {
    debug("new message")
    playBell()
  }
}

function playBell() {
  var audioformsg = new Audio()
  audioformsg.src = bellSoundUrl
  audioformsg.autoplay = true
}

main()
