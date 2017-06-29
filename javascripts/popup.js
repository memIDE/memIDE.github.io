function closePopup(){
    var popupOverlay = document.getElementById("popup_overlay");
    popupOverlay.style.visibility = "hidden";
    popupOverlay.style.opacity = "0";
}

function openPopup(){
    var popupOverlay = document.getElementById("popup_overlay");
    popupOverlay.style.visibility = "visible";
    popupOverlay.style.opacity = "1";
}
