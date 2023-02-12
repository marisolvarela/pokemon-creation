const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes= document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

const typesColors = {
    electric:' #FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water:' #0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7C',
    grass: '#4A9681',
    psychic:'#FFC6D9',
    ghost: '#561D25',
    bug:'#A2FAA3',
    poison:'#795663',
    ground:'#D2B074',
    dragon:'#DA627D',
    steel:'#1D8A99',
    fighting:'#2F2F2F',
    default:'#2A1A1F',
};

const searchPokemon = event =>{
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then(data => data.json())
    .then(resp => renderPokemonData(resp))
    .catch(err => renderNotFound())
}

const renderPokemonData = data =>{
    const sprite = data.sprites.front_default;
    const { stats, types } = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src',sprite);
    pokeId.textContent = `Nº ${ data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    console.log(data);
}

const setCardColor = types =>{
    const colorOne = typesColors [types[0].type.name];
    const colorTwo = types[1] ? typesColors[types[1].type.name] : typesColors.default;

    pokeImg.style.background = `radial-gradient(${colorTwo} 33% , ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

const renderPokemonTypes = types =>{
    pokeTypes.innerHTML = '';
    types.forEach( type =>{
        const typeElement = document.createElement('div');
        typeElement.style.color = typesColors[type.type.name];
        typeElement.textContent = type.type.name;
        pokeTypes.appendChild(typeElement);
        
    });

}

const renderPokemonStats = stats =>{
    pokeStats.innerHTML ='';
    stats.forEach(stat =>{
        const statElement = document.createElement('div');
        const statElementName = document.createElement('div');
        const statElementAmount = document.createElement('div')
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    
    });
}

const renderNotFound = () =>{
    pokeName.textContent = 'Not found';
    pokeImg.setAttribute('src', 'poke-shadow.png');
    pokeImg.style.background = '#fff';
    pokeId.textContent = '';
    pokeTypes.innerHTML ='';
    pokeStats.innerHTML ='';
}

