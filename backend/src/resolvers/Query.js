const Query = {
  async me(parent, args, { req, models }, info) {
    const { userId } = req.request

    if (!userId) throw new Error('You must be loggedin!!')

    return models.User.findById(userId)
  }
}

export default Query
