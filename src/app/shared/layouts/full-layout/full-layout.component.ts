import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Menu } from '../misc/menu.model';
import { HeaderComponent } from '../components/header/header.component';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { MenuItemComponent } from '../components/menu-item/menu-item.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-full-layout',
  imports: [
    HeaderComponent,
    RouterOutlet,
    MenuItemComponent,
    FooterComponent,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
  ],
  templateUrl: './full-layout.component.html',
  styleUrl: './full-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullLayoutComponent {
  opened = true;
  menu: Menu = [
    {
      title: 'Home',
      icon: 'home',
      link: '/home',
      color: '#ff7f0e',
    },
    {
      title: 'Teste1',
      icon: 'home',
      link: '/test1',
      color: '#ff7f0e',
    },
    {
      title: 'Teste2',
      icon: 'home',
      link: '/test2',
      color: '#ff7f0e',
    },
    {
      title: 'Statistics',
      icon: 'bar_chart',
      color: '#ff7f0e',
      subMenu: [
        {
          title: 'Sales',
          icon: 'money',
          link: '/sales',
          color: '#ff7f0e',
        },
        {
          title: 'Customers',
          icon: 'people',
          color: '#ff7f0e',
          link: '/customers',
        },
      ],
    },
  ];

  toggle(): void {
    this.opened = !this.opened;
  }
}
