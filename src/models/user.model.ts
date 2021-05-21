import  * as mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  verifyPassword: (password: string, callback: any) => void;
}

interface IUserInstanceCreation extends mongoose.Model<IUser> {}
// Define our user schema
const UserSchema = new mongoose.Schema<IUser, IUserInstanceCreation, IUser>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Execute before each user.save() call
UserSchema.pre("save", function (this: IUser, next) {
  var user: IUser = this;

  // Break out if the password hasn't changed
  if (!user.isModified("password")) return next();

  // Password changed so we need to hash it
  bcrypt.genSalt(
    5,
    function (err: mongoose.CallbackError | undefined, salt: any) {
      if (err) return next(err);

      bcrypt.hash(
        user.password,
        salt,
        null,
        function (err: mongoose.CallbackError | undefined, hash: any) {
          if (err) return next(err);
          user.password = hash;
          next();
        }
      );
    }
  );
});

UserSchema.methods.verifyPassword = function (
  this: IUser,
  password: string,
  callback
) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};
    
// Export the Mongoose model
export default mongoose.model<IUser>("User", UserSchema);
