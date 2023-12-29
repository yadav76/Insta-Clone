const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const MongoDb_URI =
  "mongodb+srv://santosh76yadav2000:Santosh76@cluster0.brctkzf.mongodb.net/instaClone?retryWrites=true&w=majority";

mongoose
  .connect(MongoDb_URI)
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  profileImage: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
});

userSchema.plugin(plm); //helps to searialize and desearialize User Ojbect for passport

module.exports = mongoose.model("user", userSchema);
