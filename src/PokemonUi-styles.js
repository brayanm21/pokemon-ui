/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`:host {
  display: block;
  box-sizing: border-box;
}

:host([hidden]), [hidden] {
  display: none !important;
}

*, *:before, *:after {
  box-sizing: inherit;
}

bbva-foundations-spinner {
  position: relative;
  top: 200px;
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
  border-radius: 15px;
  font-family: sans-serif;
}

.cuerpo {
  padding: 10px;
  flex: 1 1 100%;
  text-align: center;
}

.pie {
  background: #6699ff;
  border-radius: 0 0 15px 15px;
  padding: 10px;
  text-align: center;
}

.pie a {
  text-decoration: none;
  color: white;
}

.pie a:after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  content: "";
}
`;