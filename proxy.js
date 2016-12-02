var request = require('request'),
    url = require('url');

var config = require('./.config.json');

var CAS_SERVER = config.DEFAULT_CAS_SERVER;

var args = process.argv.slice(2),
    targetIndex = process.env.PROXY_TARGET || "DEFAULT",
    Target, COOKIE = "";

Target = config.TARGET_LIST[targetIndex.toUpperCase()];

module.exports = function() {
    return config.proxyPaths.map((path, inndex) => {
        return {
            path,
            target: Target,
            secure: false,
            bypass: proxyPass
        }
    })
}

function proxyPass(req, res, options) {
    res.on('finish', function(){
        if (res.statusCode === 401 && res._headers.urltoredirectto) {
            var location = res._headers.urltoredirectto;
            console.error('COOKIE expired, redirect to ',location, ' for new COOKIE');
            login({
                username: config.username,
                password: config.password,
                location: location
            }, function(cookieKV){
                console.log('COOKIE has been set as ', cookieKV);
                COOKIE = cookieKV;
            })
        };
    });
    req.headers.cookie = COOKIE;
}

function login(options, callback) {
    var username = options.username,
        password = options.password,
        CAS_SERVER = options.server || CAS_SERVER,
        service = options.service || (Target + "/");
    if (options.location) {
        var result = url.parse(options.location),
            _server = result.protocol+"//"+result.host,
            _service = result.query.split("=")[1];
        CAS_SERVER = _server,
        service = decodeURIComponent(_service)+"/";
    }

    getTGTLocation(username, password, function(error, location){
        getTicket(location, service, function(ticket){
            request.get(service+"?ticket="+ticket, function(error, response, body){
                var cookieKV;
                if (~response.request.uri.href.indexOf('jsessionid')) {
                    cookieKV = response.request.uri.href.split(";")[1].toUpperCase();
                }else {
                    var referer = response.request.headers.referer,
                        cookieKV = referer.split(";")[1].toUpperCase();
                }

                callback(cookieKV);
            })
        })
    })
}

function getTGTLocation(username, password, callback) {
    request.post({
        url: CAS_SERVER + '/v1/tickets',
        form: {
            username: username,
            password: password
        }
    }, function(error, response, body){
        var location = response.headers.location;
        callback(null, location)
    })
}

function getTicket(location, service, callback) {
    request.post({
        url: location,
        form: {
            service: service
        }
    }, function(error, response, body){
        callback(body);
    })
}
