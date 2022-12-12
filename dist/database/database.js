"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnetion = async () => {
    const Urlmongol = `${process.env.URLMONGOL}`;
    try {
        await mongoose_1.default.connect(Urlmongol);
        console.log("The database has been successfully connected.");
    }
    catch (error) {
        console.log(`Could not connect to database: ${error}`);
    }
};
exports.default = dbConnetion;
//# sourceMappingURL=database.js.map