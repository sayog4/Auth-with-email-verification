import jwt from 'jsonwebtoken'

const preSignupToken = (name, email, password) => {
  return jwt.sign({ name, email, password }, process.env.JWT_PRE_SIGNUP, {
    expiresIn: '20m'
  })
}

const verifyAndDecodeToken = token => {
  console.log(token)
  return jwt.verify(token, process.env.JWT_PRE_SIGNUP, function(err, decoded) {
    if (err) {
      throw new Error('Token expiered. Please Signup!')
    }
    const { name, email, password } = jwt.decode(token)
    return { name, email, password }
  })
}

export { preSignupToken, verifyAndDecodeToken }
