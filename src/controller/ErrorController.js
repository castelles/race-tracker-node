const error = require('../model/error')

const handleDuplicatedError = (err, res) => {
    const field = Object.keys(err.keyValue)
    const code = 409
    res.status(code).send(error(
        code, 
        `An object with that ${field} value already exists.`, 
        err.message
        )
    )
}

const handleValidationError = (err, res) => {
    const code = 400
    let errors = Object.values(err.errors).map( el => el.message)
    let fields = Object.values(err.errors).map(el => el.path)

    if (errors.length > 1) {
        const formmatedErrors = errors.join(' ')
        res.status(code).send(error(
            code,
            formmatedErrors,
            fields
        ))
    } else {
        res.status(code).send(error(
            code,
            errors,
            err.message
        ))
    }
}

const errorController = (err, req, res, next) => {
    // console.log(err)
    try {
        if (err.name === 'ValidationError') 
        return err = handleValidationError(err, res)

    if (err.code && err.code == 11000)
        return err = handleDuplicatedError(err, res)        

    } catch (error) {
        return res.status(500)
            .send(error(
                500,
                'Erro desconhecido. Chama o pai que nois resolve.',
                'Só falar no zapzap'
            ))
    }
}

const notFound = (code, field) => {
    return error(
        code,
        `${field} not found.`,
        `${field} does not exists or was not send. Try again with a correct ${field} id.`
    )
}

module.exports = { errorController, notFound }