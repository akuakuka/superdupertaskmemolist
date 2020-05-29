export const debugLogger = (req, res, next) => {
    try {
      console.log(`SESSION = ${req.session}`)
      console.log(`SessionID = ${req.sessionID}`)
      console.log(`UserID = ${req.user._id}`)
      console.log(`ExpireDate = ${req.user.expireDate}`)
    } catch (e) {
      console.log("logger error")
    }

    next()
  }