import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallsComponent } from 'src/modules/main/calls/calls.component';
import { MainContentComponent } from 'src/modules/main/main-content/main-content.component';

import { MainModule } from 'src/modules/main/main.module';

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients', component: MainContentComponent },
  { path: 'calls', component: CallsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
