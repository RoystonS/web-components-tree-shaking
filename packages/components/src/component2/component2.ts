import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class ComponentTwo extends LitElement {
  constructor() {
    super();

    this.name = "Name";
  }

  @property()
  declare name: string;

  render() {
    return html` <p>Component two. Hello ${this.name}.</p> `;
  }
}

customElements.define("component-two", ComponentTwo);
