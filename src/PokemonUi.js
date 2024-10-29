import { LitElement, html, } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './PokemonUi-styles.js';
import '@bbva-web-components/bbva-button-default/bbva-button-default';
import '@bbva-experience-components/bbva-type-text/bbva-type-text.js';
import '@bbva-experience-components/bbva-expandable-accordion/bbva-expandable-accordion';
import '@bbva-web-components/bbva-foundations-spinner/bbva-foundations-spinner.js';
import '@mereki/pokemon-dm/pokemon-dm.js'

export class PokemonUi extends LitElement {
  static get is() {
    return 'pokemon-ui';
  }

  // Declare properties
  static get properties() {
    return {
      pokemons: { type: Array, },
      pokemonsEvolutions: { type: Array, },
      Contador: { type: Number, },
      comprobador: { type: Boolean, },
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.pokemons = [];
    this.Contador = -1;
    this.comprobador = false;
  }

  async firstUpdated(){
    const pokemonDm = this.shadowRoot.querySelector('pokemon-Dm');
    this.pokemons = await pokemonDm.evolutionPokemon();
    this.comprobador = true;
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('pokemon-ui-shared-styles')
    ];
  }
  // mostrar las evoluciones
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
//mostrar el pokemon base
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
      <pokemon-Dm></pokemon-Dm>
      </div> 
    `;
  }
}
