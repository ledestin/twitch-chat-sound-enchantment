# twitch-chat-alert
Play a sound, when chat messages appear in your Twitch channel.

The sound will play
  * When the first message appears in chat.
  * If there are more messages in a short timeframe, sound will also play after
    the last message.

Thus, not every message will trigger a sound.

# How to use

1. Install [Tampermonkey](https://www.tampermonkey.net/) or
   [Greasemonkey]()https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/).
1. Login to your Twitch account.
1. Install the script from
   https://greasyfork.org/en/scripts/413789-twitch-chat-sound-enchantment
1. Try posting a message to your channel, and you should hear a bell sound.

If you're not logged in to your account, when the script is loaded, it won't
work. To make it detect your account, login to Twitch and reload the page.

# Acknowledgements
"Bell, Candle Damper, A (H1)" by InspectorJ (www.jshaw.co.uk) of
Freesound.org.
