import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { TopicListComponent } from './components/topic-list/topic-list.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "ajustes", component: AjustesComponent},
  {path: "register", component: RegisterComponent},
  {path: "temas", component: TopicListComponent},
  {path: "temas/:id", component: TopicListComponent},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
