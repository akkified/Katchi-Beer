var button = document.getElementById('x-but');

button.onclick = function() {
    var div = document.getElementById('announce-cont');
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
};

function changeImageBasedOnTime() {
    const now = new Date();
    const hours = now.getHours();

    const morningImage = "source/img/morning-image.jpg";
    const afternoonImage = "source/img/afternoon-image.jpg";
    const nightImage = "source/img/night-image.jpg"; 
    
    const target = document.getElementById('offer')

    if (hours >= 8 && hours < 12) {
        target.src = morningImage;
    } else if (hours >= 12 && hours < 20) {
        target.src = afternoonImage;
    } else {
        target.src = nightImage;
    }
}

setInterval(changeImageBasedOnTime, 60000);

changeImageBasedOnTime();
