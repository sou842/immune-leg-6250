function Sliders(o) {
  "use strict";
  var time = o.time || 500,
      autoTime = o.autoTime || 5000,
      selector = o.selector,
      width_height = o.width_height || 100 / 70,
      sliders = document.querySelectorAll(selector),
      i;
  function css(elm, prop, val) {
    elm.style[prop] = val;
    prop = prop[0].toUpperCase() + prop.slice(1);
    elm.style["webkit" + prop] = elm.style["moz" + prop] =
      elm.style["ms" + prop] = elm.style["o" + prop] = val;
  }
  function anonimFunc(slider) {
    var buttonLeft = slider.children[2],
        buttonRight = slider.children[1],
        ul = slider.children[0],
        li = ul.children,
        activeIndex = 0,
        isAnimate = false,
        i,
        s;
    ul.style.paddingTop = (100 / width_height) + "%";
    for (i = 0; i < li.length; i += 1) {
      css(li[i], "animationDuration", time + "ms");
    }
    li[activeIndex].classList.add("active");
    function left() {
      if (isAnimate) {return; }
      clearTimeout(s);
      isAnimate = true;
      var nextIndex = (activeIndex < li.length - 1) ? (activeIndex + 1) : (0);
      li[nextIndex].classList.add("next");
      li[activeIndex].classList.add("left");
      li[nextIndex].classList.add("active");
      setTimeout(function () {
        li[activeIndex].classList.remove("active");
        li[activeIndex].classList.remove("left");
        li[nextIndex].classList.remove("next");
        li[nextIndex].classList.add("active");
        activeIndex = nextIndex;
        isAnimate = false;
        s = setTimeout(left, autoTime);
      }, time);
    }
    function right() {
      if (isAnimate) {return; }
      clearTimeout(s);
      isAnimate = true;
      var nextIndex = (activeIndex > 0) ? (activeIndex - 1) : (li.length - 1);
      li[nextIndex].classList.add("previous");
      li[activeIndex].classList.add("right");
      li[nextIndex].classList.add("active");
      setTimeout(function () {
        li[activeIndex].classList.remove("active");
        li[activeIndex].classList.remove("right");
        li[nextIndex].classList.remove("previous");
        li[nextIndex].classList.add("active");
        activeIndex = nextIndex;
        isAnimate = false;
        s = setTimeout(right, autoTime);
      }, time);
    }
    buttonLeft.addEventListener("click", left);
    buttonRight.addEventListener("click", right);
    s = setTimeout(right, autoTime);
  }
  for (i = 0; i < sliders.length; i += 1) {
    anonimFunc(sliders[i]);
  }
}


/* -- how to use it ? -- */
var sliders = new Sliders({
  selector: ".slider",
  time: 500,
  autoTime: 1000000,
  width_height: 350 / 250
});