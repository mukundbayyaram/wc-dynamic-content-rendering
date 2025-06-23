import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { RepeatedContentComponent } from './repeated-content/repeated-content.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, RepeatedContentComponent, DropdownMenuComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(private injector: Injector) {
    try {
      console.log('🔄 Angular: Starting web component registration...');
      console.log('🔄 Angular: Creating custom element...');
      
      const el = createCustomElement(RepeatedContentComponent, { injector });
      console.log('✅ Angular: Custom element created successfully');
      
      console.log('🔄 Angular: Registering web component...');
      customElements.define('repeated-content-element', el);
      // customElements.define(
      //   'repeated-content-element',
      // );
      console.log('✅ Angular: Web component "repeated-content-element" registered successfully');
      
      // Verify registration
      const registered = customElements.get('repeated-content-element');
      console.log('🔍 Angular: Verification - registered component:', registered);
    } catch (error) {
      console.error('❌ Angular: Error registering web component:', error);
    }
  }
}
