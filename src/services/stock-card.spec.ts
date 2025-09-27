import { TestBed } from '@angular/core/testing';

import { StockCard } from '../app/stock-card';

describe('StockCard', () => {
  let service: StockCard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockCard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
