import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class ComponentTwo extends LitElement {
  constructor() {
    super();

    this.greetName = "Name";
  }

  @property()
  declare greetName: string;

  render() {
    return html` <p>Component two. Hello ${this.greetName}.</p> `;
  }
}

customElements.define("component-two", ComponentTwo);

declare global {
  interface HTMLElementTagNameMap {
    "component-two": ComponentTwo;
  }
}
