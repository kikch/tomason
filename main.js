var cities={
"京都":{lat:34.9929466,lng:135.7426332},
"東京":{lat:35.681971,lng:139.766751},
"大阪":{lat:34.7024854,lng:135.4937619},
};

/*var markerData1=[
{name:'Tomason_1',img:'blue.png',lat:35.681971,lng:139.746751},
{name:'Tomason_2',img:'thomason.png',lat:35.681971,lng:139.756751},
{name:'Tomason_3',img:'red.png',lat:35.681971,lng:139.766751},
{name:'Tomason_4',img:'yellow.png',lat:35.681971,lng:139.776751},
{name:'Tomason_5',img:'tmsn.jpg',lat:35.681971,lng:139.786751},
];
var markerData2=[
{name:'Tomason_6',img:'blue.png',lat:34.946982,lng:135.753936},
{name:'Tomason_7',img:'thomason.png',lat:34.956982,lng:135.753936},
{name:'Tomason_8',img:'red.png',lat:34.966982,lng:135.753936},
{name:'Tomason_9',img:'yellow.png',lat:34.976982,lng:135.753936},
{name:'Tomason_10',img:'tmsn.jpg',lat:34.986982,lng:135.753936},
];*/

var req = new XMLHttpRequest();
req.open("GET", "tokyo.js", false);
req.send("");
eval(req.responseText);

var req = new XMLHttpRequest();
req.open("GET", "kyoto.js", false);
req.send("");
eval(req.responseText);

/*
var markerData=[
{name:result[1][0],lat:result[1][1],lng:result[1][2]},
{name:result[2][0],lat:result[2][1],lng:result[2][2]},
{name:result[3][0],lat:result[3][1],lng:result[3][2]},
];
*/

var marker1=[];
var marker2=[];
var infoWindow1=[];
var infoWindow2=[];
var markerLatLng1;
var markerLatLng2;

function initMap(){
/*var map = new google.maps.Map(document.getElementById('map'),{
    center:cities["京都"],
    zoom:12,
    mapTypeControl:false, // 航空写真などの切り替え
    streetViewControl:false,
    zoomControl:true,
    scaleControl:true,
    fullscreenControl:true,
});*/
	
var map = new google.maps.Map(document.getElementById('map'),{
    center:cities["京都"],
    zoom:12,	
    mapTypeControl:false, // 航空写真などの切り替え
    streetViewControl:false,
    zoomControl:true,
    scaleControl:true,
    fullscreenControl:false,
    styles:
	[
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 65
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": "50"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "40"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ffff00"
            },
            {
                "lightness": -25
            },
            {
                "saturation": -97
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": -25
            },
            {
                "saturation": -100
            }
        ]
    }
]
});
var select = document.getElementById("cities"); // 大阪、京都に変更
select.addEventListener("change",function(e){
    var key = e.target.value;
    map.setCenter(cities[key]);
});
for (var i = 0; i < markerData1.length; i++){
    markerLatLng1 = new google.maps.LatLng({lat:markerData1[i]['lat'],lng:markerData1[i]['lng']});
    marker1[i] = new google.maps.Marker({
        position:markerLatLng1,
        map:map,
        icon:{
            url:"./img/blue.png",
            scaledSize: new google.maps.Size(32,32)
        },
        //label:"ト",
});
infoWindow1[i] = new google.maps.InfoWindow({
    content:'<div class="info">'+
            '<img src="./img/'+markerData1[i]['img'] + '" width="75" height="75" />'+
	    '<br>'+
            '<a href="http://www">'+markerData1[i]['name'] + '</a>'+
	    '</div>'
});
markerEvent1(i);
}

for (var i = 0; i < markerData2.length; i++){
    markerLatLng2 = new google.maps.LatLng({lat:markerData2[i]['lat'],lng:markerData2[i]['lng']});
    marker2[i] = new google.maps.Marker({
        position:markerLatLng2,
        map:map,
        icon:{
            url:"./img/red.png",
            scaledSize: new google.maps.Size(32,32)
        },
});
infoWindow2[i] = new google.maps.InfoWindow({
    content:'<div class="info">'+
            '<img src="./img/'+markerData2[i]['img'] + '" width="75" height="75" />'+
	    '<br>'+
            '<a href="http://www">'+markerData2[i]['name'] + '</a>'+
	    '</div>'
});
markerEvent2(i);
}
}

function markerEvent1(i){
    marker1[i].addListener('click',function(){
    for (var j = 0; j < markerData1.length; j++){ // Windowは一つだけ表示
        infoWindow1[j].close();
    }
        infoWindow1[i].open(map,marker1[i]);
    });
}


function markerEvent2(i){
    marker2[i].addListener('click',function(){
    for (var j = 0; j < markerData2.length; j++){ // Windowは一つだけ表示
        infoWindow2[j].close();
    }
        infoWindow2[i].open(map,marker2[i]);
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
    //alert(result[1][1]);
}


//getCSV();
google.maps.event.addDomListener( window, 'load', initMap );

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
