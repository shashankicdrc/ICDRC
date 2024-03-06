// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const crypto=require('crypto');


// const userSchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     isAdmin: {
//       type: Boolean,
//       required: true,
//       default: false,
//     },
//     passwordResetToken: String,
//     passwordResetExpires: Date,
//   },
//   {
//     timestamps: true,
//   }
// )

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password)
// }

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next()
//   }

//   const salt = await bcrypt.genSalt(10)
//   this.password = await bcrypt.hash(this.password, salt)
// })

// userSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString("hex")

//   this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex")

//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000 //10mins

//   return resetToken
// }

// const User = mongoose.model("Googleuser", userSchema)

// export default User