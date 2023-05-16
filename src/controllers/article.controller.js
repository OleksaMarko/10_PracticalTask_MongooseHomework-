import Article from "../models/article.model.js";

export const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find();
    return res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};

export const getArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    return res.status(200).json(article);
  } catch (err) {
    next(err);
  }
};

export const createArticle = async (req, res, next) => {
  try {
    const article = req.body;
    const newArticle = await new Article(article).save();
    return res.status(201).json(newArticle);
  } catch (err) {
    next(err);
  }
};

export const updateArticleById = async (req, res, next) => {
  try {
    const article = req.body;
    const { id } = req.params;
    const updatedArticle = await Article.findByIdAndUpdate(id, article, {
      new: true,
    });
    res.status(200).json(updatedArticle);
  } catch (err) {
    next(err);
  }
};

export const deleteArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Article.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
