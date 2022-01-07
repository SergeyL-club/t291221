const port = 1337;
const dbName = "RestApiDef";
const mongoAdr = "localhost";
const mongoPort = "27017";
const dbUrl = `mongodb://${mongoAdr}:${mongoPort}/${dbName}`;
const saltWorkFactor = 10;

export enum ConfigParam {
  port = "port",
  dbName = "dbName",
  dbUrl = "dbUrl",
  saltWorkFactor = "saltWorkFactor",
}

export default {
  port,
  dbName,
  dbUrl,
  saltWorkFactor,
};
