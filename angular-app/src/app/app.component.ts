import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { RepeatedContentComponent } from './repeated-content/repeated-content.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'angular-app';

  @ViewChild('repeatedContent') repeatedContent!: RepeatedContentComponent;
  @ViewChild('testWebComponent', { static: true }) testWebComponent!: ElementRef;

  rendererFunction = (container: HTMLElement) => {
    console.log('🎯 Angular renderer function called with container:', container);
    container.innerHTML = `
      <div style="padding: 15px; margin: 10px; background-color: #e3f2fd; border: 2px solid #2196f3; border-radius: 8px;">
        <h4 style="color: #1976d2; margin: 0 0 10px 0;">Dynamic Content from Angular</h4>
        <p style="margin: 0; color: #333;">This content was rendered by the Angular renderer function!</p>
        <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">Container: ${container.tagName}</p>
      </div>
    `;
    console.log('✅ Content rendered successfully');
  };

  ngOnInit() {
    console.log('AppComponent initialized');
    console.log('Renderer function exists:', typeof this.rendererFunction === 'function');
  }

  ngAfterViewInit() {
    console.log('🔄 AppComponent after view init');
  }

  manualTrigger() {
    console.log('🔄 Manual trigger clicked');
    if (this.repeatedContent) {
      console.log('📋 RepeatedContent component found, triggering render');
      this.repeatedContent.triggerRender();
    } else {
      console.log('❌ RepeatedContent component not found');
    }
    
    // Also trigger the web component
    const webComponent = this.testWebComponent?.nativeElement;
    if (webComponent && webComponent.triggerRender) {
      console.log('🔄 Triggering web component render');
      webComponent.triggerRender();
    }
  }
}
