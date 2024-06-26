import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { DbserviceService } from '../service/dbservice.service';

export const nutricionistaGuard: CanActivateFn = (route, state) => {

  const dbService = inject(DbserviceService);

  return dbService.guardNutricionista();
};