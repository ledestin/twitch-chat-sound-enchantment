/* globals Cookies */
import logger from "./logger"

class Twitch {
  constructor() {
    this.currentUser = this.fetchCurrentUser()
  }

  isLoggedIn() {
    return this.currentUser !== null
  }

  isOnMyChannel() {
    return this.myChannelUrl() === window.location.href
  }

  // private

  myChannelUrl() {
    return `https://www.twitch.tv/${this.currentUser}`
  }

  fetchCurrentUser() {
    const twitchUserCookie = Cookies.get("twilight-user")

    if (!twitchUserCookie) {
      logger.info("couldn't detect Twitch user, please login first")
      return
    }

    try {
      const { login } = JSON.parse(twitchUserCookie)
      return login
    } catch {
      logger.info("failed to parse Twitch cookie")
      return
    }
  }
}

export default Twitch
