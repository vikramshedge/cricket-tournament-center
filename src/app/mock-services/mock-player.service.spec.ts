import { TestBed, inject } from '@angular/core/testing';

import { MockPlayerService } from './mock-player.service';

describe('MockPlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockPlayerService]
    });
  });

  it('should be created', inject([MockPlayerService], (service: MockPlayerService) => {
    expect(service).toBeTruthy();
  }));
});
