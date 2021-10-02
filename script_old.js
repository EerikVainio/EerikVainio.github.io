document.addEventListener("DOMContentLoaded", function (event) {

    const   vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
            vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
            cardWidth = vw-32,
            cardHeight = Math.floor(cardWidth*0.6);


    var cities = ["Moscow", "Perm", "Omsk", "Krasnoyarsk", "Irkutsk", "Chita", "Khabarovsk", "Tbilisi", "Astrakhan", "Samarkand", "Dihua", "Ulan Bator", "Vladivostok", "Ankara", "Baghdad", "Tehran", "Rawalpindi", "Lhasa", "Xian", "Peking", "Shanghai", "Seoul", "Kobe", "Mecca", "Shiraz", "Karachi", "Agra", "Bombay", "Colombo", "Kathmandu", "Calcutta", "Mandalay", "Hanoi", "Rangoon", "Bangkok", "Singapore", "Saigon", "Macau", "Taipei"];
    var citiesX = [13.31, 24, 34.25, 44.54, 54.54, 61.64, 76.21, 16.76, 18.75, 31.84, 45.3, 56.48, 74.4, 9.92, 17.41, 21.78, 35.64, 47.83, 57.98, 63.79, 67.09, 71.41, 78.67, 14.31, 25, 31.64, 38.46, 36.27, 41.3, 43.97, 45.75, 50.51, 57.33, 50.4, 53.72, 55.53, 57.16, 61.6, 67.86];
    var citiesY = [21.61, 21.02, 21.26, 21.8, 22.46, 24.3, 26.75, 40.67, 34.59, 42.77, 37.54, 32.08, 38.07, 42.62, 52.52, 48.72, 52.61, 54.16, 50.1, 43.1, 53.85, 49.11, 48.92, 67.51, 58.44, 62.15, 60.15, 70.54, 86.84, 58.57, 63.77, 65.21, 64.8, 72.66, 76.48, 91.21, 80.52, 66.21, 62.79];

    var cardNumber = [];
    var discardPile = [];
    var rngSave = [];
    var rngSaveDiscard = [];

    var cityA = [];
    var cityB = [];
    var cityAX = [];
    var cityAY = [];
    var cityBX = [];
    var cityBY = [];
    var scores = [3, 6, 9, 12, 14, 19, 4, 3, 8, 11, 14, 17, 6, 7, 6, 10, 17, 16, 17, 19, 20, 22, 10, 8, 10, 12, 12, 16, 13, 14, 15, 17, 16, 17, 20, 18, 18, 20, 3, 6, 9, 11, 16, 4, 3, 7, 8, 11, 18, 6, 7, 6, 9, 16, 13, 14, 16, 17, 19, 10, 8, 10, 11, 12, 16, 12, 13, 14, 16, 15, 16, 19, 17, 16, 18, 3, 6, 8, 13, 7, 6, 4, 5, 8, 15, 9, 8, 7, 6, 14, 10, 11, 13, 14, 16, 11, 9, 8, 8, 10, 14, 9, 10, 11, 13, 12, 13, 16, 14, 13, 15, 3, 5, 10, 10, 9, 7, 3, 5, 12, 12, 11, 10, 9, 12, 8, 9, 11, 12, 14, 14, 12, 11, 11, 13, 17, 12, 13, 12, 12, 13, 14, 17, 15, 11, 13, 2, 7, 13, 12, 10, 6, 2, 9, 15, 14, 13, 12, 11, 7, 5, 7, 8, 10, 17, 15, 14, 14, 15, 17, 13, 12, 11, 11, 12, 13, 16, 14, 10, 9, 5, 15, 14, 12, 8, 2, 7, 17, 16, 15, 14, 11, 7, 5, 7, 8, 10, 19, 17, 16, 16, 15, 17, 13, 12, 11, 11, 12, 13, 16, 14, 10, 9, 20, 19, 17, 13, 7, 2, 22, 21, 20, 19, 11, 7, 5, 7, 4, 6, 22, 18, 16, 14, 15, 17, 13, 12, 11, 11, 12, 13, 16, 14, 10, 9, 1, 5, 10, 15, 21, 2, 3, 2, 7, 14, 16, 16, 18, 19, 21, 6, 4, 6, 8, 8, 12, 10, 10, 11, 13, 12, 13, 16, 14, 14, 16, 5, 10, 14, 21, 3, 4, 3, 7, 14, 15, 16, 18, 19, 21, 7, 5, 7, 9, 9, 13, 10, 11, 12, 14, 13, 14, 17, 15, 15, 17, 5, 12, 16, 7, 4, 3, 2, 9, 10, 11, 13, 14, 16, 7, 5, 4, 4, 6, 10, 5, 6, 7, 9, 8, 9, 12, 10, 10, 12, 8, 11, 12, 9, 8, 7, 9, 5, 6, 8, 9, 11, 12, 10, 9, 9, 11, 15, 10, 10, 9, 9, 10, 11, 14, 12, 8, 10, 8, 15, 16, 15, 14, 9, 5, 3, 5, 6, 8, 19, 16, 14, 12, 13, 15, 11, 10, 9, 9, 10, 11, 14, 12, 8, 7, 24, 20, 19, 16, 11, 7, 5, 7, 2, 4, 22, 18, 16, 14, 15, 17, 13, 12, 11, 11, 12, 13, 16, 14, 10, 9, 3, 4, 9, 16, 17, 18, 20, 21, 23, 6, 6, 8, 10, 10, 14, 12, 12, 13, 15, 14, 15, 18, 16, 16, 18, 1, 7, 12, 14, 16, 16, 19, 20, 3, 3, 5, 7, 7, 11, 9, 9, 10, 12, 11, 12, 15, 13, 13, 15, 5, 12, 14, 16, 15, 19, 21, 4, 2, 4, 6, 6, 10, 8, 8, 9, 11, 10, 11, 14, 12, 12, 14, 7, 9, 11, 11, 14, 15, 8, 4, 2, 2, 4, 8, 3, 4, 5, 7, 6, 7, 10, 8, 8, 10, 4, 6, 8, 9, 11, 13, 9, 7, 5, 6, 8, 4, 3, 2, 4, 3, 4, 7, 5, 5, 7, 2, 4, 5, 7, 15, 11, 9, 7, 8, 10, 6, 5, 4, 4, 5, 6, 9, 7, 3, 5, 2, 3, 5, 17, 13, 11, 9, 10, 12, 8, 7, 6, 6, 7, 8, 11, 9, 5, 4, 5, 4, 17, 13, 11, 9, 10, 12, 8, 7, 6, 4, 7, 6, 9, 7, 3, 2, 2, 20, 16, 14, 12, 13, 15, 11, 10, 9, 8, 10, 11, 14, 12, 8, 7, 21, 17, 15, 13, 14, 16, 12, 11, 10, 8, 11, 10, 13, 11, 7, 6, 4, 6, 8, 8, 12, 10, 10, 11, 13, 12, 13, 16, 14, 14, 16, 2, 4, 4, 8, 6, 6, 7, 9, 8, 9, 12, 10, 10, 12, 2, 2, 6, 4, 4, 5, 7, 6, 7, 10, 9, 8, 10, 2, 6, 2, 2, 3, 5, 4, 5, 8, 6, 6, 8, 4, 4, 3, 4, 6, 5, 6, 9, 7, 7, 9, 8, 5, 6, 8, 7, 8, 11, 9, 9, 11, 3, 2, 4, 3, 4, 7, 5, 5, 7, 1, 3, 2, 3, 6, 4, 4, 6, 2, 1, 2, 5, 3, 3, 5, 3, 2, 5, 3, 1, 3, 1, 4, 2, 4, 6, 3, 1, 3, 5, 2, 6, 8, 4, 6, 2];

    let a;
    let b;
    let bStart = 1;
    let total = 0;
    let rng;

    let iDrawAmount = 5;
    let iDiscardAmount = 2;
    let aDrawAmount = 3;
    let aDiscardAmount = 2;

    let drawAmount;
    let discardAmount;
    let totalDrawn = 0;

    let drawerVisible = false;

    let drawCityAX,
    drawCityAY,
    drawCityBX,
    drawCityBY;

    document.getElementById("iDrawMinusButton").addEventListener("click", iDrawMinus);
    document.getElementById("iDrawPlusButton").addEventListener("click", iDrawPlus);
    document.getElementById("iDiscardMinusButton").addEventListener("click", iDiscardMinus);
    document.getElementById("iDiscardPlusButton").addEventListener("click", iDiscardPlus);
    document.getElementById("aDrawMinusButton").addEventListener("click", aDrawMinus);
    document.getElementById("aDrawPlusButton").addEventListener("click", aDrawPlus);
    document.getElementById("aDiscardMinusButton").addEventListener("click", aDiscardMinus);
    document.getElementById("aDiscardPlusButton").addEventListener("click", aDiscardPlus);
    document.getElementById("startGameButton").addEventListener("click", startGame);
    document.getElementById("backYesButton").addEventListener("click", goBack);
    //document.getElementById("arrayButton").addEventListener("click", loopArray);
    document.getElementById("discardButton").addEventListener("click", discardButtonPress);
    document.getElementById("discardYesButton").addEventListener("click", discardFunction);
    document.getElementById("drawButton").addEventListener("click", drawButtonPress);

    generateRoutes();


    drawMenu();

    function generateRoutes() {
        for (a = 0; a < 39; a++) {
            for (b = bStart; b < 39; b++) {
                total++;
                
                cityA.push(cities[a]);
                cityB.push(cities[b]);
                cityAX.push(citiesX[a]);
                cityAY.push(citiesY[a]);
                cityBX.push(citiesX[b]);
                cityBY.push(citiesY[b]);
            }
            bStart++;
        }
    }

    function drawMenu() {
        document.getElementById("image").style.display="none";
        document.getElementById("logo").style.display="block";
        document.getElementById("contentDiv").style.display="flex";
        document.getElementById("footerDiv").style.opacity="0";
        document.getElementById("footerDiv").style.pointerEvents="none";
        document.getElementById("alertFooterDiv").style.opacity="0";
        document.getElementById("alertFooterDiv").style.pointerEvents="none";
        document.getElementById("canvasDiv").style.display="none"
        document.getElementById("spacerDiv").style.display="none";
        document.getElementById("drawButton").style.display="none";
    }

    function drawGame() {
        document.getElementById("image").style.display="none";
        document.getElementById("logo").style.display="none";
        document.getElementById("contentDiv").style.display="none";
        document.getElementById("footerDiv").style.opacity="100";
        document.getElementById("footerDiv").style.pointerEvents="auto";
        document.getElementById("alertFooterDiv").style.opacity="100";
        document.getElementById("alertFooterDiv").style.pointerEvents="auto";
        document.getElementById("canvasDiv").style.display="block"
        document.getElementById("spacerDiv").style.display="block";
        document.getElementById("canvasDiv").innerHTML = "";
        document.getElementById("discardButton").style.display="block";

        for (var i = 0; i < drawAmount; i++) {
            var canvas = document.createElement('canvas');
            canvas.id = i;
            canvas.width = cardWidth;
            canvas.height = cardHeight;

            var canvasDiv = document.getElementById("canvasDiv");
            canvasDiv.appendChild(canvas);

            console.log(document.getElementById("image"));
            console.log(i + ", " + rngSave[i]);
            //drawCards(i, rngSave[i]);
        }
    }

    function startGame() {
        //clearLocalStorage();
        drawAmount = iDrawAmount;
        discardAmount = iDiscardAmount;

        drawGame();
        showDrawer();

        for (var i = 0; i < iDrawAmount; i++) {
            totalDrawn ++;
            rng = Math.floor(Math.random() * scores.length-1);
            rngSave.push(rng);

            var canvas = document.createElement('canvas');
            canvas.id = rng;
            canvas.width = cardWidth;
            canvas.height = cardHeight;

            var canvasDiv = document.getElementById("canvasDiv");
            canvasDiv.appendChild(canvas);

            //console.log("scores.length: " + scores.length);
            console.log(cityA[rng] + " - " + cityB[rng] + ", " + scores[rng] + ", #" + rng);
            console.log(cityAX[rng] + ", " + cityAY[rng] + "; " + cityBX[rng] + ", " + cityBY[rng]);

            cardNumber.push("cardcanvas"+i);
            //console.log("cardNumber: " + cardNumber[i]);
            document.getElementById(rng).addEventListener("click", function(){ cardClick(this.id); });
    
            console.log()
            drawCards(i, rng);

            cityA.splice(rng,1);
            cityB.splice(rng,1);
            cityAX.splice(rng,1);
            cityAY.splice(rng,1);
            cityBX.splice(rng,1);
            cityBY.splice(rng,1);
            scores.splice(rng,1);

        }
    }

    function drawCards(i, rng) {
        var c = [];
        var ctx = [];
        var img = document.getElementById("image");

        c[i] = document.getElementById(rng);
        ctx[i] = c[i].getContext("2d");
        ctx[i].drawImage(img, 0, 0, cardWidth, cardHeight);

        //console.log("Card height: " + cardHeight);
        //console.log("Card width: " + cardWidth);

        drawCityAX = cityAX[rng] / 100 * cardWidth;
        drawCityAY = cityAY[rng] / 100 * cardHeight;
        drawCityBX = cityBX[rng] / 100 * cardWidth;
        drawCityBY = cityBY[rng] / 100 * cardHeight;


        ctx[i].font = "bold 4vw Arial";
        ctx[i].fillStyle = "#BB4C47";
        ctx[i].strokeStyle = "#811C0D";
        ctx[i].textAlign = "center";
        ctx[i].lineWidth = 0.001*cardWidth;
        ctx[i].rotate(-0.03);
        ctx[i].fillText(cityA[rng], 0.335*cardWidth, 0.14*cardHeight);
        ctx[i].strokeText(cityA[rng], 0.335*cardWidth, 0.14*cardHeight);
        ctx[i].rotate(0.06);
        ctx[i].fillText(cityB[rng], 0.668*cardWidth, 0.09*cardHeight);
        ctx[i].strokeText(cityB[rng], 0.668*cardWidth, 0.09*cardHeight);
        ctx[i].rotate(-0.03);

        ctx[i].font = "bold 10vw Arial";
        ctx[i].fillStyle = "#9A1B13";
        ctx[i].strokeStyle = "#BB4C47";
        ctx[i].lineWidth = 0.004*cardWidth;
        ctx[i].fillText(scores[rng], 0.875*cardWidth, 0.875*cardHeight);
        ctx[i].strokeText(scores[rng], 0.875*cardWidth, 0.875*cardHeight);

        ctx[i].beginPath();
        ctx[i].moveTo(drawCityAX, drawCityAY);
        ctx[i].lineTo(drawCityBX, drawCityBY);
        ctx[i].strokeStyle = "darkred";
        ctx[i].lineWidth = 0.006*cardWidth;
        ctx[i].stroke();

        console.log(cityAX[rng] / 100 * cardWidth + ", " + cityAY[rng] / 100 * cardHeight);
        console.log(drawCityAX + ", " + drawCityAY);

        ctx[i].beginPath();
        ctx[i].arc(drawCityAX, drawCityAY, 0.016*cardWidth, 0, 2 * Math.PI);
        ctx[i].fillStyle = "#C43C1A";
        ctx[i].fill();
        ctx[i].stroke();

        ctx[i].beginPath();
        ctx[i].arc(drawCityBX, drawCityBY, 0.016*cardWidth, 0, 2 * Math.PI);
        ctx[i].fill();
        ctx[i].stroke();
    }

    function resetArrays() {
        cityA.length = 0;
        cityB.length = 0;
        cityAX.length = 0;
        cityAY.length = 0;
        cityBX.length = 0;
        cityBY.length = 0;
        scores = [3, 6, 9, 12, 14, 19, 4, 3, 8, 11, 14, 17, 6, 7, 6, 10, 17, 16, 17, 19, 20, 22, 10, 8, 10, 12, 12, 16, 13, 14, 15, 17, 16, 17, 20, 18, 18, 20, 3, 6, 9, 11, 16, 4, 3, 7, 8, 11, 18, 6, 7, 6, 9, 16, 13, 14, 16, 17, 19, 10, 8, 10, 11, 12, 16, 12, 13, 14, 16, 15, 16, 19, 17, 16, 18, 3, 6, 8, 13, 7, 6, 4, 5, 8, 15, 9, 8, 7, 6, 14, 10, 11, 13, 14, 16, 11, 9, 8, 8, 10, 14, 9, 10, 11, 13, 12, 13, 16, 14, 13, 15, 3, 5, 10, 10, 9, 7, 3, 5, 12, 12, 11, 10, 9, 12, 8, 9, 11, 12, 14, 14, 12, 11, 11, 13, 17, 12, 13, 12, 12, 13, 14, 17, 15, 11, 13, 2, 7, 13, 12, 10, 6, 2, 9, 15, 14, 13, 12, 11, 7, 5, 7, 8, 10, 17, 15, 14, 14, 15, 17, 13, 12, 11, 11, 12, 13, 16, 14, 10, 9, 5, 15, 14, 12, 8, 2, 7, 17, 16, 15, 14, 11, 7, 5, 7, 8, 10, 19, 17, 16, 16, 15, 17, 13, 12, 11, 11, 12, 13, 16, 14, 10, 9, 20, 19, 17, 13, 7, 2, 22, 21, 20, 19, 11, 7, 5, 7, 4, 6, 22, 18, 16, 14, 15, 17, 13, 12, 11, 11, 12, 13, 16, 14, 10, 9, 1, 5, 10, 15, 21, 2, 3, 2, 7, 14, 16, 16, 18, 19, 21, 6, 4, 6, 8, 8, 12, 10, 10, 11, 13, 12, 13, 16, 14, 14, 16, 5, 10, 14, 21, 3, 4, 3, 7, 14, 15, 16, 18, 19, 21, 7, 5, 7, 9, 9, 13, 10, 11, 12, 14, 13, 14, 17, 15, 15, 17, 5, 12, 16, 7, 4, 3, 2, 9, 10, 11, 13, 14, 16, 7, 5, 4, 4, 6, 10, 5, 6, 7, 9, 8, 9, 12, 10, 10, 12, 8, 11, 12, 9, 8, 7, 9, 5, 6, 8, 9, 11, 12, 10, 9, 9, 11, 15, 10, 10, 9, 9, 10, 11, 14, 12, 8, 10, 8, 15, 16, 15, 14, 9, 5, 3, 5, 6, 8, 19, 16, 14, 12, 13, 15, 11, 10, 9, 9, 10, 11, 14, 12, 8, 7, 24, 20, 19, 16, 11, 7, 5, 7, 2, 4, 22, 18, 16, 14, 15, 17, 13, 12, 11, 11, 12, 13, 16, 14, 10, 9, 3, 4, 9, 16, 17, 18, 20, 21, 23, 6, 6, 8, 10, 10, 14, 12, 12, 13, 15, 14, 15, 18, 16, 16, 18, 1, 7, 12, 14, 16, 16, 19, 20, 3, 3, 5, 7, 7, 11, 9, 9, 10, 12, 11, 12, 15, 13, 13, 15, 5, 12, 14, 16, 15, 19, 21, 4, 2, 4, 6, 6, 10, 8, 8, 9, 11, 10, 11, 14, 12, 12, 14, 7, 9, 11, 11, 14, 15, 8, 4, 2, 2, 4, 8, 3, 4, 5, 7, 6, 7, 10, 8, 8, 10, 4, 6, 8, 9, 11, 13, 9, 7, 5, 6, 8, 4, 3, 2, 4, 3, 4, 7, 5, 5, 7, 2, 4, 5, 7, 15, 11, 9, 7, 8, 10, 6, 5, 4, 4, 5, 6, 9, 7, 3, 5, 2, 3, 5, 17, 13, 11, 9, 10, 12, 8, 7, 6, 6, 7, 8, 11, 9, 5, 4, 5, 4, 17, 13, 11, 9, 10, 12, 8, 7, 6, 4, 7, 6, 9, 7, 3, 2, 2, 20, 16, 14, 12, 13, 15, 11, 10, 9, 8, 10, 11, 14, 12, 8, 7, 21, 17, 15, 13, 14, 16, 12, 11, 10, 8, 11, 10, 13, 11, 7, 6, 4, 6, 8, 8, 12, 10, 10, 11, 13, 12, 13, 16, 14, 14, 16, 2, 4, 4, 8, 6, 6, 7, 9, 8, 9, 12, 10, 10, 12, 2, 2, 6, 4, 4, 5, 7, 6, 7, 10, 9, 8, 10, 2, 6, 2, 2, 3, 5, 4, 5, 8, 6, 6, 8, 4, 4, 3, 4, 6, 5, 6, 9, 7, 7, 9, 8, 5, 6, 8, 7, 8, 11, 9, 9, 11, 3, 2, 4, 3, 4, 7, 5, 5, 7, 1, 3, 2, 3, 6, 4, 4, 6, 2, 1, 2, 5, 3, 3, 5, 3, 2, 5, 3, 1, 3, 1, 4, 2, 4, 6, 3, 1, 3, 5, 2, 6, 8, 4, 6, 2];

    }

    function cardClick(id) {
        if (drawerVisible) {
            c = document.getElementById(id);
            ctx = c.getContext("2d");

        var found = false;

        for(var i = 0; i < discardPile.length; i++) {
            console.log("Comparing: " + discardPile[i] + ", " + id);
            if (discardPile[i] == id) {
                found = true;
                console.log(id + " found in the array at position " + i);
                document.getElementById(id).style.opacity="1";
                discardPile.splice(i,1);
                rngSaveDiscard.splice(i,1);
                console.log(id + " removed from the array.");
                break;
            }
        }

        if (!found && discardPile.length < discardAmount) {
            console.log(id + " added to array position " + i);
            document.getElementById(id).style.opacity="0.5";
            discardPile[discardPile.length] = id;
            rngSaveDiscard[rngSaveDiscard.length] = parseInt(id);
        }
        found = false;
        document.getElementById("alertFooterNumber").innerHTML=discardPile.length + "/" + discardAmount;
        }
    }

    function discardButtonPress() {
        if (discardPile.length == 0) {
            document.getElementById("discardModalBody").innerHTML="Are you sure you want to keep all <strong>" + drawAmount + "</strong> destination tickets?"
        }else{
            document.getElementById("discardModalBody").innerHTML="Are you sure you want to discard <strong>" + discardPile.length + "</strong> out of <strong>" + drawAmount + "</strong> destination tickets?"
        }
    }


    function discardFunction() {
        if (drawerVisible) {
            for (var i = 0; i < rngSaveDiscard.length; i++) {
                document.getElementById(discardPile[i]).remove();

                var index = rngSave.indexOf(rngSaveDiscard[i]);
                if (index > -1) {
                    rngSave.splice(index, 1);
                }
            }
            rngSaveDiscard.length = 0;
            hideDrawer();
            
            drawAmount = aDrawAmount;
            discardAmount = aDiscardAmount;
            console.log("drawAmount changed from " + iDrawAmount + " to " + aDrawAmount);
            console.log("discardAmount changed from " + iDiscardAmount + " to " + aDiscardAmount);

            document.getElementById("discardButton").style.display="none";
            document.getElementById("drawButton").style.display="block";

            updateLocalStorage();

            localStorage.setItem("gameState", 2);
            localGameState = localStorage.getItem("gameState");
        }
    }

    function drawButtonPress() {
        document.getElementById("discardModalHeader").innerHTML="Draw Cards"
        document.getElementById("discardModalBody").innerHTML="Are you sure you want to draw <strong>" + discardAmount + "</strong> additional destination tickets? (YET TO BE IMPLEMENTED)"
        loopArray();
        clearLocalStorage();
    }

    function drawFunction() {

    }

    function updateLocalStorage() {
        localStorage.setItem("rng", JSON.stringify(rngSave));

        localStorage.setItem("localCityA", cityA);
        localStorage.setItem("localCityB", cityB);
        localStorage.setItem("localCityAX", cityAX);
        localStorage.setItem("localCityAY", cityAY);
        localStorage.setItem("localCityBX", cityBX);
        localStorage.setItem("localCityBY", cityBY);
        localStorage.setItem("localScores", scores);
    }

    function clearLocalStorage() {
        localRngSave.length = 0;
        localStorage.setItem("rng", JSON.stringify(rngSave));

        localStorage.setItem("localCityA", []);
        localStorage.setItem("localCityB", []);
        localStorage.setItem("localCityAX", []);
        localStorage.setItem("localCityAY", []);
        localStorage.setItem("localCityBX", []);
        localStorage.setItem("localCityBY", []);
        localStorage.setItem("localScores", []);

        /*localCityA.length = 0;
        localCityB.length = 0;
        localCityAX.length = 0;
        localCityAY.length = 0;
        localCityBX.length = 0;
        localCityBY.length = 0;
        localScores.length = 0;*/
    }

    function clearRngStorage() {
        discardPile.length = 0;
        rngSave.length = 0;
        rngSaveDiscard.length = 0;
    }

    function loopArray() {
        console.log("totalDrawn: " + totalDrawn);
        console.log("rngSave: " + rngSave);
        console.log("rngSaveDiscard: " + rngSaveDiscard);

        localRngSave = JSON.parse(localStorage.getItem("rng"));
        console.log("local: " + localRngSave);

        console.log("localCityA.length: " + localCityA.length);
        console.log("localScores.length: " + localScores.length);

        /*fLen = rngSave.length;
        for (var i = 0; i < fLen; i++) {
            console.log(rngSave[i]);
            console.log(cityA[rngSave[i]] + " - " + cityB[rngSave[i]] + ", " + scores[rngSave[i]] + ", #" + rngSave[i]);
        }*/
    }

    function showDrawer() {
        document.getElementById("alertFooterText").innerHTML="Select up to " + discardAmount + " destination tickets to discard";
        document.getElementById("alertFooterNumber").innerHTML="0/" + discardAmount;
        document.getElementById("spacerDiv").style.height="7rem";
        document.getElementById("alertFooterDiv").style.transform="translateY(-4.5rem)";
        drawerVisible = true;
        console.log("Drawer visible true");
    }

    function hideDrawer() {
        document.getElementById("spacerDiv").style.height="2rem";
        document.getElementById("alertFooterDiv").style.transform="translateY(0.5rem)";
        drawerVisible = false;
        console.log("Drawer visible false");
    }

    function iDrawMinus() {
        if (iDrawAmount-1 <= iDiscardAmount && iDiscardAmount >= 1) {
            iDiscardAmount--;
            document.getElementById("iDiscardAmountLabel").innerHTML = iDiscardAmount;
        }
        if (iDrawAmount > 1) {
            iDrawAmount--;
            document.getElementById("iDrawAmountLabel").innerHTML = iDrawAmount;
        }
    }

    function iDrawPlus() {
        iDrawAmount++;
        document.getElementById("iDrawAmountLabel").innerHTML = iDrawAmount;
    }

    function iDiscardMinus() {
        if (iDiscardAmount >= 1) {
            iDiscardAmount--;
            document.getElementById("iDiscardAmountLabel").innerHTML = iDiscardAmount;
        }
    }

    function iDiscardPlus() {
        if (iDiscardAmount < iDrawAmount-1) {
            iDiscardAmount++;
            document.getElementById("iDiscardAmountLabel").innerHTML = iDiscardAmount;
        }
    }

    function aDrawMinus() {
        if (aDrawAmount-1 <= aDiscardAmount && aDiscardAmount >= 1) {
            aDiscardAmount--;
            document.getElementById("aDiscardAmountLabel").innerHTML = aDiscardAmount;
        }
        if (aDrawAmount > 1) {
            aDrawAmount--;
            document.getElementById("aDrawAmountLabel").innerHTML = aDrawAmount;
        }
    }

    function aDrawPlus() {
        aDrawAmount++;
        document.getElementById("aDrawAmountLabel").innerHTML = aDrawAmount;
    }

    function aDiscardMinus() {
        if (aDiscardAmount >= 1) {
            aDiscardAmount--;
            document.getElementById("aDiscardAmountLabel").innerHTML = aDiscardAmount;
        }
    }

    function aDiscardPlus() {
        if (aDiscardAmount < aDrawAmount-1) {
            aDiscardAmount++;
            document.getElementById("aDiscardAmountLabel").innerHTML = aDiscardAmount;
        }
    }

    function goBack() {
        clearRngStorage();
        clearLocalStorage();
        scrollToTop();
        hideDrawer();
        drawMenu();

        //location.reload();
    }

    function scrollToTop() { 
        window.scrollTo(0, 0); 
    } 

});