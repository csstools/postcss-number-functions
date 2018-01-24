# PostCSS Number Functions [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Linux Build Status][cli-img]][cli-url]
[![Windows Build Status][win-img]][win-url]
[![Gitter Chat][git-img]][git-url]

[PostCSS Number Functions] lets you use [Sass Number Functions] in CSS, which
include `abs()`, `ceil()`, `floor()`, `max()`, `min()`, `percentage()`,
`random()` and `round()`.

```css
.example {
  width: floor(500px / 3);
}

/* becomes */

.example {
  width: 166px;
}
```

## Features

### abs

The `abs()` function returns a number with its absolute value, preserving
its CSS unit.

### ceil

The `ceil()` function returns a number rounded up to a whole number, preserving
its CSS unit.

### floor

The `floor()` function returns a number rounded down to a whole number,
preserving its CSS unit.

### max

The `max()` function returns the maximum value of several numbers separated by
commas, preserving its CSS unit.

### min

The `min()` function returns the minimum value of several numbers separated by
commas, preserving its CSS unit.

### percentage

The `percentage()` function returns the percentage from a number, transforming
its CSS unit into `%`.

### random

The `random()` function returns a random, unitless number between 0 and 1,
including 0 but not including 1. If it is passed one number then it returns a
random number between 0 and that number, including both numbers and preserving
the unit of the argument. If it is passed two arguments then it returns a
random number between those numbers, including both numbers and preserving the
unit of the later argument.

### round

The `floor()` function returns a number rounded to the nearest whole number,
preserving its CSS unit.

## Usage

Add [PostCSS Number Functions] to your build tool:

```bash
npm install postcss-number-functions --save-dev
```

#### Node

Use [PostCSS Number Functions] to process your CSS:

```js
import PostCSSNumberFunctions from 'postcss-number-functions';

PostCSSNumberFunctions.process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Use [PostCSS Number Functions] as a plugin:

```js
import postcss from 'gulp-postcss';
import PostCSSNumberFunctions from 'postcss-number-functions';

postcss([
  PostCSSNumberFunctions()
]).process(YOUR_CSS);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Use [PostCSS Number Functions] in your Gulpfile:

```js
import postcss from 'gulp-postcss';
import PostCSSNumberFunctions from 'postcss-number-functions';

gulp.task('css', () => gulp.src('./src/*.css').pipe(
  postcss([
    PostCSSNumberFunctions()
  ])
).pipe(
  gulp.dest('.')
));
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Use [PostCSS Number Functions] in your Gruntfile:

```js
import PostCSSNumberFunctions from 'postcss-number-functions';

grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
  postcss: {
    options: {
      use: [
       PostCSSNumberFunctions()
      ]
    },
    dist: {
      src: '*.css'
    }
  }
});
```

[npm-url]: https://www.npmjs.com/package/postcss-number-functions
[npm-img]: https://img.shields.io/npm/v/postcss-number-functions.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-number-functions
[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-number-functions.svg
[win-url]: https://ci.appveyor.com/project/jonathantneal/postcss-number-functions
[win-img]: https://img.shields.io/appveyor/ci/jonathantneal/postcss-number-functions.svg
[git-url]: https://gitter.im/postcss/postcss
[git-img]: https://img.shields.io/badge/chat-gitter-blue.svg

[PostCSS Number Functions]: https://github.com/jonathantneal/postcss-number-functions
[PostCSS]: https://github.com/postcss/postcss
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[Sass Number Functions]: https://sass-lang.com/documentation/Sass/Script/Functions.html
