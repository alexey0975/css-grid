const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const formatHtml = require('gulp-format-html');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const svgSprite = require('gulp-svg-sprite');
const squoosh = require('gulp-squoosh');
const babel = require('gulp-babel');
const sourceMaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const del = require('del');
const browserSync = require('browser-sync').create();

const resources = () => {
  return src('src/resources/**')
    .pipe(dest('dist'));
}

const fonts = () => {
  return src('src/fonts/**')
    .pipe(dest('dist/fonts'));
}


const clean = () => {
  return del(['dist']);
}

const pugToHtml = () => {
  return src('src/**/*.pug')
    .pipe(pug())
    .pipe(formatHtml())
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

const htmlBuild = () => {
  return src('src/**/*.pug')
  .pipe(pug())
  .pipe(dest('dist'));
}

const styles = () => {
  return src('src/styles/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(cleanCSS({
      level: 2,
      format: {
        breaks: {
          afterAtRule: 2,
          afterBlockBegins: 1,
          afterBlockEnds: 2,
          afterComment: 1,
          afterProperty: 1,
          afterRuleBegins: 1,
          afterRuleEnds: 1,
          beforeBlockEnds: 1,
          betweenSelectors: 0
        },
        indentBy: 2,
        spaces: {
          aroundSelectorRelation: 1,
          beforeBlockBegins: 1,
          beforeValue: 1
        }
      }
    }))
    .pipe(sourceMaps.write())
    .pipe(dest('dist/styles'))
    .pipe(browserSync.stream());
}

const stylesBuild = () => {
  return src('src/styles/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(cleanCSS({ level: 1 }))
    .pipe(dest('dist/styles'))
}

const svgSprites = () => {
  return src('src/img/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack:
        {
          sprite: '../sprite.svg',
        },
      },
    }))
    .pipe(dest('dist/images'));
}

const images = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.jpeg',
    'src/img/**/*.png',
    '!src/img/favicon/*',
  ])
    .pipe(squoosh(() => ({
      encodeOptions: {
        webp: {}
      }
    })))
    .pipe(dest('dist/images'));
}



const icons = () => {
  return src([
    'src/img/favicon/*',
    'src/img/*.svg'
  ])
    .pipe(dest('dist/images'));
}

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js',
  ])
    .pipe(sourceMaps.init())
    .pipe(concat('app.js'))
    .pipe(sourceMaps.write())
    .pipe(dest('dist/script'))
    .pipe(browserSync.stream());
}

const scriptsBuild = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js',
  ])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify({ toplevel: true }).on('error', notify.onError()))
    .pipe(dest('dist/script'));
}


const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
}

watch('src/**/*.pug', pugToHtml);
watch('src/styles/**/*.scss', styles);
watch('src/images/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts);
watch('src/resourses/**', resources);

exports.default = series(clean, fonts, pugToHtml, styles, svgSprites, icons, images, scripts, watchFiles);
exports.build = series(clean, fonts, htmlBuild, stylesBuild, svgSprites, icons, images, scriptsBuild, watchFiles);

