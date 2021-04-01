let project_folder= require("path").basename(__dirname);
let assets = project_folder+'/assets';
let source_folder="#src";
let soures_assets = source_folder+'/assets';
let fs = require('fs');

let path={
    build:{
        html: project_folder+"/",
        css: assets+"/css/",
        js: assets+"/js/",
        img: assets+"/img/",
        fonts: assets+"/fonts/"
    },
    src:{
        html: [source_folder+"/*.html","!"+source_folder+"/_*.html"],
        css: soures_assets+"/scss/style.scss",
        js: soures_assets+"/js/script.js",
        img: soures_assets+"/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: soures_assets+"/fonts/*.ttf"
    },
    watch:{
        html: source_folder+"/**/*.html",
        css: soures_assets+"/scss/**/*.scss",
        js: soures_assets+"/js/**/*.js",
        img: soures_assets+"/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: ["./"+assets+"/css/","./"+assets+"/js/","./"+assets+"/*.html"]
}

let {src,dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync=require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require("del"),
    scss = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    groupmedia = require("gulp-group-css-media-queries"),
    cleancss = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    imagemin = require("gulp-imagemin"),
    webp = require('gulp-webp'),
    webp_html = require('gulp-webp-html'),
    webpcss = require("gulp-webp-css"),
    svgsprite = require("gulp-svg-sprite"),
    ttf2woff = require("gulp-ttf2woff"),
    ttf2woff2 = require("gulp-ttf2woff2"),
    fonter = require("gulp-fonter");
function everyTimeEvent(params) {}

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./"+project_folder+"/"
        },
        port: 3000,
        notify: false,
        online: true
    })
}

function html(){
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webp_html())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css(){
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(groupmedia())
        .pipe(
            autoprefixer({
                grid: "autoplace",
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(webpcss({}))
        .pipe(dest(path.build.css))
        .pipe(cleancss())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js(){
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

/* Функция по конвертации картинок, */
function images(){
    return src(path.src.img)
        .pipe(
            webp({
                quality: 100
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox:false}],
                interlaced: true,
                optimizationLevel: 2 //0 to 7
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}
function fonts(params){
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
}
gulp.task('otf2ttf', function (){
    return src([soures_assets+'/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(soures_assets+'/fonts/'))
})
gulp.task('svgsprite', function (){
    return gulp.src([soures_assets+'/iconsprite/*.svg'])
        .pipe(svgsprite({
            mode: {
                stack: {
                    sprite: "/icons/icon.svg",
                    //example:true
                }
            }
        }))
        .pipe(dest(path.build.img))
})

function fontsStyle(params) {
    let file_content = fs.readFileSync(soures_assets + '/scss/modules/fonts.scss');
    if (file_content == '') {
        fs.writeFile(soures_assets + '/scss/modules/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(soures_assets + '/scss/modules/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}
function cb() {}
function watchFiles(params) {
    gulp.watch([path.watch.html],html);
    gulp.watch([path.watch.css],css);
    gulp.watch([path.watch.js],js);
    gulp.watch([path.watch.img],images);
}
function clean(params){
    return del(path.clean);
}

let build = gulp.series(clean,gulp.parallel(js,css,html,images,/*fonts*/),/*fontsStyle*/);
let watch = gulp.parallel(build,watchFiles,browserSync);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
