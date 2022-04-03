const divContainer = document.querySelector("#container")
divContainer.style.display = "flex"
divContainer.style.flexDirection = "column"
divContainer.style.border = "1px solid #000"
divContainer.style.width = "800px"
divContainer.style.height = "800px"
document.querySelector("button").addEventListener("click", clear)

initBoard(16)

function clear() {
    while(divContainer.firstChild) {
        divContainer.removeChild(divContainer.firstChild)
    }

    let newSize = prompt("Enter the desired dimension for the new grid", 16)
    while(newSize > 100 || newSize < 1)
    {
        newSize = prompt("Enter a number (1-100) for the size of the new grid", 16)
    }
    initBoard(newSize)
}

function initBoard(dimension) 
{
    for(let i = 0; i < dimension; i++)
    {
        let divRow = document.createElement("div")
        divRow.style.display = "flex"
        divRow.style.flexDirection = "row"
        divRow.style.width = "100%"
        divRow.style.height = String(100/dimension) + "%"
        for(let j = 0; j < dimension; ++j)
        {
            let div = document.createElement("div")
            div.style.width = String(100/dimension) + "%"
            div.style.height = "100%"
            div.editted = false
            div.color = "rgb(255, 255, 255)"
            div.addEventListener("mouseover", fillIn)
            divRow.appendChild(div)
        }
        divContainer.appendChild(divRow)
    }
}

function fillIn()
{
    let div = event.target
    console.log(div.color)
    if(div.editted) 
    {
        let color = darken(div.color,div.origCol)
        div.style.background = color
        div.color = color
    }
    else
    {
        let color = genColor()
        div.style.background = color
        div.color = color
        div.origCol = color
        div.editted = true
    }
}

function genColor() {
    const R = Math.floor(Math.random() * 256)
    const G = Math.floor(Math.random() * 256)
    const B = Math.floor(Math.random() * 256)
    return `rgb(${R}, ${G}, ${B})`
}

function darken(color, origColor)
{
    origColor = origColor.replace(/[^\d,]/g, '').split(',')
    color = color.replace(/[^\d,]/g, '').split(',').map((x,i)=>x-Math.floor(Number(origColor[i])/10))
    color = color.map(x => (Number(x)<0) ? 0 : x)
    console.error(color)
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
}