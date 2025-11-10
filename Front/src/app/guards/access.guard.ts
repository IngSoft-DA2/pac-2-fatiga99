import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CounterService } from '../services/counter.service';

export const accessGuard: CanActivateFn = (route, state) => {
  const counterService = inject(CounterService);
  const router = inject(Router);

  counterService.increment();

  if (counterService.getCount() > 20) {
    alert('Has alcanzado el límite de accesos (20). No puedes acceder más a esta página.');
    router.navigate(['/']);
    return false;
  }

  return true;
};

