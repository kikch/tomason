var cities={
"京都":{lat:34.9929466,lng:135.7426332},
"東京":{lat:35.681971,lng:139.766751},
"大阪":{lat:34.7024854,lng:135.4937619},
};

var req = new XMLHttpRequest();
req.open("GET", "./js/list.js", false);
req.send("");
eval(req.responseText);

var marker1=[];
var marker2=[];
var infoWindow1=[];
var infoWindow2=[];
var markerLatLng1;
var markerLatLng2;

function initMap(){
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
	    '<p>'+markerData1[i]['star'] + '</p>'+
            '<p>'+markerData1[i]['categ'] + '</p>'+
         /*   '<a href="./page/list.html">' +"詳細へ" + '</a>'+*/
	    '<button onclick="on()">'+ "詳細へ" +'</button>'+
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
	    '<p>'+markerData2[i]['star'] + '</p>'+
            '<p>'+markerData2[i]['categ'] + '</p>'+
           /* '<a href="./page/list.html">' + "詳細へ" +'</a>'+*/
	    '<button onclick="on()">'+ "詳細へ" +'</button>'+
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

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
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
