import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// import "../node_modules/placeholder-loading/src/scss/placeholder-loading";


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
