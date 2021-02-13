import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    admin: {
      type: Boolean,
      default: false
    },
    resetPasswordLink: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

userSchema.methods.matchPassword = async function(pw) {
  return await bcrypt.compare(pw, this.password)
}

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User