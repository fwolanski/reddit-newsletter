const juice = require('juice');

const serverRenderer = require('vue-server-renderer');
const serverBundle = require("./vue-ssr-server-bundle.json");

const renderer = serverRenderer.createBundleRenderer(serverBundle, {
  template: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>redditnewsletter</title>
</head>
<body itemscope itemtype="http://schema.org/EmailMessage">
<!--vue-ssr-outlet-->
</body>
</html>`
});

module.exports.renderEmail = (state) => {

  return new Promise((resolve, reject) => {

    renderer.renderToString(state, (err, html) => {
      if (err) {
        reject(err);
      } else {
        let inlined = juice(html);
        resolve(inlined);
      }
    });
  });

};

