var request           = require('request-promise'),
    host              = require('./globals').host,
    headers           = require('./globals').headers,
    _domain           = 'https://' + host,
    _url              = _domain + '/torrents/';

function _getCategoryParameter (category) {
    if (!category) {
        // All
        return '';
    }

    category = category.toLowerCase();

    if (category === 'movies') {
        return 5;
    }
    if (category === 'tv') {
        return 8;
    }
    if (category === 'music') {
        return 6;
    }
    if (category === 'games') {
        return 3;
    }
    if (category === 'software') {
        return 2;
    }
    if (category === 'books') {
        return 9;
    }
    if (category === 'adult') {
        return 4;
    }
    if (category === 'other') {
        return 7;
    }

    // All
    return '';
}

function _getSearchResults (body) {
    var searchResultList = [],
        regexp,
        row;

    regexp = /<td class="title-row"><a href="(.+?)"><span>(.+?)<\/span>.+?(Verified Torrent)?.+?<td class="date-row">(.+?)<\/td><td class="size-row">(.+?)<\/td><td class="sy">(.+?)<\/td><td class="rating-row">(.+?)<\/td>/g;

    while ((row = regexp.exec(body)) !== null) {
        searchResultList.push({
            infoUrl:  row[1] && _domain + row[1],
            title:    row[2],
            verified: Boolean(row[3]),
            age:      row[4],
            size:     row[5],
            seeders:  row[6],
            rating:   row[7]
        });
    }

    return searchResultList;
}

module.exports = function _search (searchString, options) {
    options || (options = {});

    var qs = {
        ihq:          searchString,
        iht:          _getCategoryParameter(options.category),
        Torrent_sort: options.order ? options.order.toLowerCase() : 'seeders',
        Torrent_page: ((parseInt(options.page) || 1) - 1) * 40
    };

    if (!options.by || options.by.toUpperCase() === 'DESC') {
        qs.Torrent_sort = '-' + qs.Torrent_sort;
    }

    if (options.verified) {
        qs.status = 1;
    }

    return request({
        uri:                     _url,
        qs:                      qs,
        gzip:                    true,
        resolveWithFullResponse: true,
                                 headers
    }).then(response => _getSearchResults(response.body));
};
