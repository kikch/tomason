var cities={
"東京":{lat:35.681971,lng:139.766751},
"京都":{lat:34.9929466,lng:135.7426332},
"大阪":{lat:34.7024854,lng:135.4937619},
};

var markerData=[
{name:'Tomason_1',lat:35.681971,lng:139.746751},
{name:'Tomason_2',lat:35.681971,lng:139.756751},
{name:'Tomason_3',lat:35.681971,lng:139.766751},
{name:'Tomason_4',lat:35.681971,lng:139.776751},
{name:'Tomason_5',lat:35.681971,lng:139.786751},
];

getCSV();

var Tomason_A={lat:35.7100627,lng:139.8085117};
var marker=[];
var infoWindow=[];
var markerLatLng;

function initMap(){
var map = new google.maps.Map(document.getElementById('map'),{
    center:{lat:35.681971,lng:139.766751},
    zoom:12,
});
for (var i = 0; i < markerData.length; i++){
    markerLatLng = new google.maps.LatLng({lat:markerData[i]['lat'],lng:markerData[i]['lng']});
    marker[i] = new google.maps.Marker({
        position:markerLatLng,
        map:map,
});
infoWindow[i] = new google.maps.InfoWindow({
    content:'<div class="sample">'+markerData[i]['name'] + '</div>'
});
markerEvent(i);
}
}

function markerEvent(i){
    marker[i].addListener('click',function(){
        infoWindow[i].open(map,marker[i]);
    });
}

function addMessage(msg){
    var events=document.getElementById("messages");
    var pre=document.createElement("pre");
    pre.innerHTML=msg;
    events.appendChild(pre);
}

function getCSV(){
    var req = new XMLHttpRequest();
    req.open("get","tomason.csv",true);
    req.send(null);
    req.onload = function(){
        convertCSVtoArray(req.responseText);
    }
}

function convertCSVtoArray(str){
    var result = [];
    var tmp = str.split("^");
    for(var i = 0; i < tmp.length; i++){
        result[i] = tmp[i].split(',');
    }
    //alert(result[1][2]);
}



/*
var marker = new google.maps.Marker({ // ピンを立てる
    position:{lat:35.7100627,lng:139.8085117},
    map:map,
});
var infoWindow = new google.maps.InfoWindow({
    content:'<div class="sample">Tomason A</div>'
    });
marker.addListener('click',function(){
    infoWindow.open(map,marker);
});
}*/


