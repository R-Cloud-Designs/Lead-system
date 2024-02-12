import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadsPageComponent } from './pages/leads-page/leads-page.component';
import { RootLayoutComponent } from './components/root-layout/root-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: RootLayoutComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: LeadsPageComponent },
      // Future routes?
      // { path: 'leads', component: LeadsPageComponent },
      // { path: 'leads/:id', component: LeadsPageComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
