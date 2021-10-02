document.addEventListener("DOMContentLoaded", function (event) {

    const   vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
            vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
            cardWidth = vw-32,
            cardHeight = Math.floor(cardWidth*0.6);


    var cities = ["Moscow", "Perm", "Omsk", "Krasnoyarsk", "Irkutsk", "Chita", "Khabarovsk", "Tbilisi", "Astrakhan", "Samarkand", "Dihua", "Ulan Bator", "Vladivostok", "Ankara", "Baghdad", "Tehran", "Rawalpindi", "Lhasa", "Xian", "Peking", "Shanghai", "Seoul", "Kobe", "Mecca", "Shiraz", "Karachi", "Agra", "Bombay", "Colombo", "Kathmandu", "Calcutta", "Mandalay", "Hanoi", "Rangoon", "Bangkok", "Singapore", "Saigon", "Macau", "Taipei"];
    var citiesX = [13.31, 24, 34.25, 44.54, 54.54, 61.64, 76.21, 16.76, 18.75, 31.84, 45.3, 56.48, 74.4, 9.92, 17.41, 21.78, 35.64, 47.83, 57.98, 63.79, 67.09, 71.41, 78.67, 14.31, 25, 31.64, 38.46, 36.27, 41.3, 43.97, 45.75, 50.51, 57.33, 50.4, 53.72, 55.53, 57.16, 61.6, 67.86];
    var citiesY = [21.61, 21.02, 21.26, 21.8, 22.46, 24.3, 26.75, 40.67, 34.59, 42.77, 37.54, 32.08, 38.07, 42.62, 52.52, 48.72, 52.61, 54.16, 50.1, 43.1, 53.85, 49.11, 48.92, 67.51, 58.44, 62.15, 60.15, 70.54, 86.84, 58.57, 63.77, 65.21, 64.8, 72.66, 76.48, 91.21, 80.52, 66.21, 62.79];

    var drawnCards = [];
    var discardPile = [];

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
    let totalScoreArray = [];
    let totalScore = 0;

    let iDrawAmount = 5;
    let iDiscardAmount = 2;
    let aDrawAmount = 3;
    let aDiscardAmount = 2;

    let drawAmount;
    let discardAmount;

    let cardDrawCycle = 0;

    let drawerVisible = false;

    let gameStartState = true;
    let gameMode = 1;

    let drawCityAX,
    drawCityAY,
    drawCityBX,
    drawCityBY;

    document.getElementById("fixedBottomDiv").style.pointerEvents="none";

    document.getElementById("image").style.display="none";
    document.getElementById("image_yellow").style.display="none";
    document.getElementById("aCanvasDiv").style.opacity="0";
    document.getElementById("aCanvasDiv").style.pointerEvents="none";
    document.getElementById("footerDiv").style.opacity="0";
    document.getElementById("footerDiv").style.pointerEvents="none";
    document.getElementById("alertFooterDiv").style.opacity="0";
    document.getElementById("alertFooterDiv").style.pointerEvents="none";
    document.getElementById("canvasDiv").style.display="none"
    document.getElementById("spacerDiv").style.display="none";
    document.getElementById("drawButton").style.display="none";
    document.getElementById("drawYesButton").style.display = "none";

    document.getElementById("alertFooterDiv").style.transform="translateY(" + cardHeight * 1.6 + "px)";

    document.getElementById("gamemode1Button").addEventListener("click", function() {changeGameMode(1)});
    document.getElementById("gamemode2Button").addEventListener("click", function() {changeGameMode(2)});
    document.getElementById("gamemode3Button").addEventListener("click", function() {changeGameMode(3)});
    document.getElementById("gamemode4Button").addEventListener("click", function() {changeGameMode(4)});
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
    document.getElementById("drawYesButton").addEventListener("click", aDrawFunction);

    listRoutes();

    createSpacerCanvas();

    function listRoutes() {
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
        console.log(cityA.length + " routes generated!");
        console.log(cityA);
    }

    function changeGameMode(gameMode) {
        switch (gameMode) {
            case 1:
                gameMode = 1;
                console.log("Gamemode changed to: " + gameMode);
                document.getElementById("gamemode1Button").className = "btn ccbtn-yellow ccrounded ccshadow-bottom p-0 mx-1";
                document.getElementById("gamemode2Button").className = "btn ccbtn-white ccrounded ccshadow-bottom p-0 mx-1";
                document.getElementById("gamemode3Button").className = "btn ccbtn-white ccrounded ccshadow-bottom p-0 mx-1";
                document.getElementById("gamemode4Button").className = "btn ccbtn-white ccrounded ccshadow-bottom p-0 mx-1";
                break;
            case 2:
                gameMode = 2;
                console.log("Gamemode changed to: " + gameMode);
                document.getElementById("gamemode1Button").className = "btn ccbtn-white ccrounded ccshadow-bottom p-0 mx-1";
                document.getElementById("gamemode2Button").className = "btn ccbtn-yellow ccrounded ccshadow-bottom p-0 mx-1";
                document.getElementById("gamemode3Button").className = "btn ccbtn-white ccrounded ccshadow-bottom p-0 mx-1";
                document.getElementById("gamemode4Button").className = "btn ccbtn-white ccrounded ccshadow-bottom p-0 mx-1";
                break;
            case 3:
                gameMode = 3;
                console.log("Gamemode changed to: " + gameMode);
                document.getElementById("gamemode1Button").className = "btn ccbtn-white ccrounded ccshadow-bottom p-0 mx-1";
                document.getElementById("gamemode2Button").className = "btn ccbtn-white ccrounded ccshadow-bottom p-0 mx-1";
                document.getElementById("gamemode3Button").className = "btn ccbtn-yellow ccrounded ccshadow-bottom p-0 mx-1";
                document.getElementById("gamemode4Button").className = "btn ccbtn-white ccrounded ccshadow-bottom p-0 mx-1";
                break;
            case 4:
                gameMode = 4;
                console.log("Gamemode changed to: " + gameMode);
                document.getElementById("gamemode1Button").className = "btn ccbtn-white ccrounded ccshadow-bottom p-0 mx-1";
                document.getElementById("gamemode2Button").className = "btn ccbtn-white ccrounded ccshadow-bottom p-0 mx-1";
                document.getElementById("gamemode3Button").className = "btn ccbtn-white ccrounded ccshadow-bottom p-0 mx-1";
                document.getElementById("gamemode4Button").className = "btn ccbtn-yellow ccrounded ccshadow-bottom p-0 mx-1";
                break;
        }
    }

    function startGame() {
        drawAmount = iDrawAmount;
        discardAmount = iDiscardAmount;

        document.getElementById("canvasDiv").innerHTML = "";
        document.getElementById("logo").style.display="none";
        document.getElementById("contentDiv").style.display="none";
        document.getElementById("footerDiv").style.opacity="100";
        document.getElementById("footerDiv").style.pointerEvents="auto";
        document.getElementById("alertFooterDiv").style.opacity="100";
        document.getElementById("alertFooterDiv").style.pointerEvents="auto";
        document.getElementById("canvasDiv").style.display="block"
        document.getElementById("spacerDiv").style.display="block";
        document.getElementById("drawButton").innerHTML="+" + aDrawAmount;

        showDrawer();

        for (var i = 0; i < drawAmount; i++) {

            var rng = Math.floor(Math.random() * scores.length);


            if (!scores[rng]) {
                console.log("Card #" + rng + "already drawn, redrawing...");
                i--;
            }else{
                console.log("Card #" + rng + " drawn: " + cityA[rng] + " - " + cityB[rng] + ", " + scores[rng]);

                drawnCards.push(rng);
                totalScoreArray.push(scores[rng]);

                drawCards(rng);
                

                delete cityA[rng];
                delete cityB[rng];
                delete cityAX[rng];
                delete cityAY[rng];
                delete cityBX[rng];
                delete cityBY[rng];
                delete scores[rng];

                /*cityA.splice(rng,1);
                cityB.splice(rng,1);
                cityAX.splice(rng,1);
                cityAY.splice(rng,1);
                cityBX.splice(rng,1);
                cityBY.splice(rng,1);
                scores.splice(rng,1);*/
            }

        }
    }

    function drawCards(rng) {
        cardDrawCycle++;

        var c = [];
        var ctx = [];
        var img = document.getElementById("image");

        var canvas = document.createElement('canvas');
            canvas.id = rng;
            canvas.width = cardWidth;
            canvas.height = cardHeight;

            var canvasDiv = document.getElementById("canvasDiv");
                canvasDiv.appendChild(canvas);

                document.getElementById(rng).addEventListener("click", function(){ cardClick(this.id); });

        c[cardDrawCycle] = document.getElementById(rng);
                ctx[cardDrawCycle] = c[cardDrawCycle].getContext("2d");
                //var img = document.getElementById("image");
                ctx[cardDrawCycle].drawImage(img, 0, 0, cardWidth, cardHeight);
        
                drawCityAX = cityAX[rng] / 100 * cardWidth;
                drawCityAY = cityAY[rng] / 100 * cardHeight;
                drawCityBX = cityBX[rng] / 100 * cardWidth;
                drawCityBY = cityBY[rng] / 100 * cardHeight;
        
        
                ctx[cardDrawCycle].font = "bold 4vw Arial";
                ctx[cardDrawCycle].fillStyle = "#BB4C47";
                ctx[cardDrawCycle].strokeStyle = "#811C0D";
                ctx[cardDrawCycle].textAlign = "center";
                ctx[cardDrawCycle].lineWidth = 0.001*cardWidth;
                ctx[cardDrawCycle].rotate(-0.03);
                ctx[cardDrawCycle].fillText(cityA[rng], 0.335*cardWidth, 0.14*cardHeight);
                ctx[cardDrawCycle].strokeText(cityA[rng], 0.335*cardWidth, 0.14*cardHeight);
                ctx[cardDrawCycle].rotate(0.06);
                ctx[cardDrawCycle].fillText(cityB[rng], 0.668*cardWidth, 0.09*cardHeight);
                ctx[cardDrawCycle].strokeText(cityB[rng], 0.668*cardWidth, 0.09*cardHeight);
                ctx[cardDrawCycle].rotate(-0.03);
        
                ctx[cardDrawCycle].font = "bold 10vw Arial";
                ctx[cardDrawCycle].fillStyle = "#9A1B13";
                ctx[cardDrawCycle].strokeStyle = "#BB4C47";
                ctx[cardDrawCycle].lineWidth = 0.004*cardWidth;
                ctx[cardDrawCycle].fillText(scores[rng], 0.875*cardWidth, 0.875*cardHeight);
                ctx[cardDrawCycle].strokeText(scores[rng], 0.875*cardWidth, 0.875*cardHeight);
        
                ctx[cardDrawCycle].beginPath();
                ctx[cardDrawCycle].moveTo(drawCityAX, drawCityAY);
                ctx[cardDrawCycle].lineTo(drawCityBX, drawCityBY);
                ctx[cardDrawCycle].strokeStyle = "darkred";
                ctx[cardDrawCycle].lineWidth = 0.006*cardWidth;
                ctx[cardDrawCycle].stroke();
        
                ctx[cardDrawCycle].beginPath();
                ctx[cardDrawCycle].arc(drawCityAX, drawCityAY, 0.016*cardWidth, 0, 2 * Math.PI);
                ctx[cardDrawCycle].fillStyle = "#C43C1A";
                ctx[cardDrawCycle].fill();
                ctx[cardDrawCycle].stroke();
        
                ctx[cardDrawCycle].beginPath();
                ctx[cardDrawCycle].arc(drawCityBX, drawCityBY, 0.016*cardWidth, 0, 2 * Math.PI);
                ctx[cardDrawCycle].fill();
                ctx[cardDrawCycle].stroke();
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
            //var img = document.getElementById("image");

        var found = false;

        for(var i = 0; i < discardPile.length; i++) {
            console.log("Comparing discard pile cards #" + discardPile[i] + " and #" + id);
            if (discardPile[i] == id) {
                found = true;
                console.log("Card #" + id + " found in dicard pile at position " + i);
                document.getElementById(id).style.opacity="1";
                discardPile.splice(i,1);
                console.log("Card #" + id + " removed from discard pile.");
                break;
            }
        }

        if (!found && discardPile.length < discardAmount) {
            console.log("Card #" + id + " added to discard pile position " + i);
            document.getElementById(id).style.opacity="0.5";
            discardPile[discardPile.length] = id;

            /*ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(cardWidth, cardHeight);
            ctx.strokeStyle = "#EFEFEF";
            ctx.lineWidth = 0.1*cardWidth;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(cardWidth, 0);
            ctx.lineTo(0, cardHeight);
            ctx.stroke();*/

        } /*else if (!found && discardPile.length >= discardAmount) {
            wiggleDiscardAmount();
        }*/
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
        console.log("DISCARDFUNCTION INITIALIZED");
        if (drawerVisible) {
            var newCardsAmount = drawAmount - discardPile.length;
            for (var i = 0; i < discardPile.length; i++) {
                document.getElementById(discardPile[i]).remove();

                var index = drawnCards.indexOf(parseInt(discardPile[i]));
                if (index > -1) {
                    drawnCards.splice(index, 1);
                    totalScoreArray.splice(index, 1);
                }
                console.log("Removed discarded card #" + discardPile[i] + " from drawn cards at position #" + index);
                console.log("Drawn cards: [" + drawnCards + "]");

            }
            totalScore = 0;
                for (var j = 0; j < totalScoreArray.length; j++) {
                    totalScore += totalScoreArray[j];
                }
                console.log("Total score: [" + totalScoreArray + "] = " + totalScore);
            hideDrawer();
            
            drawAmount = aDrawAmount;
            discardAmount = aDiscardAmount;
            console.log("'drawAmount' changed from initial to additional. (" + iDrawAmount + " -> " + aDrawAmount + ")");
            console.log("'discardAmount' changed from initial to additional. (" + iDiscardAmount + " -> " + aDiscardAmount + ")");


            document.getElementById("discardButton").style.display="none";
            document.getElementById("drawButton").style.display="block";
        }
        discardPile.length = 0;

        document.getElementById("footerScore").innerHTML="<i class='fas fa-trophy cctext-orange px-2'></i>" + totalScore;
        document.getElementById("footerTickets").innerHTML = "<i class='fas fa-ticket-alt cctext-green px-2'></i>" + drawnCards.length;

        if (!gameStartState) {
            //document.getElementById("canvasDiv").innerHTML="";
            for (var i = 0; i < newCardsAmount; i++) {
                var lastDrawnCard = drawnCards.length-i-1;
                drawCards(drawnCards[lastDrawnCard]);

                delete cityA[drawnCards[i]];
                delete cityB[drawnCards[i]];
                delete cityAX[drawnCards[i]];
                delete cityAY[drawnCards[i]];
                delete cityBX[drawnCards[i]];
                delete cityBY[drawnCards[i]];
                delete scores[drawnCards[i]];
            }
        }else{
            gameStartState = false;
        }
    }

    function drawButtonPress() {
        document.getElementById("discardModalHeader").innerHTML="Draw Cards"
        document.getElementById("discardModalBody").innerHTML="Are you sure you want to draw <strong>" + drawAmount + "</strong> additional destination tickets?"
        document.getElementById("discardYesButton").style.display = "none";
        document.getElementById("drawYesButton").style.display = "block";
    }

    function aDrawFunction() {
        var c = [];
        var ctx = [];
        var img = document.getElementById("image_yellow");

        document.getElementById("aCanvasDiv").innerHTML="";
        createSpacerCanvas();

        aShowDrawer();
        document.getElementById("aCanvasDiv").style.opacity="100";
        document.getElementById("aCanvasDiv").style.pointerEvents="auto";
        document.getElementById("canvasDiv").style.pointerEvents = "none";

        document.getElementById("discardButton").style.display="block";
        document.getElementById("drawButton").style.display="none";
        document.getElementById("discardYesButton").style.display = "block";
        document.getElementById("drawYesButton").style.display = "none";

        for (var i = 0; i < drawAmount; i++) {

            var rng = Math.floor(Math.random() * scores.length-1);


            var canvas = document.createElement('canvas');
            canvas.id = rng;
            canvas.width = cardWidth;
            canvas.height = cardHeight;


            if (!scores[rng] || drawnCards.includes(rng)) {
                console.log("Card #" + rng + " already drawn, redrawing...");
                i--;
            }else{
                console.log("Card #" + rng + " drawn: " + cityA[rng] + " - " + cityB[rng] + ", " + scores[rng]);

                var canvasDiv = document.getElementById("aCanvasDiv");
                canvasDiv.appendChild(canvas);
                
                hideSpacerCanvas();

                drawnCards.push(rng);
                totalScoreArray.push(scores[rng]);
                console.log("TOTALSCOREARRAY UPDATED");

                document.getElementById(rng).addEventListener("click", function(){ cardClick(this.id); });
        
                c[i] = document.getElementById(rng);
                ctx[i] = c[i].getContext("2d");
                //var img = document.getElementById("image");
                ctx[i].drawImage(img, 0, 0, cardWidth, cardHeight);
        
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

                ctx[i].beginPath();
                ctx[i].arc(drawCityAX, drawCityAY, 0.016*cardWidth, 0, 2 * Math.PI);
                ctx[i].fillStyle = "#C43C1A";
                ctx[i].fill();
                ctx[i].stroke();
        
                ctx[i].beginPath();
                ctx[i].arc(drawCityBX, drawCityBY, 0.016*cardWidth, 0, 2 * Math.PI);
                ctx[i].fill();
                ctx[i].stroke();

                /*delete cityA[rng];
                delete cityB[rng];
                delete cityAX[rng];
                delete cityAY[rng];
                delete cityBX[rng];
                delete cityBY[rng];
                delete scores[rng];*/

                /*cityA.splice(rng,1);
                cityB.splice(rng,1);
                cityAX.splice(rng,1);
                cityAY.splice(rng,1);
                cityBX.splice(rng,1);
                cityBY.splice(rng,1);
                scores.splice(rng,1);*/
            }

        }
    }

    function createSpacerCanvas() {
        var canvas = document.createElement('canvas');
            canvas.id = "spacerCanvas";
            canvas.width = cardWidth;
            canvas.height = cardHeight;

            var canvasDiv = document.getElementById("aCanvasDiv");
                canvasDiv.appendChild(canvas);
    }

    function showSpacerCanvas() {
        document.getElementById("spacerCanvas").style.display="block";
    }

    function hideSpacerCanvas() {
        document.getElementById("spacerCanvas").style.display="none";
    }

    /*function wiggleDiscardAmount() {
        document.getElementById("alertFooterNumberDiv").style.webkitAnimationName="wiggle";
        document.getElementById("alertFooterNumberDiv").style.webkitAnimationDuration="0.2s";
        document.getElementById("alertFooterNumberDiv").style.webkitAnimationIterationCount="1";
        document.getElementById("alertFooterNumberDiv").style.webkitAnimationTimingFunction="ease-in-out";
        document.getElementById("alertFooterNumberDiv").style.animationName="wiggle";
        document.getElementById("alertFooterNumberDiv").style.animationDuration="0.2s";
        document.getElementById("alertFooterNumberDiv").style.animationIterationCount="1";
        document.getElementById("alertFooterNumberDiv").style.animationTimingFunction="ease-in-out";
        document.getElementById("alertFooterNumberDiv").style.transitionDuration="0.2s";
        console.log("WIGGLED!");
    }*/

    function loopArray() {
        console.log("--DEVBTN PRESSED----------");
        /*fLen = discardPile.length;
        for (var i = 0; i < fLen; i++) {
            console.log(discardPile[i]);
        }*/

        console.log("drawnCards: " + drawnCards);
        console.log("discardPile: " + discardPile);
        console.log("drawnCards.length: " + drawnCards.length);

        drawnCards.sort(function(a,b){return a-b});
        console.log("drawnCards sorted!");

        console.log("--------------------------");
    }

    function showDrawer() {
        document.getElementById("alertFooterText").innerHTML="Select up to " + discardAmount + " destination tickets to discard";
        document.getElementById("alertFooterNumber").innerHTML="0/" + discardAmount;
        document.getElementById("spacerDiv").style.height= cardHeight * 0.6 + "px";
        //document.getElementById("alertFooterDiv").style.transform="translateY(9.5rem)";
        //document.getElementById("alertFooterDiv").style.transform="translateY(24vh)";
        document.getElementById("alertFooterDiv").style.transform="translateY(" + cardHeight * 1.15 + "px)";
        drawerVisible = true;
        console.log("Discard phase initialized with " + iDrawAmount + " cards.");
    }

    function aShowDrawer() {
        document.getElementById("alertFooterText").innerHTML="Select up to " + discardAmount + " destination tickets to discard";
        document.getElementById("alertFooterNumber").innerHTML="0/" + discardAmount;
        document.getElementById("spacerDiv").style.height= cardHeight * 1.8 + "px";
        //document.getElementById("alertFooterDiv").style.transform="translateY(-4rem)";
        //document.getElementById("alertFooterDiv").style.transform="translateY(-10vh)";
        document.getElementById("alertFooterDiv").style.transform="translateY(0)";
        drawerVisible = true;
        console.log("Additional discard phase initialized with " + aDrawAmount + " cards.");
    }

    function hideDrawer() {
        document.getElementById("spacerDiv").style.height= cardHeight * 0.2 + "px";
        //document.getElementById("spacerDiv").style.height="6vh";
        //document.getElementById("alertFooterDiv").style.transform="translateY(46vh)";
        document.getElementById("alertFooterDiv").style.transform="translateY(" + cardHeight * 1.6 + "px)";
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

        if (iDrawAmount == 1) {
            document.getElementById("iDrawMinusButton").disabled = true;
        }
        if (iDiscardAmount == 0) {
            document.getElementById("iDiscardMinusButton").disabled = true;
        }
        if (iDiscardAmount == iDrawAmount-1) {
            document.getElementById("iDiscardPlusButton").disabled = true;
        }
    }

    function iDrawPlus() {
        iDrawAmount++;
        document.getElementById("iDrawAmountLabel").innerHTML = iDrawAmount;

        if (iDrawAmount > 1) {
            document.getElementById("iDrawMinusButton").disabled = false;
        }
        if (iDiscardAmount < iDrawAmount) {
            document.getElementById("iDiscardPlusButton").disabled = false;
        }
    }

    function iDiscardMinus() {
        if (iDiscardAmount >= 1) {
            iDiscardAmount--;
            document.getElementById("iDiscardAmountLabel").innerHTML = iDiscardAmount;
        }

        if (iDiscardAmount == 0) {
            document.getElementById("iDiscardMinusButton").disabled = true;
        }
        if (iDiscardAmount < iDrawAmount) {
            document.getElementById("iDiscardPlusButton").disabled = false;
        }
    }

    function iDiscardPlus() {
        if (iDiscardAmount < iDrawAmount-1) {
            iDiscardAmount++;
            document.getElementById("iDiscardAmountLabel").innerHTML = iDiscardAmount;
        }

        if (iDiscardAmount == iDrawAmount-1) {
            document.getElementById("iDiscardPlusButton").disabled = true;
        }
        if (iDiscardAmount > 0) {
            document.getElementById("iDiscardMinusButton").disabled = false;
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

        if (aDrawAmount == 1) {
            document.getElementById("aDrawMinusButton").disabled = true;
        }
        if (aDiscardAmount == 0) {
            document.getElementById("aDiscardMinusButton").disabled = true;
        }
        if (aDiscardAmount == aDrawAmount-1) {
            document.getElementById("aDiscardPlusButton").disabled = true;
        }
    }

    function aDrawPlus() {
        aDrawAmount++;
        document.getElementById("aDrawAmountLabel").innerHTML = aDrawAmount;

        if (aDrawAmount > 1) {
            document.getElementById("aDrawMinusButton").disabled = false;
        }
        if (aDiscardAmount < aDrawAmount) {
            document.getElementById("aDiscardPlusButton").disabled = false;
        }
    }

    function aDiscardMinus() {
        if (aDiscardAmount >= 1) {
            aDiscardAmount--;
            document.getElementById("aDiscardAmountLabel").innerHTML = aDiscardAmount;
        }

        if (aDiscardAmount == 0) {
            document.getElementById("aDiscardMinusButton").disabled = true;
        }
        if (aDiscardAmount < aDrawAmount) {
            document.getElementById("aDiscardPlusButton").disabled = false;
        }
    }

    function aDiscardPlus() {
        if (aDiscardAmount < aDrawAmount-1) {
            aDiscardAmount++;
            document.getElementById("aDiscardAmountLabel").innerHTML = aDiscardAmount;
        }

        if (aDiscardAmount == aDrawAmount-1) {
            document.getElementById("aDiscardPlusButton").disabled = true;
        }
        if (aDiscardAmount > 0) {
            document.getElementById("aDiscardMinusButton").disabled = false;
        }
    }

    function goBack() {
        /*resetArrays();
        scrollToTop();
        hideDrawer();
        document.getElementById("logo").style.display="block";
        document.getElementById("canvasDiv").innerHTML = "";
        document.getElementById("canvasDiv").style.display="none";
        document.getElementById("spacerDiv").style.display="none";
        document.getElementById("contentDiv").style.display="flex";
        document.getElementById("footerDiv").style.opacity="0";
        document.getElementById("footerDiv").style.pointerEvents="none";
        document.getElementById("alertFooterDiv").style.opacity="0";
        document.getElementById("alertFooterDiv").style.pointerEvents="none";
        scrollToTop();*/

        location.reload();
    }

    function scrollToTop() { 
        window.scrollTo(0, 0); 
    } 

});