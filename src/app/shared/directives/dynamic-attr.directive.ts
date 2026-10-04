import { Directive, effect, ElementRef, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[dynamicAttr]',
})
export class DynamicAttrDirective {
  // Condição que aciona a mudança (true/false ou qualquer truthy/falsy)
  public dynamicAttr = input<any>(false);

  // Atributo a ser alterado (opcional, padrão é 'value')
  public dynamicAttrProp = input<string>('value');

  // O valor que será aplicado caso a condição seja verdadeira
  public dynamicAttrValue = input<any>('');

  private originalValue: any = '';
  private isInitialized = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    effect(() => {
      const condition = this.dynamicAttr();
      // Se não informar o atributo, usa 'value' por padrão
      const attr = this.dynamicAttrProp() || 'value';
      const targetValue = this.dynamicAttrValue();
      const element = this.el.nativeElement;

      if (!this.isInitialized) {
        // Tenta pegar o valor atual do atributo ou da propriedade DOM (ex: input.value)
        if (attr in element) {
          this.originalValue = element[attr];
        } else {
          this.originalValue = element.getAttribute(attr) || '';
        }
        this.isInitialized = true;
      }

      if (condition) {
        // Aplica o valor dinâmico (suporta string, boolean, number, etc.)
        if (attr in element && typeof element[attr] !== 'string') {
          element[attr] = targetValue; // Para propriedades nativas (ex: checked, disabled)
        } else {
          this.renderer.setAttribute(element, attr, String(targetValue));
        }
      } else {
        // Restaura o valor original
        if (attr in element && typeof element[attr] !== 'string') {
          element[attr] = this.originalValue;
        } else {
          this.renderer.setAttribute(element, attr, String(this.originalValue));
        }
      }
    });
  }
}
