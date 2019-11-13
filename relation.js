
var rels = []
var idr = 0

function createRelation(name, color)
{
    this.id = idr++
    this.name = name
    this.color = color
    
    this.side = false
    
    this.choose = false
    
    this.detail = function(){
        var dt = document.createElement("details")
        dt.id = "char-" + this.id
    
        let name = document.createElement("summary")
        
        if(this.choose)
        {
            name.innerHTML = this.name + "◀"
        }
        else{
            name.innerHTML = this.name
        }
        
    
        dt.append(name)
    
        name = document.createElement("span")
        name.innerHTML  = "이름 : "
    
        let name_input = document.createElement("input")
        name_input.type = "text"
        name_input.value = this.name
        name_input.change = this.id
        name_input.onchange = function(){
            let c = indexRel(this.id)
            c.name = this.value
            reset()
        }
        name.append(name_input)
        dt.append(name)
        
        
        color = document.createElement("span")
        color.innerHTML  = "색깔 : "
    
        let color_input = document.createElement("input")
        color_input.type = "text"
        color_input.value = this.color
        color_input.change = this.id
        color_input.style.background = this.color
        color_input.onchange = function(){
            let c = indexRel(this.change)
            c.color = this.value
            this.style.background = this.value
            drawAll()
        }
        color.append(color_input)
        dt.append(color)
        
        let select = document.createElement("span")
        let sbtn = document.createElement("button")
        
        sbtn.innerHTML = "선택"
        sbtn.change = this.id
        sbtn.onclick = function(){
            let c = indexRel(this.change)
            c.select()
            updateRels()
        }
        
        select.append(sbtn)
        dt.append(select)
        
        let remove = document.createElement("span")
        let rbtn = document.createElement("button")
        
        rbtn.innerHTML = "제거"
        rbtn.change = this.id
        rbtn.onclick = function(){
            let c = indexRel(this.change)
            if(c.choose){alert("선택된 관계는 제거할수 없습니다.")
                        return}
            removeRel(c)
            reset()
        }
        
        remove.append(rbtn)
        dt.append(remove)
        
        return dt
    }
    
    this.select = function(){
        rels.forEach(function(x){
            if(x.choose){
                x.choose = false
            }
        })
        
        this.choose = true
        current_rel = this
    }
}

function init_relation()
{
    var frd = new createRelation("친구", "#00ff00")
    var del = new createRelation("제거", null)
    
    rels.push(frd)
    rels.push(del)
    frd.select()
    
    updateRels()
}


function addrelation(){
    
    var name = prompt("관계 이름을 입력하세요.")
    
    if(name == null){return}
    var color = prompt("색깔을 입력하세요.")
    if(color == null){return}
    
    rels.push(new createRelation(name, color))
    
    updateRels()
}

function updateRels()
{
    relation.innerHTML = ""
    
    rels.forEach(function(ch){
        relation.append(ch.detail())
    })
    
    relation.append(relationAdder())
}

function relationAdder()
{
    var result = document.createElement("button")
    
    result.innerHTML = "관계 추가하기"
    result.style.float = "right"
    result.onclick = addrelation
    
    return result
}

function writeRels()
{
    ch_rels.forEach(function(x){
        ctx.beginPath()
        ctx.strokeStyle = x.rel.color
        ctx.moveTo(x.start.x, x.start.y)
        ctx.lineTo(x.target.x, x.target.y)
        ctx.stroke()
        
        ctx.font = default_font
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(x.rel.name, (x.start.x + x.target.x) / 2, (x.start.y + x.target.y) / 2)
        
        if(x.rel.side){
                
        }
    })
            
    ctx.strokeStyle = "#000000"
}

function indexRel(num){
    return rels.find(x => x.id == num)
}

function removeRel(ch){
    rels = rels.filter(function(x){
      return x.id != ch.id  
    })
    
    ch_rels = ch_rels.filter(function(x){
        return x.rel.id != ch.id
    })
}