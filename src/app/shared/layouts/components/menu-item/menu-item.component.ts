import { Component, Input } from '@angular/core';
import { MatList, MatListItem, MatListItemIcon } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatLine } from '@angular/material/core';
import { Menu } from '../../misc/menu.model';

@Component({
  selector: 'app-menu-item',
  imports: [
    MatList,
    MatListItem,
    RouterLink,
    RouterLinkActive,
    MatIcon,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatLine,
    MatListItemIcon,
  ],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
})
export class MenuItemComponent {
  @Input() menu: Menu = [];
}
