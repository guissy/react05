const gulp = require('gulp');
const fs = require('fs');
const browserify = require('browserify');
const {merge} = require('event-stream');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gulpif = require("gulp-if");
const tsify = require("tsify");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const preprocessify = require('preprocessify');
const $ = require('gulp-load-plugins')();
process.env.BABEL_ENV = 'production';
const production = process.env.NODE_ENV === "production";
const target = process.env.TARGET || "chrome";
const environment = process.env.NODE_ENV || "development";


const manifest = {
  dev: {
    "background": {
      "scripts": [
        "scripts/livereload.js",
        // "scripts/background.js"
      ]
    }
  },

  firefox: {
    "applications": {
      "gecko": {
        "id": "my-app-id@mozilla.org"
      }
    }
  }
}

// Tasks
gulp.task('clean', () => {
  return pipe(`./build/${target}`, $.clean())
})

gulp.task('build', (cb) => {
  $.runSequence('clean', 'styles', 'ext', cb)
});

gulp.task('watch', ['build'], () => {
  $.livereload.listen();

  gulp.watch(['./src/**/*']).on("change", () => {
    $.runSequence('build', $.livereload.reload);
  });
});

gulp.task('default', ['build']);

gulp.task('ext', ['manifest', 'js'], () => {
  return mergeAll(target)
});


// -----------------
// COMMON
// -----------------
gulp.task('js', () => {
  return buildJS(target)
})

gulp.task('stylescss', () => {
  return gulp.src('src/**/*.scss')
    .pipe($.plumber())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe(gulp.dest(`build/${target}`));
});
gulp.task('styles', () => {
  return gulp.src(['src/css/*.css','node_modules/antd/dist/antd.min.css'])
    .pipe(gulp.dest(`build/${target}/css`));
});

gulp.task("manifest", () => {
  return gulp.src('./manifest.json')
    .pipe(gulpif(!production, $.mergeJson({
      fileName: "manifest.json",
      jsonSpace: " ".repeat(4),
      endObj: manifest.dev
    })))
    .pipe(gulpif(target === "firefox", $.mergeJson({
      fileName: "manifest.json",
      jsonSpace: " ".repeat(4),
      endObj: manifest.firefox
    })))
    .pipe(gulp.dest(`./build/${target}`))
});



// -----------------
// DIST
// -----------------
gulp.task('dist', (cb) => {
  $.runSequence('build', 'zip', cb)
});

gulp.task('zip', () => {
  return pipe(`./build/${target}/**/*`, $.zip(`${target}.zip`), './dist')
})


// Helpers
function pipe(src, ...transforms) {
  return transforms.reduce((stream, transform) => {
    const isDest = typeof transform === 'string'
    return stream.pipe(isDest ? gulp.dest(transform) : transform)
  }, gulp.src(src))
}

function mergeAll(dest) {
  return merge(
    pipe('./src/icons/**/*', `./build/${dest}/icons`),
    pipe(['./src/_locales/**/*'], `./build/${dest}/_locales`),
    pipe([`./src/images/${target}/**/*`], `./build/${dest}/images`),
    pipe(['./src/images/shared/**/*'], `./build/${dest}/images`),
    pipe(['./src/**/*.html'], `./build/${dest}`)
  )
}

function buildJS(target) {
  let tasks = ['index.tsx', 'contentscript.ts', 'livereload.ts'].map( file => {
      return browserify({ debug: true })
        .add(file, { basedir: 'src' })
        .plugin(tsify, { skipLibCheck: true, moduleResolution:'node', jsx: 'react',
          allowSyntheticDefaultImports: true, module: 'exnext', forceConsistentCasingInFileNames: false })
        // .transform('babelify', { presets: ['es2015'] })
        // .transform(babelify, { extensions: [ '.tsx', '.ts' ] })
        // .transform(preprocessify, { includeExtensions: ['.js'] })
        .bundle()
        // .on('error', function (e) {
        //   console.error(e);
        // })
        .pipe(source(file))
        .pipe(buffer())
        .pipe(gulpif(!production, $.sourcemaps.init({ loadMaps: true }) ))
        .pipe(gulpif(!production, $.sourcemaps.write('./') ))
        .pipe(gulpif(production, $.uglify({
          "mangle": false,
          "output": {
            "ascii_only": true
          }
        })))
        .pipe(rename({extname: ".js"}))
        .pipe(gulp.dest(`build/${target}/scripts`))
        ;
    });

  return merge.apply(null, tasks);
}

gulp.task('parse51job', function () {
  return gulp.src('src/jest/*.{htm,html}')
    .pipe(replace(/\d{7,10}/g,''))
    .pipe(replace(/\d{11,}/g,''))
    .pipe(replace(/GBK/g,'utf-8'))
    .pipe(replace(/\w+@/g,''))
    .pipe(replace(/class="name">[^\x00-\xff]+/g,'class="name">好多钱'))
    .pipe(gulp.dest('src/jest/'))
})