import { css, html, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

import styles from "./component1.scss";

type ToDoItem = {
  text: string;
  completed: boolean;
};

@customElement("component-one")
export class ComponentOne extends LitElement {
  static styles = [
    styles,
    css`
      .foo {
        color: blue;
      }
    `,
  ];

  constructor() {
    super();

    this.checked = false;
    this._listItems = [
      { text: "Make to-do list", completed: true },
      { text: "Add some styles", completed: true },
    ];
  }

  @state()
  private declare _listItems: ToDoItem[];

  @property()
  declare checked: boolean;

  @query("#newitem")
  declare input: HTMLInputElement;

  render() {
    return html`
      <ul>
        ${this._listItems.map(
          (item) =>
            html` <li
              class=${classMap({ item: true, completed: item.completed })}
              @click=${() => this.toggleCompleted(item)}
            >
              ${item.text}
            </li>`
        )}
      </ul>
      <input id="newitem" aria-label="New item" />
      <button @click=${this.addToDo}>Add</button>
    `;
  }

  toggleCompleted(item: ToDoItem) {
    item.completed = !item.completed;
    this.requestUpdate();
  }

  addToDo() {
    this._listItems = [...this._listItems, { text: this.input.value, completed: false }];
    this.input.value = "";
  }
}
