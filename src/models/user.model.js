import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 60,
      trim: true,
    },
    fullName: {
      type: String,
      set: function () {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: "Please enter a valid email address",
      },
    },
    role: {
      type: String,
      enum: ["admin", "writer", "guest"],
    },
    age: {
      type: Number,
      min: 1,
      max: 99,
      set: function (v) {
        return v < 0 ? 1 : v;
      },
    },
    numberOfArticles: {
      type: Number,
      default: 0,
    },
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
