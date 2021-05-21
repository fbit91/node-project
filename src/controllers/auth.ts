// Load required packages
import passport from "passport";
import { BasicStrategy } from "passport-http";
import User, { IUser } from "../models/user.model";

passport.use(
  new BasicStrategy(function (username, password, callback) {
  console.log("🚀 ~ file: auth.ts ~ line 8 ~ BasicStrategy", BasicStrategy)
      
    User.findOne({ username: username }, (err: any, user: IUser) => {
      if (err) {
        return callback(err);
      }
      // No user found with that username
      if (!user) {
        return callback(null, false);
      }
      // Make sure the password is correct
      user.verifyPassword(password, function (err: any, isMatch: boolean) {
        if (err) {
          return callback(err);
        }
        // Password did not match
        if (!isMatch) {
          return callback(null, false);
        }
        // Success
        return callback(null, user);
      });
    });
  })
);

exports.isAuthenticated = passport.authenticate("basic", { session: false });
