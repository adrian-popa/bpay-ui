import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavComponent } from '@components/sidenav/sidenav.component';
import { NavbarComponent } from '@components/navbar/navbar.component';

@NgModule({
  declarations: [
    SidenavComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidenavComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
