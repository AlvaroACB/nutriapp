import { TestBed } from '@angular/core/testing';
import { DbserviceService } from './dbservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('DbserviceService', () => {
  let service: DbserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite],
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
