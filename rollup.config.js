export default {
  input: "twitch-chat-alert.js",
  output: {
    file: "dist/bundle.js",
    format: "es",
    globals: {
      Cookies: "Cookies",
      _: "_",
    },
  },
  treeshake: false,
}
