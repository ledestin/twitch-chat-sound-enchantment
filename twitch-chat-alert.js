(function() {
  const processedClass = ".pancake-processed"
  const myChannelUrl = "https://www.twitch.tv/pancakesummer"

  let intervalHandle = null
  function mainLoop() {
    if (document.location.href !== myChannelUrl) {
      clearInterval(intervalHandle)
      intervalHandle = null
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
    audioformsg.src = 'https://emoji-cheat-sheet.campfirenow.com/sounds/bell.mp3'
    audioformsg.autoplay = true
  }

  intervalHandle = setInterval(mainLoop, 2000)
})()
