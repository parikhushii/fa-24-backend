import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";

export interface Label{
  id: ObjectId;
  name: string;
  disjoint: boolean;
}

export interface Element {
  id: ObjectId;
  name: string;
}

export interface LabelDoc extends BaseDoc {
  label: Label;
  elements: Set<ObjectId>;
}

/**
 * concept: Labeling [Element]
 */
export default class LabelingConcept {
  public readonly labels: Set<Label>;
  public readonly elements: Map<Label, Set<Element>>;

  /**
   * Make an instance of Labeling.
   */
  constructor() {
    this.labels = new Set<Label>();
    this.elements = new Map<Label, Set<Element>>();
  }

  addLabel(l: Label, e: Element) {
    if (!this.labels.has(l)) {
      this.labels.add(l);
      this.elements.set(l, new Set<Element>());
    }

    const existingElements = this.elements.get(l)!;

    if (l.disjoint) {
      existingElements.clear();
      existingElements.add(e);
      for (const label of this.labels) {
        if (label !== l) {
          this.elements.get(label)!.delete(e);
        }
      }
    } else {
      existingElements.add(e);
    }
  }

  removeLabel(l: Label, e: Element) {
    if (this.elements.has(l)) {
      this.elements.get(l)!.delete(e);
    }
  }

  lookup(l: Label): Set<Element> {
    return this.elements.get(l) || new Set<Element>();
  }
}
