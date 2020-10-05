// ==UserScript==
// @name     Twitch Chat Message Alerts
// @description Play sound, when there are new messages on your Twitch channel
// @namespace https://rubyclarity.com
// @version  1
// @grant    none
// @include      http*://www.twitch.tv/pancakesummer
// ==/UserScript==

(function() {
  const processedClass = ".pancake-processed"
  const myChannelUrl = "https://www.twitch.tv/pancakesummer"
  const bellSoundUrl = "https://emoji-cheat-sheet.campfirenow.com/sounds/bell.mp3"
  const chatPollDelay = 1000

  let intervalHandle = null
  function mainLoop() {
    if (document.location.href !== myChannelUrl) {
      return
    }

    chatSoundAlert()
  }

  function chatSoundAlert() {
    let gotNewMessage = false

    const messages = document.querySelectorAll(".chat-line__message")
    messages.forEach(message => {
      if (message.classList.contains(processedClass))
        return

      message.classList.add(processedClass)
      gotNewMessage = true
    })

    if (gotNewMessage) {
      console.log("new message")
      playBell()
    }
  }

  function playBell() {
    var audioformsg = new Audio()
    audioformsg.src = bellSoundUrl
    audioformsg.autoplay = true
  }

  intervalHandle = setInterval(mainLoop, chatPollDelay)
})()
