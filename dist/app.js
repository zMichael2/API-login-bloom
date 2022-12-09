"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./database/database"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
dotenv_1.default.config();
(0, database_1.default)();
const port = process.env.PORT || 3000;
exports.app = (0, express_1.default)();
const apiParhs = {
    authentication: "/api/authentication",
};
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.use(apiParhs.authentication, auth_router_1.default);
exports.app.get("/", (req, res) => {
    res.json({ message: "Welcome to API Bloom", version: "2.0.0" });
});
exports.app.listen(port, () => {
    console.log(`Server initialized on port ${port}`);
});
//# sourceMappingURL=app.js.map