const mongoose = require("../db").mongoose;

const paperCollectionSchema = new mongoose.Schema({
  name: String, // 试卷集
  _papers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Paper" }]
});

const PaperCollection = mongoose.model(
  "PaperCollection",
  paperCollectionSchema
);

module.exports = PaperCollection;
