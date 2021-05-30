'use strict'
const utils = require('./utils')
const config = require('../config')


module.exports = {
  transformAssetUrls: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
