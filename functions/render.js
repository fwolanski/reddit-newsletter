const juice = require('juice');

const serverRenderer = require('vue-server-renderer');
const serverBundle = require("./vue-ssr-server-bundle.json");

const renderer = serverRenderer.createBundleRenderer(serverBundle, {
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
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

