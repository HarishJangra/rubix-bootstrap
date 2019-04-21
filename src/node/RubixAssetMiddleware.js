const hostname = process.env.WP_HOST || "localhost";
const port = process.env.WP_PORT || 8079;
const static_path = `http://${hostname}:${port}`;

export default function(_dir) {
  let dir = _dir || 'ltr';

  return function(req, res, next) {
    let mainjs = 'main.js', maincss = 'main.css';

    if (dir === 'rtl') {
      dir = 'rtl';
      mainjs = 'main-rtl.js';
      maincss = 'main-rtl.css';
    }

    res.locals.dir = dir;

    switch (process.env.NODE_ENV) {
      case "development":
        if (dir === 'rtl' && process.env.RTL !== 'true') {
          res.status(500).send('ERROR: Launch with "npm run dev:rtl -s" instead of "npm run dev -s"');
          return;
        }

        res.locals.pretty = true;
        res.locals.app_stylesheets = `
      <script src='${static_path}/assets/js/devServerClient.js'></script>
      <script src='${static_path}/assets/js/${mainjs}'></script>`;
        res.locals.app_scripts = `
      <script src='${static_path}/assets/js/plugins.js'></script>
      <script src='${static_path}/assets/js/app.js'></script>`;
      break;
      default:
        res.locals.app_stylesheets = `
      <link rel='stylesheet' href='/css/${maincss}' />`;
        res.locals.app_scripts = `
      <script src='/js/plugins.js'></script>
      <script src='/js/app.js'></script>`;
      break;
    }

    next();
  }
}
