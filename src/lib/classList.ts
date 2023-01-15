/**
 * Build a set of CSS classes and assign it to element's className.
 */
export class ClassList extends Set<string> {
  constructor(...classes: string[]) {
    super(classes);
  }

  toString() {
    return Array.from(this).filter(Boolean).join(" ");
  }
}
