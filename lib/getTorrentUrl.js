var request     = require('request-promise'),
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

module.exports = function getTorrentUrl (urlInfo) {
    return _getTorrentInfoBody(urlInfo).then(_getTorrentUrl);
};
