/*global $*/
/*jslint sloppy:true, browser: true, white:true*/

$("h1.page-title").text("WHOOP");
$("img.pig").css({
    left:Math.random()*100 + "%",
    top:Math.random()*100 + "%"
});

var x;
var y;

$(window).on('mousedown', function (e) {
    x = e.pageX / $(window).innerWidth() * 100;
    y = e.pageY / $(window).innerHeight() * 100;
    $('img.logo').css({left: e.pageX,
                       top: e.pageY});
});

var newX;
var newY;

$(window).on('mouseup', function (e) {
    newX = 100 - x;
    newY = 100 - y;
    $('img.logo').css({left: newX + "%",
                       top: newY + "%"});
});
//function randomMargin() {
//    return Math.random() * 200 - 100;
//}
//setInterval(function () {
//    $('.logo').css({
//        'margin-left': randomMargin(),
//        'margin-top': randomMargin()
//    });
//}, 200);