var button = document.getElementById('x-but');
var div = document.getElementById('announce-cont');

button.onclick = function() {
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
};

function changeImageBasedOnDayAndTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const target = document.getElementById('offer');

    const morningImages = {
        0: "source/img/deals/def.png",
        1: "source/img/deals/m/mmo.png",
        2: "source/img/deals/m/mtu.png",
        3: "source/img/deals/m/mwe.png",
        4: "source/img/deals/m/mth.png",
        5: "source/img/deals/def.png",
        6: "source/img/deals/def.png"
    };
    const afternoonImages = {
        0: "source/img/deals/def.png",
        1: "source/img/deals/l/lall.png",
        2: "source/img/deals/l/lall.png",
        3: "source/img/deals/l/lall.png",
        4: "source/img/deals/l/lall.png",
        5: "source/img/deals/def.png",
        6: "source/img/deals/def.png"
    };
    const snackImages = {
        0: "source/img/deals/def.png",
        1: "source/img/deals/s/smo.png",
        2: "source/img/deals/s/stu.png",
        3: "source/img/deals/s/swe.png",
        4: "source/img/deals/s/sth.png",
        5: "source/img/deals/def.png",
        6: "source/img/deals/def.png"
    };
    const nightImages = {
        0: "source/img/deals/d/dall.png",
        1: "source/img/deals/d/dall.png",
        2: "source/img/deals/d/dall.png",
        3: "source/img/deals/d/dall.png",
        4: "source/img/deals/d/dall.png",
        5: "source/img/deals/d/dall.png",
        6: "source/img/deals/d/dall.png"
    };

    if (hours >= 8 && hours < 11) {
        target.src = morningImages[day];
    } else if (hours >= 11 && hours < 15) {
        target.src = afternoonImages[day];
    } else if (hours >= 17 && hours < 19) {
        target.src = snackImages[day];
    } else if (hours >= 20 && hours < 22) {
        target.src = nightImages[day];
    } else {
        target.src = "source/img/deals/def.png";
    }
}

setInterval(changeImageBasedOnDayAndTime, 60000);

changeImageBasedOnDayAndTime();
