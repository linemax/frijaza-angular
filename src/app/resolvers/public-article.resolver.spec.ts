import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { publicArticleResolver } from './public-article.resolver';

describe('publicArticleResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => publicArticleResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
