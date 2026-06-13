import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { CustomNavData, navItems } from './_nav';
import { AuthService } from '../../../auth/service/auth.service';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ContainerComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    IconDirective,
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ShadowOnScrollDirective
  ]
})
export class DefaultLayoutComponent {
  public navItems: CustomNavData[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.authService.setUserPermissions(user.permissions);
      this.navItems = this.filterNavItems(navItems);
    });
  }

  private filterNavItems(items: CustomNavData[]): CustomNavData[] {
    return items
      .filter(item => !item.permission || this.authService.hasPermission(item.permission))
      .map(item => ({
        ...item,
        children: item.children ? this.filterNavItems(item.children) : undefined
      }));
  }
}
