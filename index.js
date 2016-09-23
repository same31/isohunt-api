module.exports = {
    search:          require('./lib/search'),
    getTorrentUrl:   require('./lib/getDownloadUrls').getTorrentUrl,
    getMagnetUrl:    require('./lib/getDownloadUrls').getMagnetUrl,
    getDownloadUrls: require('./lib/getDownloadUrls').getDownloadUrls
};
