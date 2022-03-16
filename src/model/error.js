const error = (statusCode, error, description) => {
    return {
        statusCode,
        error,
        description
    }
}
module.exports = error