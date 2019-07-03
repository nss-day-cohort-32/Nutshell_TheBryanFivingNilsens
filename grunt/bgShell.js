module.exports = {
  launchAPI: {
    cmd: "json-server -p 8088 -w ./api/database.json --routes ./routes.json"
  },
  _defaults: {
    bg: true
  }
};


