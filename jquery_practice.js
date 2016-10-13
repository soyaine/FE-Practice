/**
 * Created by songyuting on 2016/8/10.
 */

var btn = document.getElementById("btn");
var checked = document.getElementById("checked");
btn.onclick = function () {
    var arrays = new Array();
    var items = document.getElementsByName("check");

    for (var i = 0; i < items.length; i++) {
        if (items[i].checked){
            arrays.push(items[i].value);
            var newCheck = document.createElement("p");
            newCheck.innerText = items[i].value;
            checked.appendChild(newCheck);
        }
    }
}