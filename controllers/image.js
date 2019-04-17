const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "bc6fe78d25124701acbbb6f26b9eb1f1"
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("impossível de trabalhar com a api"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  let found = false;
  db("usuario")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries);
    })
    .catch(err =>
      res
        .status(400)
        .json("não foi possível retronar o número d eentradas enviadas")
    );
};

module.exports = {
  handleImage,
  handleApiCall
};
