const skele = document.querySelector(".skeleton");
window.addEventListener("load", function() {
    skele.forEach(item=> {
        item.classList.remove("skeleton");
    })
})