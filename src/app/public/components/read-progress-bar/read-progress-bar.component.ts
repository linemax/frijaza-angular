import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-read-progress-bar',
  templateUrl: './read-progress-bar.component.html',
  styleUrls: ['./read-progress-bar.component.scss']
})
export class ReadProgressBarComponent {

  scrollPercentage: number = 0;
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollOffset = window.pageYOffset;
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    this.scrollPercentage = Math.min(100, Math.max(0, (scrollOffset / totalHeight) * 100));
  }

  constructor() { }

}
