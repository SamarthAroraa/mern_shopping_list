const express = require("express");
const router = express.Router();

//item model
const Items = require("../../models/Item");

//@route    GET api/items
//@desc     Get all items
//@access   public
router.get("/", async (req, res) => {
  const items = await Items.find({}).sort({
    date: -1,
  });
  return res.json(200, {
    data: items,
    message: "These are all the items in the DB",
  });
});

//@route    POST api/items
//@desc     Create an Item
//@access   public
router.post("/", async (req, res) => {
  try {
    const newItem = new Items({ name: req.body.name });
    newItem
      .save()
      .then((item) => res.json(item))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
});

//@route    DELETE api/items
//@desc     Delete a Item
//@access   public
router.delete("/:id", async function (req, res) {
  try {
    const deleted = await Items.findByIdAndDelete(req.params.id);
    return res.json(deleted).status(200);
  } catch (err) {
    console.log(err);
    return res.status(404).json({success:false})
  }
});

module.exports = router;
