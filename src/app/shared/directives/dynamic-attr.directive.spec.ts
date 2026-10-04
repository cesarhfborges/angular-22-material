import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicAttrDirective } from './dynamic-attr.directive';

// 1. Componente Host para testar a diretiva no ambiente real do Angular
@Component({
  template: `
    <input
      [dynamicAttr]="condition"
      [dynamicAttrProp]="property"
      [dynamicAttrValue]="targetValue"
      placeholder="Teste"
    />
  `,
  standalone: true,
  imports: [DynamicAttrDirective],
})
class TestHostComponent {
  condition = false;
  property = 'placeholder';
  targetValue = 'Novo Valor Dinâmico';
}

describe('DynamicAttrDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, DynamicAttrDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges(); // Dispara o ciclo de vida inicial

    // Mapeia o elemento input do template de teste
    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('should create an instance via TestBed', () => {
    const directive = fixture.debugElement.query(By.directive(DynamicAttrDirective)).injector.get(DynamicAttrDirective);
    expect(directive).toBeTruthy();
  });

  it('should store the original attribute value on initialization', () => {
    // Como o placeholder inicial é "Teste"
    expect(inputElement.placeholder).toBe('Teste');
  });

  it('should change attribute value when condition becomes true', async () => {
    // Altera a condição para true e atualiza a view
    fixture.componentInstance.condition = true;
    fixture.componentInstance.property = 'placeholder';
    fixture.componentInstance.targetValue = 'Valor Alterado!';
    fixture.detectChanges();
    await fixture.whenStable();

    expect(inputElement.placeholder).toBe('Valor Alterado!');
  });

  it('should revert to original value when condition becomes false again', async () => {
    // 1. Ativa a condição
    fixture.componentInstance.condition = true;
    fixture.componentInstance.property = 'placeholder';
    fixture.componentInstance.targetValue = 'Temporário';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(inputElement.placeholder).toBe('Temporário');

    // 2. Desativa a condição
    fixture.componentInstance.condition = false;
    fixture.detectChanges();
    await fixture.whenStable();

    // Deve voltar para o original ("Teste")
    expect(inputElement.placeholder).toBe('Teste');
  });
});
