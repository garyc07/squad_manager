

module.exports.all = async (req, res, next) => {
  //const seasons = await Season.findAll()
  //res.send(seasons)
  res.json({ msg: 'Hello' })
}

module.exports.create = async (req, res, next) => {
  res.json({ msg: 'Hello' })
}

module.exports.update = async (req, res, next) => {} // 204?


module.exports.addPlayer = async (req, res, next) => {}