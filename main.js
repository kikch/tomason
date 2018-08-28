var cities={
"京都":{lat:34.9929466,lng:135.7426332},
"東京":{lat:35.681971,lng:139.766751},
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
/*
var markerData=[
{name:result[1][0],lat:result[1][1],lng:result[1][2]},
{name:result[2][0],lat:result[2][1],lng:result[2][2]},
{name:result[3][0],lat:result[3][1],lng:result[3][2]},
];
*/

var marker=[];
var infoWindow=[];
var markerLatLng;

function initMap(){
var map = new google.maps.Map(document.getElementById('map'),{
    center:cities["京都"],
    zoom:12,
    mapTypeControl:false, // 航空写真などの切り替え
    streetViewControl:false,
    zoomControl:true,
    scaleControl:true,
    fullscreenControl:true,
});
var select = document.getElementById("cities"); // 大阪、京都に変更
select.addEventListener("change",function(e){
    var key = e.target.value;
    map.setCenter(cities[key]);
});
for (var i = 0; i < markerData.length; i++){
    markerLatLng = new google.maps.LatLng({lat:markerData[i]['lat'],lng:markerData[i]['lng']});
    marker[i] = new google.maps.Marker({
        position:markerLatLng,
        map:map,
        icon:{
            url:"./img/thomason.png",
            scaledSize: new google.maps.Size(40,40)
        },
        //label:"ト",
});
infoWindow[i] = new google.maps.InfoWindow({
    content:'<div class="sample">'+markerData[i]['name'] + '</div>'
});
markerEvent(i);
}
}

function markerEvent(i){
    marker[i].addListener('click',function(){
    for (var j = 0; j < markerData.length; j++){ // Windowは一つだけ表示
        infoWindow[j].close();
    }
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
    req.open("get","./csv/test.csv",true);
    req.send(null);
    req.onload = function(){
        convertCSVtoArray(req.responseText);
    }
}

function convertCSVtoArray(str){
    var result = [];
    var tmp = str.split("\r");
    for(var i = 0; i < tmp.length; i++){
        result[i] = tmp[i].split(',');
    }
    alert(result[1][2]);
}

/*住所から座標を取得
var geocoder = new google.maps.Geocoder();
var address1 = "東京都新宿区3丁目38-1";
geocoder.geocode({address :address1},function(results,status){
    if(status=='OK'){
        addMessage(JSON.stringify(results,null,2));
        map.setCenter(results[0].geometry.location);
    }
    else{
        addMessage("APIの実施に失敗しました:" + status);
    }
});
}*/
