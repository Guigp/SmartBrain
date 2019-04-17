const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("formulário incorreto");
  }
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("usuario")
          .where("email", "=", email)
          .then(user => {
            res.json(user[0]);
          })

          .catch(err =>
            res.status(400).json("não foi possível achar o usuario")
          );
      } else {
        res.status(400).json("credenciais erradas");
      }
    })
    .catch(err => res.status(400).json("credenciais erradas"));
};

module.exports = {
  handleSignin: handleSignin
};
