import * as API from './api.js';

const shard = new API.Shard();

shard.on("fileUpdate", console.log);