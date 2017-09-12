var socket = io();
var url = window.location.href;
url = trim(url);

socket.emit('url', url);

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