class ConfigurationController {
  constructor(configurationService) {
    this.configurationService = configurationService;
  }
  /*
  returns:
    200 if configuration exists
    404 if configuration doesn't exists
  */

  get(req, res) {
    console.log(this.configurationService)

    const array = req.url.split('/')
    const path = array[2]

    const data = this.configurationService.model[path]
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json({})
    }
  }
}

module.exports = ConfigurationController;
