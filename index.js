var url = "http://0.0.0.0:5601/app/kibana#/visualize/edit/011aa910-129d-11e8-8fc0-11ced9bb97c1?_g=(refreshInterval%3A(display%3AOff%2Cpause%3A!f%2Cvalue%3A0)%2Ctime%3A(from%3Anow-5y%2Cmode%3Aquick%2Cto%3Anow))&_a=(filters%3A!()%2Clinked%3A!f%2Cquery%3A(language%3Alucene%2Cquery%3A'')%2CuiState%3A()%2Cvis%3A(aggs%3A!((enabled%3A!t%2Cid%3A'1'%2Cparams%3A()%2Cschema%3Ametric%2Ctype%3Acount)%2C(enabled%3A!t%2Cid%3A'2'%2Cparams%3A(field%3Ageo.src%2CmissingBucket%3A!f%2CmissingBucketLabel%3AMissing%2Corder%3Adesc%2CorderBy%3A'1'%2CotherBucket%3A!f%2CotherBucketLabel%3AOther%2Csize%3A5)%2Cschema%3Asegment%2Ctype%3Aterms))%2Cparams%3A(addLegend%3A!t%2CaddTooltip%3A!t%2CisDonut%3A!t%2Clabels%3A(last_level%3A!t%2Cshow%3A!f%2Ctruncate%3A100%2Cvalues%3A!t)%2ClegendPosition%3Aright%2Ctype%3Apie)%2Ctitle%3A'Just%20a%20pie'%2Ctype%3Apie))&forceNow=2018-03-08T14%3A15%3A34.682Z"
var delayMs = 5000;

var page = require('webpage').create();
var onError = function (err) {
    console.log(err);
};

page.onError = function (err) {
    console.log(JSON.stringify(err));
};

page.onResourceError = function (err) {
    console.log(JSON.stringify(err));
};

page.onConsoleMessage = function (message) {
    console.log(message);
};

page.onLoadFinished = function(status) {
  console.log('onLoadFinished: ' + status);
};

page.onResourceRequested = function(requestData, networkRequest) {
  console.log('Request (#' + requestData.id + '): ' + JSON.stringify(requestData));
};

try {

    page.viewportSize = { width: 1950, height: 1200 };
    page.open(url, function (status) {
        if (status === "success") {


            page.evaluate(function () {
                 window.addEventListener("load", function(event) {
                    console.log("All resources finished loading!");
                });
            });

            setTimeout(function () {
                page.render('screenshot.png');
                phantom.exit();
            }, delayMs);

        } else {
            console.log('status');
            phantom.exit();
        }
    });
} catch (err) {
    onError(err);
}
