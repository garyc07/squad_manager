

class FieldValidationError extends Error {
  constructor(errorsArr) {
    super('Required Field Validation Error')
    this.name = 'FieldValidationError'
    this.errors = errorsArr
  }
}


const validatePostBody = (req, requiredFields=[]) => {
  const body = req.body
  const errMsgs = []

  requiredFields.forEach((f) => {
    if(!body.hasOwnProperty(f)){
      errMsgs.push(`${f} is a required field`)
    }
  })

  if(errMsgs.length) throw new FieldValidationError(errMsgs)

  return body
}

module.exports = { validatePostBody }