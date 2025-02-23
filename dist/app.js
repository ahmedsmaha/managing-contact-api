"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const contact_routes_1 = require("./routes/contact.routes");
const auth_routes_1 = require("./routes/auth.routes");
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, multer_1.default)().none());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/contacts", contact_routes_1.ContactRoutes);
app.use("/api/auth", auth_routes_1.AuthRoutes);
