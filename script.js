function valueSatter(){
    gsap.set("#nav a",{y: "-100%",opacity:0})
    gsap.set("#home span .child",{y:"100%"})
    gsap.set("#home .row img",{opacity: 0})

    document.querySelectorAll("#Visual path, #Visual polyline").forEach(function (element) {
        element.style.strokeDasharray = element.getTotalLength() + 'px';
        element.style.strokeDashoffset = element.getTotalLength() + 'px';
    });
}

function revealToSpan(){
    document.querySelectorAll(".reveal")
    .forEach(function(elem){
        let spanParent = document.createElement("span");
        let spanChild = document.createElement("span");

        spanParent.classList.add("parent");
        spanChild.classList.add("child");

        spanChild.innerHTML = elem.innerHTML;
        spanParent.appendChild(spanChild);

        elem.innerHTML = "";
        elem.appendChild(spanParent);
})
}


function loaderAnimation(){
    let tl = gsap.timeline();

tl
.from("#loader .child span", {
    x: 100,
    duration: 1.4,
    stagger: .2,
    ease: Power3.easeInOut
})
.to("#loader .parent .child", {
    y: "-100%",
    duration: 1,
    ease: Circ.easeInOut
})
.to("#loader",{
    height: 0,
    duration: 1,
    ease: Circ.easeInOut
})
.to("#green",{
    height: "100%",
    top:0,
    duration: 1,
    delay: -1,
    ease: Circ.easeInOut
})
.to("#green",{
    height: "0%",
    top:0,
    duration: .4,
    ease: Circ.easeInOut,
    onComplete: function(){
        animateHomepage();
    }
})

}

function animateSvg() {
    gsap.to("#Visual>g>g>path, #Visual>g>g>polyline", {
        strokeDashoffset: 0,
        duration: 2,
        ease: Expo.easeInOut,
    });
}

function animateHomepage() {

    let tl = gsap.timeline();

    tl
    .to("#nav a",{
        y: 0,
        opacity: 1,
        stagger: .05,
        ease: Expo.easeInOut,
    })

    .to("#home .parent .child",{
        y: 0,
        stagger: .1,
        duration: .5,
        ease: Expo.easeInOut,
    })

    .to("#home .row img",{
        opacity: 1,
        ease: Expo.easeInOut,
        onComplete: function(){
            animateSvg();
        }
    })

}

function locoInitialize() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });
    
}





function cardHoverEffect() {
    document.querySelectorAll(".cnt").forEach(function (cnt) {

        let showingCard;

        cnt.addEventListener('mousemove', function (dets) {
            console.log('mousemove event triggered');
            console.log('dets.target:', dets.target);
            document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 1;
            showingCard = dets.target;
            document.querySelector("#cursor").children[dets.target.dataset.index].style.transform = `translate(${dets.clientX}px,${dets.clientY}px)`;
            showingCard.style.filter = "grayscale(1)";

            document.querySelector("#work").style.backgroundColor = dets.target.dataset.color;
        });

        cnt.addEventListener('mouseleave', function (dets) {
            console.log('mouseleave event triggered');
            console.log('showingCard:', showingCard);
            document.querySelector("#cursor").children[showingCard.dataset.index].style.opacity = 0;
            showingCard.style.filter = "grayscale(0)";

            document.querySelector("#work").style.backgroundColor = "#fff";
        });
    });
}

revealToSpan();
valueSatter();
loaderAnimation();
// locoInitialize();
cardHoverEffect();