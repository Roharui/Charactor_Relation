function tabOn(data){
    var b = document.getElementsByClassName("tab-link")
    var c = document.getElementsByClassName("tab-content")
    
    for(var i = 0; i < c.length; i++){
        c[i].style.display = "none"
        b[i].setAttribute("class", "tab-link")
    }
    
    var x = document.getElementById(data.target.getAttribute("data-tab"))
    data.target.setAttribute("class", "tab-link current")
    
    
    x.style.display = "inherit"
}

function init_tab(){
    let tab = document.getElementsByClassName("tab-link")
    
    for(var i = 0; i < tab.length; i++){
        tab[i].onclick = tabOn
    }
}

function init_setting(){
    var setting = document.getElementById("tab-4")
    
    var inputs = setting.getElementsByTagName("input")
    
    inputs[0].value = default_size
    inputs[1].value = default_font
    
    inputs[0].onchange = function(){
        default_size = parseInt(this.value)
    }
    
    inputs[1].onchange = function(){
        default_font = this.value
    }

}
