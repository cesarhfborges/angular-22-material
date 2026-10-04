import { Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[dynamicAttr]',
})
export class DynamicAttrDirective {
  public dynamicAttr = input<boolean>(false);
  public dynamicAttrProp = input<string>('value');
  public dynamicAttrValue = input<string>('');

  private originalValue: string = '';
  private isInitialized = false;

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  constructor() {
    effect(() => {
      const condition = this.dynamicAttr();
      const attr = this.dynamicAttrProp() || 'value';
      const targetValue = this.dynamicAttrValue();
      const element = this.el.nativeElement;

      if (!this.isInitialized) {
        if (attr in element) {
          this.originalValue = element[attr];
        } else {
          this.originalValue = element.getAttribute(attr) || '';
        }
        this.isInitialized = true;
      }

      if (condition) {
        if (attr in element && typeof element[attr] !== 'string') {
          element[attr] = targetValue;
        } else {
          this.renderer.setAttribute(element, attr, String(targetValue));
        }
      } else {
        if (attr in element && typeof element[attr] !== 'string') {
          element[attr] = this.originalValue;
        } else {
          this.renderer.setAttribute(element, attr, String(this.originalValue));
        }
      }
    });
  }
}
