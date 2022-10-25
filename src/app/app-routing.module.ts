import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaveUsersComponent } from './save-users/save-users.component';

const routes: Routes = [
  {
    path:"",
    component:SaveUsersComponent,
  },
  {
    path:"saveUsers",
    component:SaveUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
