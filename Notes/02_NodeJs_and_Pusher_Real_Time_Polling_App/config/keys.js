module.exports = {
  mongoURI: process.env.DATABASE,
  pusherAppId: process.env.APPID,
  pusherKey: process.env.KEY,
  pusherSecret: process.env.SECRET,
  pusherCluster: process.env.CLUSTER,
  pusherEncrypted: true,
};
