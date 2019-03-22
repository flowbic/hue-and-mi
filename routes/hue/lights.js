const utils = require('../../utils/hue')
module.exports = (server, hue) => {
  // All Lights
  server.get('/things/hue/lights', async (req, res, next) => {
    res.send('HATEOAS HERE?')
    next()
  })

  server.get('/things/hue/lights/things', async (req, res, next) => {
    let result
    try {
      result = await hue.getLights()
      result = result.map(({ id, type, name, modelid, manufacturername, productname, productid }) => ({ name, type, id, modelid, manufacturername, productname, productid }))
    } catch (e) {
      result = utils.handleError(e)
    }
    res.send(result)
    next()
  })
  // All lights actions
  server.get('/things/hue/lights/actions', async (req, res, next) => {
    res.send('hello')
    next()
  })

  // All lights properties
  server.get('/things/hue/lights/properties', async (req, res, next) => {
    let result
    try {
      result = await hue.getLights()
      result = result.map(({ id, state, type, name }) => ({ name, type, id, state }))
    } catch (e) {
      result = utils.handleError(e)
    }
    res.send(result)
    next()
  })

  // Light by id model
  server.get('/things/hue/lights/:id/model', async (req, res, next) => {
    let result = ''
    try {
      let id = req.params.id

      result = await hue.getLightStateById(id)
        .then(({ id, type, name, modelid, manufacturername, productname, productid }) => ({ name, type, id, modelid, manufacturername, productname, productid }))
    } catch (e) {
      result = utils.handleError(e)
    }
    res.send(result)
    next()
  })

  // Light by id actions
  server.get('/things/hue/lights/:id/actions', async (req, res, next) => {
    res.send('What actions?')
    next()
  })

  server.put('/things/hue/lights/:id/actions/state', async (req, res, next) => {
    let result
    try {
      let id = req.params.id

      let state = JSON.parse(req.body.state)
      result = await hue.setLightState(id, state)
    } catch (e) {
      result = utils.handleError(e)
    }
    res.send(result)
    next()
  })

  server.put('/things/hue/lights/:id/actions/brightness', async (req, res, next) => {
    let result
    try {
      let id = req.params.id
      let data = JSON.parse(req.body.percentage)
      result = await hue.setBrightness(id, data)
    } catch (e) {
      result = utils.handleError(e)
    }
    res.send(result)
    next()
  })
  server.put('/things/hue/lights/:id/actions/color', async (req, res, next) => {
    let result
    try {
      let id = req.params.id
      let body = req.body
      let { r, g, b } = body
      console.log({ r, g, b })
      result = await hue.setRgbColor(id, { r, g, b })
    } catch (e) {
      result = utils.handleError(e)
    }
    res.send(result)
    next()
  })

  // Light by id properties
  server.get('/things/hue/lights/:id/properties', async (req, res, next) => {
    let result = ''
    try {
      let id = req.params.id

      result = await hue.getLightStateById(id)
        .then(({ id, state, type, name }) => ({ name, type, id, state }))
    } catch (e) {
      result = utils.handleError(e)
    }
    res.send(result)
    next()
  })
}
