var path = require("path");
var router = express.Router();

// Routes
// =============================================================


  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
  });



module.exports = router;