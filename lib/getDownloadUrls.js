var request = require('request-promise'),
    headers = require('./globals').headers;

function _getTorrentInfoBody (urlInfo) {
    return request({
        uri:                     urlInfo,
        gzip:                    true,
        resolveWithFullResponse: true,
                                 headers
    }).then(response => response.body);
}

function _getTorrentUrl (body) {
    var match = body.match(/"(https:\/\/torrent\.isohunt\.to\/download\.php.+?)"/);
    return match && match[1];
}

function _getMagnetUrl (body) {
    var match = body.match(/"(magnet:.+?)"/);
    return match && match[1];
}

function _getDownloadUrls (body) {
    return {
        torrentUrl: _getTorrentUrl(body),
        magnetUrl:  _getMagnetUrl(body)
    }
}

function getTorrentUrl (urlInfo) {
    return _getTorrentInfoBody(urlInfo).then(_getTorrentUrl);
}

function getMagnetUrl (urlInfo) {
    return _getTorrentInfoBody(urlInfo).then(_getMagnetUrl);
}

function getDownloadUrls (urlInfo) {
    return _getTorrentInfoBody(urlInfo).then(_getDownloadUrls);
}

module.exports = {
    getTorrentUrl,
    getMagnetUrl,
    getDownloadUrls
};

