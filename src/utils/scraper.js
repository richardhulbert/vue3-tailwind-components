
let allElements
let classes=[]
function showClasses(){
    allElements = document.getElementById('app').getElementsByTagName('*')
    for (let el of allElements) {
      let  carr= el.className.toString().split(/\s+/)
        for (let i = 0; i < carr.length; i++) {
            classes.push(carr[i])
        }
    }
     let div =document.getElementById('reserved-classes')
    let list = classes.filter(onlyUnique)

    div.innerHTML= list.map(i => `'${i}'`).join(',');
    //console.log(classes.filter(onlyUnique))
}
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}



