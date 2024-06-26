import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { DbserviceService } from '../service/dbservice.service';

export const pacienteGuard: CanActivateFn = (route, state) => {

  const dbService = inject(DbserviceService);

  return dbService.guardPaciente();
};
