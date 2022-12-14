const { src, dest, series, parallel, watch } = require("gulp");
const del = require("del");
const browserSync = require("browser-sync").create();

const babel = require("gulp-babel");
const origin = "src";
const destination = "build";

async function clean(cb) {
    await del(destination);
    cb();
}

function html(cb) {
    src(`${origin}/*.html`).pipe(dest(destination));
    cb();
}

function css(cb) {
    src(`${origin}/*.css`).pipe(dest(destination));
    cb();
}

function js(cb) {
    src(`${origin}/*.js`)
        .pipe(
            babel({
                presets: ["@babel/preset-env"],
            })
        )
        .pipe(dest(destination));
    cb();
}

function watcher(cb) {
    watch(`${origin}/*.html`).on("change", series(html, browserSync.reload));
    watch(`${origin}/*.css`).on("change", series(css, browserSync.reload));
    watch(`${origin}/*.js`).on("change", series(js, browserSync.reload));
    cb();
}

function server(cb) {
    browserSync.init({
        notify: false,
        open: false,
        server: {
            baseDir: destination,
        },
    });
    cb();
}

exports.default = series(clean, parallel(html, css, js), server, watcher);
