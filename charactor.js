function createCharactor(name, loc)
{
    this.id = id++
    this.name = name
    
    this.x = loc.x
    this.y = loc.y
    
    this.size = default_size
    this.font = default_font
    
    this.imgfile = null
    
    this.rel = []
    
    this.getDetail = function(){
        
        var dt = document.createElement("details")
        dt.id = "char-" + this.id
    
        let name = document.createElement("summary")
        name.innerHTML = this.name
    
        dt.append(name)
    
        name = document.createElement("span")
        name.innerHTML  = "이름 : "
    
        let name_input = document.createElement("input")
        name_input.type = "text"
        name_input.value = this.name
        name_input.change = this.id
        name_input.onchange = function(){
            let c = indexCharactor(this.change)
            c.name = this.value
            reset()
        }
        name.append(name_input)
        dt.append(name)
    
        let x = document.createElement("span")
        x.innerHTML  = "x : "
    
        let x_input = document.createElement("input")
        x_input.type = "text"
        x_input.value = this.x
        x_input.change = this.id
        x_input.onchange = function(){
            let c = indexCharactor(this.id)
            if(isNaN(parseInt(this.value))){
                return
            }
            c.x = this.value
            drawAll()
        }
        
        x.append(x_input)
    
        dt.append(x)
    
        let y = document.createElement("span")
        y.innerHTML  = "y : "
    
        let y_input = document.createElement("input")
        y_input.type = "text"
        y_input.value = this.y
        y_input.change = this.id
        y_input.onchange = function(){
            let c = indexCharactor(this.id)
            if(isNaN(parseInt(this.value))){
                return
            }
            c.y = this.value
            drawAll()
        }

        y.append(y_input)
    
        dt.append(y)
    
        let size = document.createElement("span")
        size.innerHTML = "size : "
    
        let size_input = document.createElement("input")
        size_input.type = "text"
        size_input.value = this.size
        size_input.change = this.id
        size_input.onchange = function(){
            let c = indexCharactor(this.change)
            if(isNaN(parseInt(this.value))){
                return
            }
            c.size = this.value
            drawAll()
        }
        size.append(size_input)
        dt.append(size)
        
        let font = document.createElement("span")
        font.innerHTML = "font : "
    
        let font_input = document.createElement("input")
        font_input.type = "text"
        font_input.value = this.font
        font_input.change = this.id
        font_input.onchange = function(){
            let c = indexCharactor(this.change)
            c.font = this.value
            drawAll()
        }
        font.append(font_input)
        dt.append(font)
        
        let img = document.createElement("span")
        let img_input = document.createElement("input")
        
        img_input.type = "file"
        img_input.accept = "image/*"
        img_input.change = this.id
        img_input.onchange = function(){
            if(!(this.files && this.files[0])){return}
            let c = indexCharactor(this.change)
            
            c.imgfile = new Image()
            
            var FR = new FileReader();
            
            FR.addEventListener("load", function(e){
                c.imgfile.src = e.target.result
            })
            
            FR.readAsDataURL(this.files[0])
            
            c.imgfile.onload = function(){console.log(null)}
            
            drawAll()
        }
        
        img.append(img_input)
        dt.append(img)
        
        let remove = document.createElement("span")
        let rbtn = document.createElement("button")
        
        rbtn.innerHTML = "제거"
        rbtn.change = this.id
        rbtn.onclick = function(){
            let c = indexCharactor(this.change)
            removeChar(c)
            reset()
        }
        
        remove.append(rbtn)
        dt.append(remove)
    
        return dt
    }
    
    this.font_size = function(){
        var tmp = this.font.split(" ")[0]
        tmp = tmp.replace('px', '')
        
        return parseInt(tmp)
    }
    
}

function ToCharactor(obj)
{
    this.id = obj.id
    this.name = obj.name
    
    this.x = obj.x
    this.y = obj.y
    
    this.size = obj.size
    this.font = obj.font
    
    this.imgfile = null
    
    this.rel = []
    
    this.getDetail = function(){
        
        var dt = document.createElement("details")
        dt.id = "char-" + this.id
    
        let name = document.createElement("summary")
        name.innerHTML = this.name
    
        dt.append(name)
    
        name = document.createElement("span")
        name.innerHTML  = "이름 : "
    
        let name_input = document.createElement("input")
        name_input.type = "text"
        name_input.value = this.name
        name_input.change = this.id
        name_input.onchange = function(){
            let c = indexCharactor(this.change)
            c.name = this.value
            reset()
        }
        name.append(name_input)
        dt.append(name)
    
        let x = document.createElement("span")
        x.innerHTML  = "x : "
    
        let x_input = document.createElement("input")
        x_input.type = "text"
        x_input.value = this.x
        x_input.change = this.id
        x_input.onchange = function(){
            let c = indexCharactor(this.id)
            if(isNaN(parseInt(this.value))){
                return
            }
            c.x = this.value
            drawAll()
        }
        
        x.append(x_input)
    
        dt.append(x)
    
        let y = document.createElement("span")
        y.innerHTML  = "y : "
    
        let y_input = document.createElement("input")
        y_input.type = "text"
        y_input.value = this.y
        y_input.change = this.id
        y_input.onchange = function(){
            let c = indexCharactor(this.id)
            if(isNaN(parseInt(this.value))){
                return
            }
            c.y = this.value
            drawAll()
        }

        y.append(y_input)
    
        dt.append(y)
    
        let size = document.createElement("span")
        size.innerHTML = "size : "
    
        let size_input = document.createElement("input")
        size_input.type = "text"
        size_input.value = this.size
        size_input.change = this.id
        size_input.onchange = function(){
            let c = indexCharactor(this.change)
            if(isNaN(parseInt(this.value))){
                return
            }
            c.size = this.value
            drawAll()
        }
        size.append(size_input)
        dt.append(size)
        
        let font = document.createElement("span")
        font.innerHTML = "font : "
    
        let font_input = document.createElement("input")
        font_input.type = "text"
        font_input.value = this.font
        font_input.change = this.id
        font_input.onchange = function(){
            let c = indexCharactor(this.change)
            c.font = this.value
            drawAll()
        }
        font.append(font_input)
        dt.append(font)
        
        let img = document.createElement("span")
        let img_input = document.createElement("input")
        
        img_input.type = "file"
        img_input.accept = "image/*"
        img_input.change = this.id
        img_input.onchange = function(){
            if(!(this.files && this.files[0])){return}
            let c = indexCharactor(this.change)
            
            c.imgfile = new Image()
            
            var FR = new FileReader();
            
            FR.addEventListener("load", function(e){
                c.imgfile.src = e.target.result
            })
            
            FR.readAsDataURL(this.files[0])
            
            c.imgfile.onload = function(){console.log(null)}
            
            drawAll()
        }
        
        img.append(img_input)
        dt.append(img)
        
        let remove = document.createElement("span")
        let rbtn = document.createElement("button")
        
        rbtn.innerHTML = "제거"
        rbtn.change = this.id
        rbtn.onclick = function(){
            let c = indexCharactor(this.change)
            removeChar(c)
            reset()
        }
        
        remove.append(rbtn)
        dt.append(remove)
    
        return dt
    }
    
    this.font_size = function(){
        var tmp = this.font.split(" ")[0]
        tmp = tmp.replace('px', '')
        
        return parseInt(tmp)
    }
    
}

