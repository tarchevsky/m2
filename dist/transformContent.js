"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformContent = exports.colorMap = exports.classMap = void 0;
exports.classMap = {
    // Основные текстовые классы
    'wp-block-paragraph': 'mb-4',
    'wp-block-heading': 'font-bold',
    'has-small-font-size': 'text-sm',
    'has-medium-font-size': 'text-lg',
    'has-large-font-size': 'text-xl',
    'has-x-large-font-size': 'text-2xl',
    'has-xx-large-font-size': 'text-3xl',
    // Выравнивание текста
    'has-text-align-left': 'text-left',
    'has-text-align-center': 'text-center',
    'has-text-align-right': 'text-right',
    'has-text-align-justify': 'text-justify',
    // Основные выравнивания блоков
    'alignwide': 'max-w-screen-lg mx-auto',
    'alignfull': 'w-full',
    'alignleft': 'float-left mr-4',
    'alignright': 'float-right ml-4',
    'aligncenter': 'mx-auto',
    // Группы и контейнеры
    'wp-block-group': 'mb-8',
    'wp-block-cover': 'relative py-12 bg-cover bg-center',
    // Медиа блоки
    'wp-block-image': 'my-8',
    'wp-block-gallery': 'grid grid-cols-2 md:grid-cols-3 gap-4 my-8',
    'wp-block-video': 'my-8',
    'wp-block-audio': 'my-6',
    'wp-block-file': 'flex items-center p-4 bg-gray-100 rounded',
    'wp-block-media-text': 'grid md:grid-cols-2 gap-4 my-8',
    'wp-block-embed': 'my-8',
    // Колонки
    'wp-block-columns': 'flex flex-wrap md:flex-nowrap gap-6 mb-8',
    'wp-block-column': 'w-full md:flex-1',
    // Списки и таблицы
    'wp-block-list': 'list-disc pl-8 mb-6',
    'wp-block-table': 'w-full mb-6',
    'has-fixed-layout': 'table-fixed',
    'is-style-stripes': 'even:bg-gray-100',
    // Кнопки и интерактивные элементы
    'wp-block-button': 'inline-block mb-4 mr-4',
    'wp-block-button__link': 'px-6 py-2 rounded font-medium',
    'is-style-outline': 'border-2 bg-transparent',
    'wp-block-buttons': 'flex flex-wrap gap-4 my-6',
    'wp-block-search': 'mb-8',
    'wp-block-social-links': 'flex gap-3 my-6',
    // Цитаты и разделители
    'wp-block-quote': 'pl-4 border-l-4 border-gray-300 italic my-8',
    'wp-block-separator': 'border-t my-8',
    'wp-block-spacer': 'my-8',
    // Цвета и фоны
    'has-background': 'p-4',
    'has-text-color': '', // Нужно обрабатывать конкретные цвета отдельно
    'has-background-color': '', // Нужно обрабатывать конкретные цвета отдельно
    // Вертикальное выравнивание
    'is-vertically-aligned-top': 'items-start',
    'is-vertically-aligned-center': 'items-center',
    'is-vertically-aligned-bottom': 'items-end',
    // Дополнительные стили
    'has-drop-cap': 'first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2',
    'is-style-rounded': 'rounded-full',
    // Отступы (примеры, нужно дополнить для всех размеров)
    'has-small-margin-top': 'mt-2',
    'has-small-margin-bottom': 'mb-2',
    'has-medium-margin-top': 'mt-4',
    'has-medium-margin-bottom': 'mb-4',
    'has-large-margin-top': 'mt-8',
    'has-large-margin-bottom': 'mb-8',
};
exports.colorMap = {
    'has-primary-color': 'text-blue-600',
    'has-primary-background-color': 'bg-blue-600',
    'has-secondary-color': 'text-purple-600',
    'has-secondary-background-color': 'bg-purple-600',
    'has-white-color': 'text-white',
    'has-white-background-color': 'bg-white',
    'has-black-color': 'text-black',
    'has-black-background-color': 'bg-black',
    'has-gray-color': 'text-gray-600',
    'has-gray-background-color': 'bg-gray-200',
};
var allClassMaps = __assign(__assign({}, exports.classMap), exports.colorMap);
var transformContent = function (content) {
    var transformedContent = content;
    Object.entries(allClassMaps).forEach(function (_a) {
        var wpClass = _a[0], tailwindClass = _a[1];
        if (!tailwindClass)
            return; // Пропускаем пустые соответствия
        var regex = new RegExp("class=\"([^\"]*?)".concat(wpClass, "([^\"]*?)\""), 'g');
        transformedContent = transformedContent.replace(regex, function (match, p1, p2) {
            return "class=\"".concat(p1).concat(tailwindClass).concat(p2, "\"");
        });
    });
    return transformedContent;
};
exports.transformContent = transformContent;
