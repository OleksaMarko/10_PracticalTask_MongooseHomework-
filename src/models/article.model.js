import mongoose from "mongoose";
const Schema = mongoose.Schema;

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 400,
      trim: true,
    },
    subtitle: {
      type: String,
      minlength: 5,
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 5000,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["sport", "games", "history"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
