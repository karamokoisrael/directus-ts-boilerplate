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
exports.restore = exports.deleteBackup = exports.getDumpList = void 0;
// import mysql from "mysql";
// import mysqldump from "mysqldump" ;
const Importer = require('mysql-import');
const path = require('path');
const fs = require('fs');
//joining path of directory 
const getDumpList = () => {
    const directoryPath = path.join(__dirname, '../../migration');
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return reject(err);
            }
            const dumpList = [];
            files.forEach(function (file) {
                dumpList.push(file);
            });
            resolve(dumpList);
        });
    });
};
exports.getDumpList = getDumpList;
const deleteBackup = (id, callBack) => {
    fs.unlink(`./migration/${id}`, callBack);
};
exports.deleteBackup = deleteBackup;
// export const dump = ()=>{
//     const dumpPath = './migration';
//     const fileAge = 24 * 7 * 3600
//     fs.readdir(dumpPath, function(err: any, files: string[]) {
//         files.forEach(function(file, index) {
//             fs.stat(path.join(dumpPath, file), function(err: any, stat: Record<string, any>) {
//                 let endTime, now;
//                 if (err) {
//                     return console.error(err);
//                 }
//                 now = new Date().getTime();
//                 endTime = new Date(stat.ctime).getTime() + fileAge*1000;
//                 if (now > endTime) {
//                     fs.unlink(`${dumpPath}/${file}`, ()=>{
//                         console.log("deleting => ", file);
//                     })
//                 }
//             });
//         });
//     });
//     const dumpName = new Date().toString().replace(/ /g,'_').replace(".sql", "");
//     mysqldump({
//         connection: {
//             host: process.env.DB_HOST as string,
//             user: process.env.DB_USER as string,
//             password: process.env.DB_PASSWORD as string,
//             database: process.env.DB_DATABASE as string,
//         },
//         dumpToFile: `${dumpPath}/${dumpName}.sql`,
//     });
// }
const restore = (fileName = 'dump') => __awaiter(void 0, void 0, void 0, function* () {
    const dumpPath = './migration';
    const database = require('knex')({
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        }
    });
    try {
        // fs.readFile('../../templates/sql/clear.sql', 'utf8' , (err: any, data: string) => {
        //     if (err) {
        //     console.error(err)
        //     return
        //     }
        //     console.log(data)
        // })
        yield database.raw(`
                    DROP DATABASE ${process.env.DB_DATABASE};
            `);
        yield database.raw(`
                    CREATE DATABASE ${process.env.DB_DATABASE};
            `);
    }
    catch (error) {
        console.log(error);
    }
    const importer = new Importer({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE });
    importer.onProgress((progress) => {
        var percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
        console.log(`${percent}% Completed`);
    });
    importer.import(`${dumpPath}/${fileName.replace(".sql", "")}.sql`).then(() => {
        var files_imported = importer.getImported();
        console.log(`${files_imported.length} SQL file(s) imported.`);
    }).catch((e) => {
        console.error(e);
    });
});
exports.restore = restore;
// export const getConnection = ()=>{
//     const connection = mysql.createConnection({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//     });
//     return connection;
// }
