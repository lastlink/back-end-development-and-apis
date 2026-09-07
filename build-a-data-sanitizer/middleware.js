function stripHtmlTags(value) {
  return value.replace(/<\/?[^>]+(>|$)/g, "");
}

function inputCleaner(req, res, next) {
  if (req.body.username) {
    req.body.username = req.body.username.toLowerCase();
  }
  if (req.body.comment) {
    req.body.comment = stripHtmlTags(req.body.comment);
  }
  next();
}

function inputValidator(req, res, next) {
  if (req.body.username && req.body.username.length >= 3) {
    next();
    return;
  }
  res.redirect(
    "/form?error=" +
      encodeURIComponent("Username must be at least 3 characters."),
  );
}

module.exports = { inputCleaner, inputValidator };
