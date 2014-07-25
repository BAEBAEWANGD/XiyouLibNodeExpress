/**
 * Created by 国正 on 2014/7/13.
 */
var express = require('express');
var router = express.Router();
var parsers = require('../modules/parsers');

var doSearch = require('../modules/book/search');

router.use('/search', function (req, res) {
    var keyword = req.param('keyword');
    var suchen_type = req.param('wordType', 1);
    var suchen_match = req.param('matchMethod', 'qx');
    var recordtype = req.param('recordType', 'all');
    var library_id = req.param('lib', 'all');
    var show_type = 'wenzi';
    var size = req.param('size', 20);
    var page = req.param('page', 1);
    var ordersc = req.param('ordersc', 'desc');
    var orderby = req.param('orderby', 'pubdate_date');

    if (page * 1 < 1) {
        page = 1;
    }

    var params = {
        search_no_type: 'Y',
        snumber_type: 'Y',
        suchen_word: keyword,
        suchen_type: suchen_type,
        suchen_match: suchen_match,
        recordtype: recordtype,
        library_id: library_id,
        show_type: show_type,
        "size": size,
        "searchtimes": 1,
        "pagesize": size,
        "page": page,
        "ordersc": ordersc,
        "orderby": orderby,
        "kind": 'simple',
        "curpage": page
    }
    doSearch(params, function (result) {
        parsers.resultProc(req, result, res);
    });
});

module.exports = router;