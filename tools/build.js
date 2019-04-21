/**
 * Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const del = require('del');
const path = require('path');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const pkg = require('../package.json');
const transform = require('babel-core').transform;
const watch = require('watch');
const ncp = require('ncp');

let isWatch = false;

function createDir(dir) {
  try {
    fs.mkdirSync(dir);
  } catch(e) {
    // do nothing
  }
}

createDir(`dist`);
createDir(`dist/lib`);
createDir(`dist/lib/node`);
createDir(`dist/lib/utils`);
createDir(`dist/lib/others`);

for (var i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === '-w' || process.argv[i] === '--watch') {
    isWatch = true;
  }
}

let promise = Promise.resolve();

// Clean up the output directory
promise = promise.then(() => del(['dist/*']));

function createFile(file, data) {
  fs.writeFileSync(`dist/lib/${file}`, data, { encoding: 'utf-8' });
}

function copySassDir() {
  del.sync(['dist/sass']);
  fs.mkdirSync(`dist/sass`);
  ncp('./sass', './dist/sass');
}

function compileFile(file, msg) {
  msg = msg || 'Building file';

  const content = fs.readFileSync(`src/${file}`).toString();
  const result = transform(content, {
    filename: file,
    ignore: 'node_modules/**',
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ["transform-decorators-legacy", "transform-runtime"],
    babelrc: false,
    sourceMaps: true
  });

  console.log(`${msg}: dist/lib/${file}`);
  createFile(file, result.code);
}

function compileFiles(dir, parent) {
  if (!parent) parent = dir;

  const srcFiles = fs.readdirSync(path.join(process.cwd(), dir));
  // Compile each source into its own file
  for (const file of srcFiles) {
    const type = fs.statSync(path.join(process.cwd(), dir, file));
    if (type.isFile()) {
      compileFile(path.join(
        path.relative(parent, dir),
        file
      ));
    }
  }
}

// Copy package.json and LICENSE.txt
promise = promise.then(() => {
  delete pkg.private;
  delete pkg.devDependencies;
  delete pkg.scripts;
  delete pkg.eslintConfig;
  delete pkg.babel;
  fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, '  '), 'utf-8');
  fs.writeFileSync('dist/LICENSE.txt', fs.readFileSync('LICENSE.txt', 'utf-8'), 'utf-8');
  fs.writeFileSync('dist/README.md', fs.readFileSync('README.md', 'utf-8'), 'utf-8');

  createDir(`dist/lib`);
  createDir(`dist/lib/node`);
  createDir(`dist/lib/utils`);
  createDir(`dist/lib/others`);

  compileFiles('src');
  compileFiles(path.join('src', 'node'), 'src');
  compileFiles(path.join('src', 'utils'), 'src');
  compileFiles(path.join('src', 'others'), 'src');

  function watchSass() {
    watch.watchTree('./sass', (f, curr, prev) => {
      if (typeof f === "object" && prev === null && curr === null) {
        // Finished walking the tree
        console.log('Copying SASS folder');
        copySassDir();

        if (!isWatch) {
          watch.unwatchTree('./src');
          watch.unwatchTree('./sass');
        }
      } else {
        console.log('Copying SASS folder');
        copySassDir();
      }
    });
  }

  watch.watchTree('./src', (f, curr, prev) => {
    if (typeof f === "object" && prev === null && curr === null) {
      // Finished walking the tree
      console.log('Watching for changes...');
      watchSass();
    } else if (prev === null) {
      // f is a new file
      compileFile(path.relative('src', f));
    } else if (curr.nlink === 0) {
      var file = path.basename(f);
      // f was removed
      fs.unlinkSync(`dist/lib/${file}`);
    } else {
      // f is a was changed
      compileFile(path.relative('src', f), 'Re-compiling file');
    }
  });
});

promise.catch(err => console.error(err.stack)); // eslint-disable-line no-console
