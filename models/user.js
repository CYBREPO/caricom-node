import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    "name": {
        type: String,
        required: [true,"Name is required"]
    },
    "mobile": {
        type: String,
    },
    "email":{
        type: String,
        required: [true,"Email is required"]
    },
    "password":{
        type: String,
        required: [true, "Password is required"]
    },
    "profile": {
      type: String
  },
    "isAdmin": {
      type: Boolean,
      required: true
    },
    "isActive": {
      type: Boolean,
      require: true,
      default: true
    },
    "lastLogin": {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

UserSchema.index({ "name": "text", "email": "text" });
export default mongoose.model("user", UserSchema);