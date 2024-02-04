import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { AppComponent } from 'src/app/app.component';
import { CallsComponent } from './calls/calls.component';

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients', component: MainContentComponent },
  { path: 'calls', component: CallsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class MainModule {}
