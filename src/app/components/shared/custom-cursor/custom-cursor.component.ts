import { Component, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'custom-cursor',
  imports: [],
  templateUrl: './custom-cursor.component.html',
  styleUrl: './custom-cursor.component.scss'
})
export class CustomCursorComponent {

  private readonly elRef = inject(ElementRef)

ngAfterViewInit(): void {
  const cursor = this.elRef.nativeElement.querySelector('.custom-cursor') as HTMLElement;
  const dot = this.elRef.nativeElement.querySelector('.cursor-dot') as HTMLElement;

  let mouseX = 0, mouseY = 0;
  let circleX = 0, circleY = 0;
  let dotX = 0, dotY = 0;

  const circleDelay = 0.1;
  const dotDelay = circleDelay * 1.5;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animate = () => {
    // Círculo con poco delay
    circleX += (mouseX - circleX) * circleDelay;
    circleY += (mouseY - circleY) * circleDelay;
    cursor.style.left = `${circleX}px`;
    cursor.style.top = `${circleY}px`;

    // Punto con más delay
    dotX += (mouseX - dotX) * dotDelay;
    dotY += (mouseY - dotY) * dotDelay;
    dot.style.left = `${dotX - circleX + 20}px`;
    dot.style.top = `${dotY - circleY + 20}px`;

    requestAnimationFrame(animate);
  };

  animate();
}

}
