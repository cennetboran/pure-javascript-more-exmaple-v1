var models = [
  {
    name: "Bmw-418d",
    image: "img/bmw.jpg",
    link: "http://www.arabalar.com.tr/",
  },
  {
    name: "Mazda CX-3",
    image: "img/mazda.jpg",
    link: "http://www.arabalar.com.tr/",
  },
  {
    name: "Honda",
    image: "img/honda.jpg",
    link: "http://www.arabalar.com.tr/g",
  },
  {
    name: "Volvo",
    image: "img/volvo.jpg",
    link: "http://www.arabalar.com.tr/",
  },
  {
    name: "Skoda",
    image: "img/skoda.jpg",
    link: "http://www.arabalar.com.tr/",
  },
]; //Object created for data

var index = 0;

var slaytCount = models.length;
var interval;
var settings = {
  duration: "2000",
  random: true,
};

init(settings);
// mouse click side to right or left with arrow icon
document
  .querySelector(".fa-arrow-circle-left")
  .addEventListener("click", function () {
    index--;
    showSlide(index);
    console.log(index);
  });
document
  .querySelector(".fa-arrow-circle-right")
  .addEventListener("click", function () {
    index++;
    showSlide(index);
    console.log(index);
  });

// for transitions to stop and click wjen you hover over the arrow icon with the mouse
document.querySelectorAll(".arrow").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    clearInterval(interval);
  });
});
document.querySelectorAll(".arrow").forEach((item) => {
  item.addEventListener("mouseleave", function () {
    init(settings);
  });
});

function init(settings) {
  var prev; // same number control

  interval = setInterval(() => {
    if (settings.rondom) {
      //random index
      do {
        index = Math.floor(Math.random() * slaytCount);
      } while (index == prev);
      prev = index;
    } else {
      // increase index
      if (slaytCount == index + 1) {
        index = -1;
      }
      showSlide(index);
      index++;
    }

    showSlide(index);
  }, settings.duration);
}

function showSlide(i) {
  index = i;
  if (i < 0) {
    index = slaytCount - 1;
  }
  if (i >= slaytCount) {
    index = 0;
  }

  document.querySelector(".card-title").textContent = models[index].name;

  document
    .querySelector(".card-img-top")
    .setAttribute("src", models[index].image);

  document.querySelector(".card-link").setAttribute("href", models[index].link);
}
