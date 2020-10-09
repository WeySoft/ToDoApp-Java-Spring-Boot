import { TestBed } from '@angular/core/testing';

import { TodoItemsServiceService } from './todo-items-service.service';

describe('TodoItemsServiceService', () => {
  let service: TodoItemsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoItemsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
