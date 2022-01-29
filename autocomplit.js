"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (arr) => {
    return (str = '') => {
        const processedStr = str.trim().toLowerCase();
        if (processedStr.length > 0) {
            return arr.filter(el => el.slice(0, processedStr.length).toLowerCase() === processedStr);
        }
        return [];
    };
};
