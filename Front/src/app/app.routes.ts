import { Routes } from '@angular/router';
import { ConsignaComponent } from './shared/components/consigna/consigna.component';
import { ReflectionComponent } from './components/reflection/reflection.component';
import { accessGuard } from './guards/access.guard';

export const routes: Routes = [
  { path: '', component: ConsignaComponent },
  { path: 'reflection', component: ReflectionComponent, canActivate: [accessGuard] }
];
