var result = new Array();
result[0] = new Array("ĐỒNG CHÍ", "CỘNG SỰ", "ĐỒNG NIÊN", "ĐỒNG KHÓA", "ĐỒNG ĐỘI", "NHI ĐỒNG", "ĐỒNG CANH", "ĐỒNG NGHIỆP", "");
var start = new Array();
start[0] = new Array(1, 4, 1, 2, 1, 1, 3, 0);
var question = new Array();
question[0] = new Array(
    "Những người cùng chí hướng", "Những người cùng làm chung một công việc",
    "Những người cùng tuổi",
    "Những người cùng học chung một khóa", "Những người cùng đội ngũ", "Những người từ độ tuổi 6-9 tuổi",
    "Cùng nghĩa vói đồng niên", "Những người cùng nghề"
);

var check = 0;
var valueKey = 6;
var time = 10;
// === clean array result
for (var i = 0; i < result[0].length; i++) {
    result[0][i] = result[0][i].replace(/\s/g, '');
}
// ==== function
function createListItem(tag, clazz) {
    var ilm = document.createElement(tag, clazz);
    ilm.className = clazz;
    return ilm;
}

function createListItemClass(text, tag, clazz, id) {
    var ilm = document.createElement(tag);
    ilm.textContent = text;
    ilm.className = clazz;
    ilm.id = id;
    return ilm;
}

function maxLength() {
    var max = result[0][0].length;
    for (var i = 0; i < result[0].length; i++) {
        if (max < result[0][i].length) {
            max = result[0][i].length;
        }
    }
    return max + 3;
}

function showText() {
    var x = 0;
    for (var i = 0; i < result[0].length; i++) {
        for (var j = 0; j < maxLength(); j++) {
            if (j >= start[0][i]) {
                document.getElementsByClassName("tr")[i].appendChild(createListItemClass(result[0][i][x++], "td", "td" + i.toString(), "td" + i.toString()));
            } else {
                document.getElementsByClassName("tr")[i].appendChild(createListItemClass("", "td", "td" + i.toString(), "td" + i.toString()));
            }
        }
        x = 0;
    }
}

function delIlm(clazz, index, offset) {
    for (var i = 0; i < index; i++) {
        try {
            document.getElementsByClassName(clazz)[i].style.backgroundColor = "none";
            document.getElementsByClassName(clazz)[i].innerText = "";
        } catch (error) {
            //
        }
    }
    for (var i = offset + 1; i <= maxLength(); i++) {
        try {
            document.getElementsByClassName(clazz)[i].style.backgroundColor = "none";
            document.getElementsByClassName(clazz)[i].innerText = "";
        } catch (error) {
            //
        }
    }
}

function create(clazz, index, offset) {
    for (var i = index; i <= offset; i++) {
        try {
            document.getElementsByClassName(clazz)[i].style.backgroundColor = "red";
        } catch (error) {
            //
        }
    }
}

function notShowText(clazz, index, offset) {
    for (var i = index; i <= offset; i++) {
        try {
            document.getElementsByClassName(clazz)[i].innerText = "";
        } catch (error) {
            //khong co gi hihi
        }
    }
}

function showResult(clazz, index, offset, kq) {
    var x = 0;
    for (var i = index; i <= offset; i++) {
        try {
            document.getElementsByClassName(clazz)[i].innerText = result[0][kq][x++];
        } catch (error) {
            //khong co gi hihi
        }
    }
}

function setClick(x) {
    document.getElementsByClassName("tr")[x].onclick = function() {
        var temp;
        if (typeof(start[0][x]) == "undefined") temp = 0;
        else temp = start[0][x];
        if (check == 0) {
            showResult("td" + x.toString(), temp, result[0][x].length + temp - 1, x);
            check = 1;
        } else {
            notShowText("td" + x.toString(), temp, result[0][x].length + temp - 1);
            check = 0;
        }
    };
}

function setKey(index) {
    for (var i = 0; i < result[0].length; i++) {
        document.getElementsByClassName("td" + i.toString())[index - 1].style.backgroundColor = "blue";
    }
}

function createButton() {
    var x = 0;
    for (var i = 0; i < result[0].length; i++) {
        document.getElementById("left").appendChild(createListItemClass((i + 1).toString(), "button", "btn" + i.toString(), "btn" + i.toString()));
    }
}

function questions(x) {
    alert(x);
}

function showQuestion(x, len) {
    document.getElementById("btn" + x.toString()).onclick = function() {
        questions(question[0][x] + " (" + len.toString() + " chữ cái)");
        countdown(time);
    };
}

function countdown(x) {
    var temp = x;
    var time = setInterval(() => {
        document.getElementById("time2").style.transition = "1s";
        document.getElementById("time2").style.display = "block";
        document.getElementById("time2").style.width = (100 / temp * x).toString() + "%";
        document.getElementById("time").style.display = "block";
        document.getElementById("time").innerText = (x--).toString();
    }, 1000);
    setTimeout(function() {
        clearInterval(time);
        alert("hết thời gian");
        document.getElementById("time").style.display = "none";
        document.getElementById("time2").style.display = "none";
    }, (x + 2) * 1000);

}

function showKeyHidden() {
    var x = result[0].length - 1;
    var ilm = document.getElementsByClassName("td" + x.toString())[valueKey - 1];
    var btn = document.getElementById("btn" + x.toString());
    btn.style.backgroundColor = "rgb(183, 219, 253)";
    btn.innerText = "";
    btn.onclick = function() {};
    ilm.style.backgroundColor = "#EFEFEF";
    ilm.innerText = "KQ";
    ilm.style.color = "black";
    ilm.onclick = function() {
        if (check == 0) {
            for (var i = 0; i < result[0].length - 1; i++) {
                var temp;
                if (typeof(start[0][i]) == "undefined") temp = 0;
                else temp = start[0][i];
                document.getElementsByClassName("td" + i.toString())[valueKey - 1].innerText = result[0][i][valueKey - temp - 1];
            }
        } else {
            for (var i = 0; i < result[0].length - 1; i++) {
                document.getElementsByClassName("td" + i.toString())[valueKey - 1].innerText = "";
            }
            check = 1;
        }
    }
}
// ========MAIN===========
// create table
for (var i = 0; i < result[0].length; i++) {
    document.getElementById("table").appendChild(createListItem("tr", "tr"));
}
// showtable
showText();
// hidden table text
for (var i = 0; i < result[0].length; i++) {
    var temp;
    if (typeof(start[0][i]) == "undefined") temp = 0;
    else temp = start[0][i];
    create("td" + i.toString(), temp, result[0][i].length + temp - 1);
    delIlm("td" + i.toString(), temp, result[0][i].length + temp - 1);
    notShowText("td" + i.toString(), temp, result[0][i].length + temp - 1);
}
// event click show text table
for (var i = 0; i < result[0].length; i++) {
    setClick(i);
}
// set hidden key
setKey(valueKey);
// create button question
createButton();
// show question
for (var i = 0; i < result[0].length; i++) {
    var x = result[0][i].length;
    showQuestion(i, x);
}
//button show all result
showKeyHidden();