isohunt-api
===========

API to search for torrent files on [isoHunt](https://isohunt.to) website.


Installation
------------

Like every other npm package, run the command
`npm install isohunt-api`


Usage example
-------------

Search torrent files for South Park season 19 episode 6.

```javascript
var isohuntApi = require('isohunt-api');
isohuntApi.search('South Park S19E06', { category: 'tv' }).then(torrentList => {
    torrentList.forEach(torrentInfo => {
        isohuntApi.getTorrentUrl(torrentInfo.infoUrl).then(torrentUrl => {
            console.log(torrentInfo);
            console.log(torrentUrl);
        });
    });
});
```


API functions
-------------

### isohuntApi.search(searchString[, options])

Search and return the list of torrent files found by isohunt.to.

The list is limited to one page of results, 40 items max. It is sorted by seeders count in descending order by default.

#### Parameters

+ **searchString**: The search string
+ **options** *(optional)*: Object containing following optional keys
    - **page** *(optional)*: Integer. Query a specific page of results. Default *1*.
    - **order** *(optional)*: String. *created_at*, *size*, *seeders*. Default *seeders*.
    - **by** *(optional)*: String. *ASC* or *DESC*. Default *DESC*
    - **category** *(optional)*: String. Limit search to a category. Default not specified, search in all categories.

Category list is the following: *tv*, *movies*, *music*, *games*, *software*, *books*, *adult*, *other*.


#### Return value

Returns a promise which is resolved when the search is complete.

This promise returns a list of objects containing the isohunt torrent info url, title, verified status, size, seeders count and rating url.


### isohuntApi.getTorrentUrl(torrentInfoUrl)

Return a torrent file url providing an info url.


#### Parameters

+ **torrentInfoUrl**: A torrent info url (This is found in each object of the list returned by isohuntApi.search())


#### Return value

Returns a promise which is resolved when the torrent url is found.

This promise returns the torrent url string.


### isohuntApi.getMagnetUrl(torrentInfoUrl)

Return a magnet url providing an info url.


#### Parameters

+ **torrentInfoUrl**: A torrent info url (This is found in each object of the list returned by isohuntApi.search())


#### Return value

Returns a promise which is resolved when the magnet url is found.

This promise returns the magnet url string.


### isohuntApi.getDownloadUrls(torrentInfoUrl)

Return an object containing the magnet and the torrent file urls providing an info url.


#### Parameters

+ **torrentInfoUrl**: A torrent info url (This is found in each object of the list returned by isohuntApi.search())


#### Return value

Returns a promise which is resolved when the magnet and torrent file urls are found.

This promise returns an object with *magnetUrl* and *torrentUrl* properties.
