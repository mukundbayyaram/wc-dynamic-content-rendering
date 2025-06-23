import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-repeated-content',
  templateUrl: './repeated-content.component.html',
})
export class RepeatedContentComponent implements AfterViewInit, OnChanges {
  @Input() renderer!: (container: HTMLElement) => void;

  @ViewChild('container1', { static: true }) container1!: ElementRef<HTMLElement>;
  @ViewChild('container2', { static: true }) container2!: ElementRef<HTMLElement>;

  private isInitialized = false;

  ngAfterViewInit() {
    this.isInitialized = true;
    
    // Try to render if renderer is already available
    if (this.renderer && typeof this.renderer === 'function') {
      this.renderContent();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['renderer'] && this.isInitialized) {
      this.renderContent();
    }
  }

  private async renderContent() {
    if (this.renderer && this.isInitialized) {
      try {
        this.container1.nativeElement.innerHTML = '';
        this.renderer(this.container1.nativeElement);

        // Sleep for 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.container2.nativeElement.innerHTML = '';
        this.renderer(this.container2.nativeElement);
      } catch (error) {
        console.error('❌ Error during rendering:', error);
      }
    }
  }

  // Public method to manually trigger rendering
  public triggerRender() {
    this.renderContent();
  }
}
