import User from '../models/User.js'

const usernameExist = async (username) => {
  try {
    const user = await User.findOne({ username: username })
    if(!user) return false
    return true
  } catch (err) {
    return false
  }
}

export default usernameExist