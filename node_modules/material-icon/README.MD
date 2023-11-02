# material-icon



## Pre requisite

Need material design icons to install to make this package working

```bash
$ npm install material-design-icons --save
```

Add css file in to **.angular-cli.json** 

```json
"../node_modules/material-design-icons/iconfont/material-icons.css"
```





## Installation

To install this library, run:

```bash
$ npm install material-icon --save
```





## Consuming

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { MaterialDesignIconModule } from 'material-icon';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    MaterialDesignIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<mdi [icon]="'copyright'" [size]="30"></mdi>
```





## License

MIT © [Chirag Patel](mailto:kanchi7880@gmail.com)
