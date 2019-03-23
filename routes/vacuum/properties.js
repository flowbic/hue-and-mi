module.exports = (server, vacuum) => {
  server.get('/things/vacuum/properties/battery', async (req, res, next) => {
    let level = await vacuum.batteryLevel()
    console.log(level)
    res.send(JSON.stringify(level))
    next()
  })
  server.get('/things/vacuum/properties/clean', async (req, res, next) => {
    try {
      let result = await vacuum.isCleaning()
      let json = JSON.stringify(result)
      res.send(json)
    } catch (e) {
      res.send(e)
    }
    next()
  })
  server.get('/things/vacuum/properties/cleanLog', async (req, res, next) => {
    try {
      let result = await vacuum.getCleaningHistory()
      res.send(result)
    } catch (e) {
      res.send(e)
    }
    next()
  })
}
