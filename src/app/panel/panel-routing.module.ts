import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  {
    path: "panel",
    component: MainComponent,
    children:[
      {path: "", component: ListComponent},
      {path: "list", component: ListComponent},
      {path: "edit/:id", component: EditComponent},
      {path: "add", component: AddComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
