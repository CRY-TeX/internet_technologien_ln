"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app/app"));
var host = 'localhost' || process.env.HOST;
var port = 3000 || process.env.PORT;
var app = new app_1.default(host, port);
app.start();
//# sourceMappingURL=index.js.map