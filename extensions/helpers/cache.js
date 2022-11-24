"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCacheValue = exports.getCacheValue = exports.disposeCacheClient = exports.createCacheClient = void 0;
const redis_1 = require("redis");
const createCacheClient = (url = process.env.CACHE_REDIS) => __awaiter(void 0, void 0, void 0, function* () {
    const client = (0, redis_1.createClient)({ url });
    yield client.connect();
});
exports.createCacheClient = createCacheClient;
const disposeCacheClient = (client) => __awaiter(void 0, void 0, void 0, function* () { return yield client.close(); });
exports.disposeCacheClient = disposeCacheClient;
const getCacheValue = (key, providedClient = null) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = providedClient != null ? providedClient : yield (0, exports.createCacheClient)();
        return yield client.get(key);
    }
    catch (error) {
        return null;
    }
});
exports.getCacheValue = getCacheValue;
const setCacheValue = (key, value, providedClient = null) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = providedClient != null ? providedClient : yield (0, exports.createCacheClient)();
        return yield client.set(key, value);
    }
    catch (error) {
        return false;
    }
});
exports.setCacheValue = setCacheValue;
