
    // достаем функции, которые нам потребуются(из gulp пакета)
    const { src, dest, parallel, series, watch } = require('gulp');
     

    // Подключаем пакеты:
    
    //browserSync - браузеры автоматически обновляются с каждым изменением вашего HTML, CSS, изображений и других файлов проекта
    const browserSync = require('browser-sync').create();
     
    //gulp-concat - обьеденяет файлы в один
    const concat = require('gulp-concat');
     
    //gulp-uglify-es - сжимает js (es6)
    const uglify = require('gulp-uglify-es').default;
    
    // Autoprefixer - автоматически расставляет префиксы к CSS свойствам
    const autoprefixer = require('gulp-autoprefixer');
     
    // gulp-clean-css - минифицировать css
    const cleancss = require('gulp-clean-css');
     
    //gulp-imagemin - для минификации изображений
    const imagemin = require('gulp-imagemin');
     
    //gulp-newer  -запускают таски только для изменившихся файлов
    const newer = require('gulp-newer');
     
    //del - пакет удаления
    const del = require('del');
     


    function browsersync() {
        browserSync.init({ 
            server: { baseDir: 'app/' },
            notify: false
        })
    }
     
    function scripts() {
        return src('app/js/common.js')
        .pipe(concat('app.min.js')) 
        .pipe(uglify()) 
        .pipe(dest('app/js/')) 
        .pipe(browserSync.stream()) 
    }
     
    function styles() {
        return src('app/css/main.css') 
        .pipe(concat('app.min.css')) 
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
        .pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
        .pipe(dest('app/css/')) 
        .pipe(browserSync.stream()) 
    }
     
    function images() {
        return src('app/img/**/*') 
        .pipe(newer('app/img/dest/')) 
        .pipe(imagemin()) 
        .pipe(dest('app/img/dest/')) 
    }
     
    function cleanimg() {
        return del('app/img/dest/**/*', { force: true }) 
    }
     
    function buildcopy() {
        return src([ 
            'app/css/**/*.min.css',
            'app/js/**/*.min.js',
            'app/images/dest/**/*',
            'app/**/*.html',
            ], { base: 'app' }) 
        .pipe(dest('dist')) 
    }
     
    function cleandist() {
        return del('dist/**/*', { force: true }) 
    }
     
    function startwatch() {
        watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
        watch('app/**/*.css', styles);
        watch('app/**/*.html').on('change', browserSync.reload);
        watch('app/img/src/**/*', images);
    }
     
    
    exports.browsersync = browsersync;
    exports.scripts = scripts;
    exports.styles = styles;
    exports.images = images;
    exports.cleanimg = cleanimg;
    exports.build = series(cleandist, styles, scripts, images, buildcopy);
    exports.default = parallel(styles, scripts, browsersync, startwatch);