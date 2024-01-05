import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsViewComponent } from './components/lists-view/lists-view.component';
import { HomeComponentComponent } from './components/home-component/home-component/home-component.component';

const routes: Routes = [
  { path: 'my-lists', component: ListsViewComponent },
  { path: 'home', component: HomeComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
