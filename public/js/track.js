const socket = io();

const map = L.map("map").setView([0,0],2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap'
}).addTo(map);

const markers = {};

socket.on("receive-location",(data)=>{
    const {id,latitude,longitude} = data;
    if(markers[id]){
        markers[id].setLatLng([latitude, longitude]);
    }else{
        markers[id] = L.marker([latitude, longitude]).addTo(map);
        map.setView([latitude,longitude], 16);
    }
});

socket.on("user-disconnected",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});