
function download() {
    var filename = prompt("파일 이름을 입력해주세요.")
    if(filename == null){return}
    var file = new Blob([JSON.stringify([chars, ch_rels, rels])]);
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}


function upload() {
    var file = event.target.files[0]
    
    var reader = new FileReader();
 
    reader.onload = function () {
        var data = reader.result
        
        var real = JSON.parse(data)
        
        chars = real[0].map(x => {return new ToCharactor(x)})
        ch_rels = real[1]
        rels = real[2].map(x => {return new ToRelation(x)})
        
        drawAll()
    };
 
    reader.readAsText(file, "utf-8");
}