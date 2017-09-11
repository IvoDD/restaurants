var socket = io();
var url = window.location.href;
url = trim(url);

socket.on('restaurants', (restaurants) => {
    for (let i=0; i<restaurants.length; ++i){
        if (restaurants[i].url == url){
            socket.emit('ind', i);
            break;
        }
    }
});

socket.on('name', (name) => {
    changeName(name);
});

function trim(url){
    let pos;
    for (pos = url.length; pos>=0; --pos){
        if (url[pos] == '/'){break;}
    }
    return url.substring(pos+1, url.length);
}