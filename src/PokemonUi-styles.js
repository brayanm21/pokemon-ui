/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`bbva-foundations-spinner {
  position: relative;
  top: 200px;
}

bbva-type-text {
  border-radius: 100vmax;
  text-transform: uppercase;
  font-weight: 600;
}

.contenedor {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
}

.tarjeta {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: auto;
  border: 1px solid lightgray;
  box-shadow: 2px 2px 8px 4px #d3d3d3d1;
  border-radius: 25px;
}

.cuerpo {
  padding: 10px;
  flex: 1 1 100%;
  text-align: center;
}

.badge {
  padding: 0.5rem;
  border-radius: 100vmax;
  text-transform: uppercase;
  font-weight: 600;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
  transition: 0.2s;
}

.pie {
  padding: 12px;
  text-align: center;
}

.normal {
  background-color: #eadaa2;
  color: #1c1c1c;
}

.fire {
  background-color: #f08030;
  color: #1c1c1c;
}

.water {
  background-color: #568ea3;
  color: #f7f7f7;
}

.grass {
  background-color: #78c850;
  color: #1c1c1c;
}

.electric {
  background-color: #f8d030;
  color: #1c1c1c;
}

.ice {
  background-color: #98d8d8;
  color: #1c1c1c;
}

.fighting {
  background-color: #c03028;
  color: #f7f7f7;
}

.poison {
  background-color: #a040a0;
  color: #f7f7f7;
}

.ground {
  background-color: #e0c068;
  color: #1c1c1c;
}

.flying {
  background-color: #a890f0;
  color: #1c1c1c;
}

.psychic {
  background-color: #f85888;
  color: #1c1c1c;
}

.bug {
  background-color: #a8b820;
  color: #1c1c1c;
}

.rock {
  background-color: #b8a038;
  color: #1c1c1c;
}

.ghost {
  background-color: #705898;
  color: #f7f7f7;
}

.dark {
  background-color: #705848;
  color: #f7f7f7;
}

.dragon {
  background-color: #7038f8;
  color: #f7f7f7;
}

.steel {
  background-color: #b8b8d0;
  color: #1c1c1c;
}

.fairy {
  background-color: #f0b6bc;
  color: #1c1c1c;
}
`;