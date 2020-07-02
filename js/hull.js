// await sleep(100);
var points = [];
var text = "";
var dict = {};
var temp = [];
var convex = [];
var alldata = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function numbers(inside) {
    var value = Math.random();
    if (value > 0.5 && inside != "left") {
        value = value - 0.45;
    }
    if (value < 0.15 && inside != "left") {
        value = value + 0.02;
    }
    if (value > 0.85 && inside == "left") {
        value = value - 0.05;
    }
    if (value < 0.15 && inside == "left") {
        value = value + 0.05;
    }
    return value * 1800;
}

function setup() {
    points = [];
    text = "";
    var total = 200;
    for (let i = 0; i < total; i++) {
        points.push(
            [
                numbers("left"),
                numbers("top")
            ]
        );
    }
    
    for (let i = 0; i < total; i++) {
        text = text + "<div id='point" + Math.abs(Math.round(points[i][0])) + "' class='cell' style='margin-left:" + points[i][0] + "px; margin-top:" + points[i][1] + "px; z-index:" + i + "' ></div>";
    };
    document.getElementById("main").innerHTML = text;
    
}

function show() {
    document.getElementById("choices").style.display = "flex";
}

function hide() {
    document.getElementById("choices").style.display = "none";
}

function findPosition(a, b, c) {
    var res = (c[1] - a[1]) * (b[0] - a[0]) - (b[1] - a[1]) * (c[0] - a[0]);
    if (res == 0){
        return 0;
    } 
    if (res > 0) {
        return 1;
    }
    return -1;
}

function segmentDistance(a, b, c) {
    var res = Math.abs((c[1] - a[1]) * (b[0] - a[0]) - (b[1] - a[1]) * (c[0] - a[0]));
    return res;
}

function finalDraw(text, s, t, dict) {
    for(var i = 0; i < s.length; i++) {
        var r = Math.floor(s[i][0] + s[i + 1][0]);
        dict[r] = generateString();
        text = text + "<div id='" + dict[r] + "'><svg  width='1800' height='1000' style='position: absolute'><line x1='" + (s[i][0] + 2)+ "' y1='" + (s[i][1] + 2) + "' x2='" + (s[i + 1][0] + 2) + "' y2='" + (s[i + 1][1] + 2) + "' stroke='green'/></svg></div>";
        i = i + 1;
    }
    document.getElementById("main").innerHTML = text;
    for (var i = 0; i < t.length; i = i + 2) {
        var r = Math.floor(t[i][0] + t[i + 1][0]);
        document.getElementById(dict[r]).style.display = "none";
    }
}

function draw(text, s, t, dict) {
    for(var i = 0; i < s.length; i++) {
        var r = Math.floor(s[i][0] + s[i + 1][0]);
        dict[r] = generateString();
        text = text + "<div id='" + dict[r] + "'><svg  width='1800' height='1000' style='position: absolute'><line x1='" + (s[i][0] + 2)+ "' y1='" + (s[i][1] + 2) + "' x2='" + (s[i + 1][0] + 2) + "' y2='" + (s[i + 1][1] + 2) + "' stroke='white'/></svg></div>";
        i = i + 1;
    }
    document.getElementById("main").innerHTML = text;
    for (var i = 0; i < t.length; i = i + 2) {
        var r = Math.floor(t[i][0] + t[i + 1][0]);
        document.getElementById(dict[r]).style.display = "none";
    }
}

async function quickhull(a, x, y, convex, orient, text, temp, dict, g, checker) {
    var highestPoint;
    var farthest = 0;
    var check = false;
    for (var i = 0; i < a.length; i++) {
        var dist = segmentDistance(x, y, a[i]);
        if ((findPosition(x, y, a[i]) == orient) && (dist > farthest)) {
            highestPoint = a[i];
            farthest = dist;
            check = true;
        }
    }
    
    if (!check) {
        temp.pop();
        temp.pop();
        return;
    }
    convex.push(highestPoint);
    
    
    g.push(x);
    g.push(highestPoint);
    g.push(highestPoint);
    g.push(y);
    draw(text, g, temp, dict);
    await sleep(1000);
    if (checker == false) {
        temp.push(x);
        temp.push(y);
    }
    temp.push(x);
    temp.push(highestPoint);
    console.log("Check : " + temp.slice());
    console.log("----------------------");
    quickhull(points, x, highestPoint, convex, orient, text, temp, dict, g, true);
    temp.push(highestPoint);
    temp.push(y);    
    quickhull(points, highestPoint, y, convex, orient, text, temp, dict, g, true);
}

function generateString() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 23; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function qHull() {
    document.getElementById("main").innerHTML = "";
    hide();
    temp = [];
    dict = {};
    convex = [];
    alldata = [];

    setup();
    var minimumX;
    var maximumX;
    
    points.sort(function(a, b) { return a[0] - b[0]});
    minimumX = points[0];
    maximumX = points[points.length - 1];
    convex.push(minimumX);
    convex.push(maximumX);
    alldata = [minimumX, maximumX];
    quickhull(points, minimumX, maximumX, convex, 1, text, temp, dict, alldata, true);
    await sleep(3000);
    quickhull(points, minimumX, maximumX, convex, -1, text, temp, dict, alldata, false);
    await sleep(3500);
    finalDraw(text, alldata, temp, dict);
    show();

}
