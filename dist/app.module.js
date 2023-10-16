"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const chat_module_1 = require("./chat/chat.module");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("./schemas/users/users.module");
const groups_module_1 = require("./schemas/groups/groups.module");
const docs_module_1 = require("./schemas/docs/docs.module");
const s3_module_1 = require("./s3/s3.module");
const files_module_1 = require("./files/files.module");
const bot_module_1 = require("./bot/bot.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            chat_module_1.ChatModule,
            mongoose_1.MongooseModule.forRoot(`mongodb+srv://pawankumarudassi:${process.env.MONGO_PASS}@cluster0.gosbfg9.mongodb.net/?retryWrites=true&w=majority`),
            users_module_1.UsersModule,
            groups_module_1.GroupsModule,
            docs_module_1.DocsModule,
            s3_module_1.S3Module,
            files_module_1.FilesModule,
            bot_module_1.BotModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map