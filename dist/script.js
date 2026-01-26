const baseURL = "https://pokeapi.co/api/v2/pokemon/"; // BASE-URL

const pokeItems = document.querySelectorAll(".poke-item")

// pokeItems.forEach(item => console.log(item.innerHTML))

const pokeImg = document.querySelector("#poke-img")
const pokeName = document.querySelector("#poke-name")
const pokeWeight = document.querySelector("#poke-weight")
const pokeHeight = document.querySelector("#poke-height")
const pokeType = document.querySelector("#poke-type")
const pokeAbility = document.querySelector("#poke-abilities")
const input = document.querySelector("#input")
const loader = document.querySelector("#loader")

// console.log(pokeImg.getAttribute("alt"))
// console.log(pokeName.innerHTML)
// console.log(pokeWeight.innerHTML)
// console.log(pokeHeight.innerHTML)
// console.log(pokeType.innerHTML)
// console.log(pokeAbility.innerHTML)

const btn = document.querySelector("#btn")

// console.log(btn.innerHTML)

const heightConv = (val) => {
    if(val<1){
        return `${val*100} cm`;
    }
    else{
        return `${val} m`
    }
}

function weightConv(val){
    return val<1 ? `${val*100} g` : `${val} kg`;
}

btn.addEventListener("click",async () => {
    pokeImg.src = "images/pokeball.png"
    loader.classList.add("hidden")
    loader.innerHTML = "Prof. Oak is typing...."
    pokeItems.forEach(item => item.classList.add("hidden"))

    const inputVal = input.value.toLowerCase()
    console.log(inputVal)

    if(inputVal == "" || !inputVal){
        loader.classList.add("hidden")
        pokeItems.forEach(item => item.classList.add("hidden"))
        return
    }

    try{
        const URL = `${baseURL}${inputVal}`;
        const response = await fetch(URL)
        console.log(response)
        const data = await response.json()
        console.log(data)

        // GETTING ALL THE VALUES
        let nameVal = data.name[0].toUpperCase() + data.name.slice(1)  // poke-name
        let heightVal = heightConv(data.height / 10) // convert to metres
        let weightVal = weightConv(data.weight / 10) // convert to kilos
        let abilityVal = data.abilities.map(ab => {
            abVal = ab.ability.name;
            return abVal[0].toUpperCase() + abVal.slice(1);
        }).join(", ") // all abilities in a joined single string
        let type = data.types[0].type.name
        let typeVal = type[0].toUpperCase() + type.slice(1) // poke-type
        let imgVal = data.sprites.front_default

        loader.classList.remove("hidden")

        setTimeout(()=>{
            loader.classList.add("hidden")
            pokeItems.forEach(item => item.classList.remove("hidden"))
            // pokeItems.forEach(item => item.innerHTML = data.height)

            console.log(nameVal)
            console.log(heightVal)
            console.log(weightVal)
            console.log(typeVal)
            console.log(abilityVal)
            console.log(imgVal)
            
            pokeName.innerHTML = `Name: ${nameVal}`
            pokeHeight.innerHTML = `Height: ${heightVal}`
            pokeWeight.innerHTML = `Weight: ${weightVal}`
            pokeType.innerHTML = `Type: ${typeVal}`
            pokeAbility.innerHTML = `Ability: ${abilityVal}`
            pokeImg.src = imgVal

        }, 2000);
    }
    catch(err){
        alert("Error Occured")
        console.log(err)
        loader.classList.remove("hidden")
        loader.innerHTML = "Prof. Oak is busy"
    }
})
