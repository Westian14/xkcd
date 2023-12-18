var maxComic=-1;
var currentComic;
window.onload=function () {

    getData("latest");

    document.getElementById("first").addEventListener("click", function () {
        if (currentComic!=1) {
            getData(1);
        }
    });

    document.getElementById("prev").addEventListener("click", function () {
        if (currentComic>1) {
            currentComic--;
            getData(currentComic);
        }
    });

    document.getElementById("rand").addEventListener("click", function () {
        let randomComic=Math.floor(Math.random() * maxComic) + 1;
        getData(randomComic);
    });
    

    document.getElementById("next").addEventListener("click", function () { 
        if (currentComic<maxComic) {
            currentComic++;
            getData(currentComic);
        }
    });
    

    document.getElementById("latest").addEventListener("click", function () {
        if (currentComic!=maxComic) {
            getData(maxComic);
        }
    });
}

//Hämtar data från ett api
function getData(which) {
        let mainComic=document.getElementById("mainComic");
        mainComic.innerText="";
        let title=document.getElementById("title");
        title.innerText="";
        let date=document.getElementById("date");
        date.innerText="";

    fetch("https://xkcd.vercel.app/?comic="+which)
        .then(function (response) {
            if (response.status==200) {
                return response.json();
            }
        })
        .then(function (data) {
            if (maxComic<data.num) {
                maxComic=data.num;
            }
            currentComic=data.num;
            appendTitle(data);
            appendComic(data);
            appendDate(data);
        });
}

function appendTitle(data) {
    let title=document.getElementById("title");

    let titel=document.createElement("H1");
    titel.innerHTML=data.title;

    title.appendChild(titel);
}

function appendDate(data) {
    let date=document.getElementById("date");

    let datum=new Date(data.year, data.month - 1, data.day)
    let formatDatum=datum.toLocaleDateString();

    datum=document.createElement("p");
    datum.innerHTML=formatDatum;

    date.appendChild(datum);
}

function appendComic(data) {
    let mainComic=document.getElementById("mainComic");

    let comic=document.createElement("img");
    let cap=document.createElement("figcaption");

    comic.src=data.img;
    cap.innerHTML=data.num;

    mainComic.appendChild(comic);
    mainComic.appendChild(cap);
}

    /*
    titel
    datum skapad med ett js date object
    HTML figure element med img och caption, caption ska innehålle num för serien
    */