require('dotenv').config()
let miio = require('miio')

class Vacuum {
  constructor () {
    this.device = false
  }
  async connect () {
    try {
      this.device = await miio.device({ address: process.env.VACUUM_IP, token: process.env.VACUUM_TOKEN })
      return this.device
    } catch (e) {
      console.log(e)
    }
  }
  async getAbout () {
    console.log('getAbout')
    console.log(await this.device.model())
  }
  async getState () {
    try {
      const result = await this.device.state()
      return result
    } catch (e) {
      return e
    }
  }
  async batteryLevel () {
    if (this.device.matches('cap:battery-level')) {
      let level = await this.device.batteryLevel()
      return level
    }
  }
  async isCleaning () {
    const isCleaning = await this.device.cleaning()
    return isCleaning
  }
  async getCleaningHistory () {
    const result = await this.device.getHistory(0)
    return result
  }
  async clean () {
    const result = await this.device.clean()
    return result
  }
  async stop () {
    const result = await this.device.stop()
    return result
  }
  async dock () {
    this.device.call('app_stop', [])
    .then(console.log)
    .then(() => this.device.call('app_charge', [], {
      refresh: [ 'state' ],
      refreshDelay: 1000
    }))
    .then(console.log)
  }
}

module.exports = Vacuum
