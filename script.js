
var canvas;
var ctx;
var state;

var chars = []
var ch_rels = []
var id = 0

var sch = null;
var page = false

var default_font = "15px Arial"
var default_size = 80

var relation = null
var ch_list = null
var current_rel = null

function init(){
    canvas = document.getElementById("main")
    ctx = canvas.getContext('2d')
    state = document.getElementById("state")
    
    relation = document.getElementById("tab-2")
    ch_list = document.getElementById("tab-1")
    
    
    
    let dd = document.getElementsByClassName("main")[0]
    
    canvas.width = dd.offsetWidth
    canvas.height = window.screen.availHeight - 160
    
    
    canvas.onclick = click_canvas
    canvas.onmousemove = move_canvas
    canvas.onmousedown = down_canvas
    canvas.onmouseup = function(){sch = null}
    /*
    //canvas.onmousemove = CanvasMoveEvent
    
    relation = document.getElementById("relation")
    */
    
    init_tab()
    init_setting()
    init_relation()
}

function click_canvas(e)
{
    var loc = {x:e.offsetX,
               y:e.offsetY}
    
    var ch = selectChar(loc)

    if(ch == null){
        addCharactor(loc)
    }
}

function down_canvas(e){
    var loc = {x:e.offsetX,
               y:e.offsetY}
    
    var ch = selectChar(loc)
    
    if(ch == null){return}
    
    sch = ch
}

function up_canvas(e){
    
    var tf = true
    
    var loc = {x:e.offsetX,
               y:e.offsetY}
    
    var ch = selectChar(loc)
    
    if(ch == null || ch.id == sch.id){return}
    
    if(current_rel.color == null){
        ch_rels = ch_rels.filter(function(x){
        return (x.start != sch.id) && (x.target != ch.id)
        })
    }
    else{
        ch_rels.forEach(function(x){
            if(x.start == sch.id && x.target == ch.id){
                x.rel = current_rel
                tf = false
            }
        })
    
        if(tf){
            ch_rels.push({start:sch.id, target:ch.id, rel:current_rel})
        }
    }
    sch = null
    
    drawAll()
}

function move_canvas(e){
    var loc = {x:e.movementX,
               y:e.movementY}
    
    if(sch == null){return}
    
    sch.x += loc.x
    sch.y += loc.y
    
    reset()
}

function move_page(e){
    if(!page){return}
    
    var x = e.movementX
    var y = e.movementY
    
    chars.forEach(function(i){
        i.x += x
        i.y += y
    })
    
    drawAll()
}

function findCharactor(name)
{
    return chars.find(x => x.name == name)
}

function indexCharactor(num){
    return chars.find(x => x.id == num)
}

function addCharactor(loc)
{
    
    let name = prompt("캐릭터 이름을 입력해주세요.")
    
    if(name == null || findCharactor(name) != null){
        return;
    }
    
    let ch = new createCharactor(name, loc)
    
    chars.push(ch)
    
    reset()
}

function reset(){
    drawAll()
    appendTabChar()
    updateRels()
}

function appendTabChar()
{
    ch_list.innerHTML = ""
    
    chars.forEach(function(ch){
        ch_list.append(ch.getDetail())
    })
}

function selectChar(loc)
{   
    
    for(var i in chars)
    {
        let item = chars[i]
        
        if(insideloc(loc, chars[i])){
            return chars[i]
        }
    }
    
    return null
}

function insideloc(loc, ch){
    let tmp = ch.size / 2
    
    let x = loc.x > ch.x - tmp && loc.x < ch.x + tmp
    let y = loc.y > ch.y - tmp && loc.y < ch.y + tmp
    
    return x && y
}

function drawAll()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    writeRels()
    
    chars.forEach(function(ch){
        let tmp = ch.size / 2
        ctx.lineWidth = 5
        ctx.strokeRect(ch.x - tmp,
                       ch.y - tmp,
                       ch.size, ch.size);
        
        ctx.font = ch.font
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(ch.name, ch.x, ch.y + tmp + ch.font_size() + 1);
        
        if(ch.imgfile != null){
            ctx.drawImage(ch.imgfile, ch.x - tmp, ch.y - tmp,ch.size,ch.size);
        }
    })
    
}

function removeChar(ch){
    chars = chars.filter(function(x){
      return x.id != ch.id  
    })
    
    ch_rels = ch_rels.filter(function(x){
        return (x.start != ch.id) && (x.target != ch.id)
    })
        
}

function connect()
{
    canvas.onmousemove = null
    canvas.onmouseup = up_canvas
    canvas.onmousedown = down_canvas
    canvas.onclick = click_canvas
    state.innerHTML = "잇기"
}

function move()
{
    canvas.onmousedown = down_canvas
    canvas.onmouseup = function(){sch = null}
    canvas.onmousemove = move_canvas
    canvas.onclick = click_canvas
    state.innerHTML = "이동"
}

function movePage()
{
    canvas.onmousemove = move_page
    canvas.onmousedown = function(){page=true}
    canvas.onmouseup = function(){page=false}
    canvas.onclick = null
    state.innerHTML = "페이지 이동"
}