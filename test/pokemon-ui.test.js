import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing';
import '../pokemon-ui.js';

suite('PokemonUi', () => {
  let el;

  teardown(() => fixtureCleanup());

  setup(async () => {
    el = await fixture(html`<pokemon-ui></pokemon-ui>`);
    await el.updateComplete;
  });

  test('instantiating the element with default properties works', () => {
    const element = el.shadowRoot.querySelector('p');
    assert.equal(element.innerText, 'Welcome to Cells');
  });

});
