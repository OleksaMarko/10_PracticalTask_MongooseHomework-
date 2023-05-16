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
    fullName: String,
    // fullName: {
    //   type: String,
    //   set: function () {
    //     return `${this.firstName} ${this.lastName}`;
    //   },
    // },
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
      set: function (num) {
        return num < 0 ? 1 : num;
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

userSchema.pre("save", function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
