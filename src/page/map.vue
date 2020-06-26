<template>
<div>
    <div id="map"></div>
</div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default{

  mounted:function(){
            //var osmUrl = 'http://172.19.6.20/resource/tiles/{z}/{x}/{y}.png', //tiles
            var osmUrl = 'http://localhost/{z}/{x}/{y}.png', //tiles
			osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			osm = L.tileLayer(osmUrl, {
				minZoom: 5,
				maxZoom: 12,
				attribution: osmAttrib
			});
		//	currentMarker; //当前位置marker
		//纬度，经度
		var map = L.map('map', {
			closePopupOnClick: false //点击地图不关闭Popup
        }).setView([40.43, -3.99], 7).addLayer(osm);

        var latlngs = [
			[40.43, -3.99],
			[40.43, -3.96],
			[40.42, -3.957],
			[40.42, -3.949],
			[40.39, -3.94],
			[40.37, -3.92],
			[40.36, -3.91],
			[40.33, -3.89],
			[40.37, -3.88],
			[40.405, -3.913]
		];
        var polyline = L.polyline(latlngs, {
					color: '#820063',
					weight: 2
				}).addTo(map);
        map.fitBounds(polyline.getBounds()); //直接显示成最适宜的缩放比例
  }  
}
</script>

<style>
#map{
    width: 800px;
    height: 600px;
}
</style>