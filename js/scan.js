function distance(a, b) {
    var res = ((b[0] - a[0]) ** 2) + ((b[1] - a[1]) ** 2);
    res = Math.sqrt(res);
    return res; 
}

function orientation(p, q, r) {
    var r = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
    if (r == 0) return 0;
    return (r > 0) ? 1 : -1;
}

function compare(a, b) { 
    var p = bottomMost;
    var o = orientation(p, a, b); 
    if (o == 0) 
        return (distance(p, b) >= distance(p, a))? -1 : 1; 
   return (o == -1)? -1: 1; 
}

function drawLines(txt, stack, condition) {
    var x = txt;
    if (!condition) {
        for (var i = 0; i < stack.length - 1; i++) {    
            x = x + "<svg width='1800' height='1000' style='position: absolute'><line x1='" + (stack[i][0] + 2)+ "' y1='" + (stack[i][1] + 2) + "' x2='" + (stack[i + 1][0] + 2) + "' y2='" + (stack[i + 1][1] + 2) + "' stroke='white'/></svg>";
        }
    } else {
        for (var i = 0; i < stack.length - 1; i++) {  
            x = x + "<svg width='1800' height='1000' style='position: absolute'><line x1='" + (stack[i][0] + 2)+ "' y1='" + (stack[i][1] + 2) + "' x2='" + (stack[i + 1][0] + 2) + "' y2='" + (stack[i + 1][1] + 2) + "' stroke='green'/></svg>"
        }
    }
    document.getElementById("main").innerHTML = x;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function findConvex(txt, points) {
    console.log("check");
    console.log(points);
    console.log("beginning..");
    var stack = [points[0], points[1]];
    var tracker = 2;
    var count = 2;
    drawLines(txt, stack, false);
    await sleep(100);
    while(true) {
        var check = false;
        if (tracker == (points.length)) {
            break;
        }
        if (orientation(stack[count - 2], stack[count - 1], points[tracker]) == -1) {
            stack.push(points[tracker]);
            count++;
        } else {
            count--;
            stack.pop();
            check = true;
        }
        var s = stack.slice();
        
        if (!check) {
            tracker++;
        }
        drawLines(txt, stack, false);
        await sleep(100);
        
    }
    stack.push(stack[0]);
    await sleep(100);
    drawLines(txt, stack, true);
    console.log(tracker);
    show();
    return stack;
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

var bottomMost;
var points = [];
var text = "";

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

function grahamScan() {
    document.getElementById("main").innerHTML = "";
    hide();
    setup();
    points.sort(function(a, b) {return a[1] - b[1]});
    bottomMost = points[0];
    points.splice(0, 1);

    points.sort(compare);
    points.unshift(bottomMost);
    var stack = findConvex(text, points);
    console.log(stack);
}



