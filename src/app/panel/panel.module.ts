import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { PanelRoutingModule } from './panel-routing.module';

import { MainComponent } from './components/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';

import localPy from "@angular/common/locales/es-PY"
registerLocaleData(localPy, "es")

@NgModule({
  declarations: [
    MainComponent,
    AddComponent,
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{provide: LOCALE_ID, useValue: "es"}]
})
export class PanelModule { }
