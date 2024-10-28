import { LitElement, html, } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import '@bbva-web-components/bbva-button-default/bbva-button-default';
import '@bbva-experience-components/bbva-type-text/bbva-type-text.js';
import '@bbva-experience-components/bbva-expandable-accordion/bbva-expandable-accordion';
import '@cells-components/cells-template-paper-drawer-panel.js';
import '@bbva-web-components/bbva-foundations-spinner/bbva-foundations-spinner.js';
import styles from './PokemonUi-styles.js';

export class PokemonUi extends LitElement {
  static get is() {
    return 'pokemon-ui';
  }

  // Declare properties
  static get properties() {
    return {
      url: { type: String, },
      pokemons: { type: Array, },
      pokemonsEvolutions: { type: Array, },
      Contador: { type: Number, },
      comprobador: { type: Boolean, },
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.pokemonsEvolutions = [];
    this.pokemons = [];
    this.url = 'https://pokeapi.co/api/v2/evolution-chain?limit=541';//541
    this.evolutionPokemon();
    this.Contador = -1;
    this.comprobador = false;
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('pokemon-ui-shared-styles')
    ];
  }

  async dataUrl(url) {
  try {
    const data = await fetch(url);
      if (data.ok) {
        return await data.json();
      }else{return false }
  } catch (error) {
  }};

async evolutionPokemon (){
  const urlEvolution = await this.dataUrl(this.url);
  const datosPokemon = [];
  for (let i = 0; i < urlEvolution.results.length; i++) {
    const firstEvolution = await this.dataUrl(urlEvolution.results[i].url);
    const datosPrimero = await this.dataUrl('https://pokeapi.co/api/v2/pokemon/'+firstEvolution.chain.species.name);
    if(datosPrimero){
      this.evolutionPokemonId(firstEvolution.id);
      datosPokemon.push({
      id: firstEvolution.id,
      name: firstEvolution.chain.species.name,
      img: datosPrimero.sprites.other.home.front_default || datosPrimero.sprites.other.dream_world.front_default,
      types: {
        first : datosPrimero.types[0]?.type.name ,
        second : datosPrimero.types[1]?.type.name ? datosPrimero.types[1]?.type.name : ''
      },
      evolutions: firstEvolution.chain.evolves_to.length ? true : false,
      ev : await this.evolutionPokemonId(firstEvolution.id)
    });
    }else{continue;}  
  }
  this.pokemons = datosPokemon;
  console.log(this.pokemons);
  this.comprobador = true;
}

async evolutionPokemonId (id){
 const evolutionId = await this.dataUrl('https://pokeapi.co/api/v2/evolution-chain/'+ id);
    const evolutionsData = [];
      for (let i = 0; i < evolutionId.chain.evolves_to.length; i++) {
        const evolutionName = await this.dataUrl('https://pokeapi.co/api/v2/pokemon/'+ evolutionId.chain.evolves_to[i].species.name);
        if(evolutionName){
          evolutionsData.push({
            name: evolutionName.species.name,
            img: evolutionName.sprites.other.home.front_default || evolutionName.sprites.other.dream_world.front_default,
            types: {
              first : evolutionName.types[0]?.type.name ,
              second : evolutionName.types[1]?.type.name ? evolutionName.types[1]?.type.name : ''
            }
          });
        }
        for (let j = 0; j < evolutionId.chain.evolves_to[i].evolves_to.length; j++) {
          const evolutionName2 = await this.dataUrl('https://pokeapi.co/api/v2/pokemon/'+ evolutionId.chain.evolves_to[i].evolves_to[j].species.name);
          if(evolutionName2){
            evolutionsData.push({
              name: evolutionName2.species.name,
              img: evolutionName2.sprites.other.home.front_default || evolutionName2.sprites.other.dream_world.front_default,
              types: {
                first : evolutionName2.types[0]?.type.name ,
                second : evolutionName2.types[1]?.type.name ? evolutionName2.types[1]?.type.name : false
              }
            });
          }
        }
  }
  return evolutionsData;
}

  get pokemonlistfulla(){
  if (!this.pokemons.length) {
    return null;
  }
  this.Contador++
  return this.pokemons[this.Contador].ev.map((pokemon) => {
    return html `
    <div class="tarjeta ${pokemon.types.first}">
      <div class="cuerpo">
        <span class="badge fairy">Evolution</span>
        <bbva-type-text class="${pokemon.types.first}" text="${pokemon.name}" size="2XL" alignment="center"></bbva-type-text>
        <img src="${pokemon.img}" alt="${pokemon.name}" width="200" height="200">
      </div>
      <div class="pie">
        <li>
            ${pokemon.types.second ? 
            html`<span class="badge ${pokemon.types.first}">${pokemon.types.first}</span>
            <span class="badge ${pokemon.types.second}">${pokemon.types.second}</span>` 
            : 
            html`<span class="badge ${pokemon.types.first}">${pokemon.types.first}</span>`}
        </li>
      </div>
    </div>
    `; 
  }
);
}

get pokemonList() {
  if (!this.pokemons.length) {
    return null;
  }
  return this.pokemons.map((pokemon) => {
    return html`
    <div class="tarjeta ${pokemon.types.first}">
      <div class="cuerpo">
        <bbva-type-text class="${pokemon.types.first}" text="${pokemon.name}" size="2XL" alignment="center"></bbva-type-text>
        <img src="${pokemon.img}" alt="${pokemon.name}" width="200" height="200">
      </div>
      <div class="pie">
        <li>
          ${pokemon.types.second ? 
          html`<span class="badge ${pokemon.types.first}">${pokemon.types.first}</span>
          <span class="badge ${pokemon.types.second}">${pokemon.types.second}</span>` 
          : 
          html`<span class="badge ${pokemon.types.first}">${pokemon.types.first}</span>`}
        </li>
      </div>
    </div>
  ${this.pokemonlistfulla}
    `
  });
  }

  // Define a template
  render() {
    return html`
      <slot></slot>
      <div class="contenedor"> 
       ${this.comprobador ? html`${this.pokemonList}` : html`<bbva-foundations-spinner size="200" with-mask></bbva-foundations-spinner>`}
      </div> 
    `;
  }
}
