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
exports.generateSafelist = generateSafelist;
var transformContent_1 = require("./transformContent");
/**
 * Генерирует список классов Tailwind для safelist в tailwind.config.js
 * на основе маппинга классов из transformContent
 */
function generateSafelist() {
    var allClassMaps = __assign(__assign({}, transformContent_1.classMap), transformContent_1.colorMap);
    // Извлекаем все классы Tailwind из маппинга
    var tailwindClasses = Object.values(allClassMaps)
        .filter(function (value) { return Boolean(value); }) // Удаляем пустые значения и уточняем тип
        .flatMap(function (classString) { return classString.split(' '); }) // Разбиваем строки с несколькими классами
        .filter(Boolean); // Удаляем пустые строки
    // Удаляем дубликаты
    return Array.from(new Set(tailwindClasses));
}
// Для удобства вывода в консоль при разработке
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('Tailwind Safelist:', generateSafelist());
}
