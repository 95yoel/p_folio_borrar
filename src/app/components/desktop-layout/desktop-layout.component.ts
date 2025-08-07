import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';

import gsap from 'gsap'
import { ScrollBtnComponent } from '../shared/scroll-btn/scroll-btn.component';
import { CustomCursorComponent } from '../shared/custom-cursor/custom-cursor.component';
@Component({
  selector: 'villayoel-desktop',
  imports: [ScrollBtnComponent, CustomCursorComponent],
  templateUrl: './desktop-layout.component.html',
  styleUrl: './desktop-layout.component.scss'
})
export class DesktopLayoutComponent {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  @ViewChildren('panel') panels!: QueryList<ElementRef>

  private isScrolling = false;

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();

    if (this.isScrolling) return; 

    const container = this.scrollContainer.nativeElement;
    const panelWidth = window.innerWidth;
    const direction = Math.sign(event.deltaY);

    const targetScrollLeft = container.scrollLeft + direction * panelWidth;

    this.isScrolling = true;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });

    // Esperamos ~600ms para liberar el bloqueo (ajustable)
    setTimeout(() => {
      this.isScrolling = false;
    }, 250);
  }


  ngAfterViewInit(): void {

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {

          const section = entry.target as HTMLElement
          const sectionName = section.dataset['section'] || ''

          if (entry.isIntersecting) {
            this.handleSectionChange(sectionName, section)
          } else {
            this.handleSectionLeave(sectionName, section)
          }

        })
      },
      {
        root: null, // usa el viewport
        threshold: 0.5, // al menos 50% visible
      }
    );

    this.panels.forEach((panel) => {
      observer.observe(panel.nativeElement);
    });
  }


  private handleSectionChange(sectionName: string, element: HTMLElement) {

    const navItem = document.querySelector(`nav li[data-nav="${sectionName}"]`);
    if (navItem) {
      navItem.classList.add('active');
    }

    switch (sectionName) {
      case 'home':
        console.log('🟢 HOME section active');
        element.classList.add('home-section');//home
        this.animateTitle(element)
        break;
      case 'about':
        console.log('🟡 ABOUT section active');
        element.classList.add('about-section');//about
        break;
      case 'portfolio':
        console.log('🔵 PORTFOLIO section active');//portfolio
        element.classList.add('portfolio-section');
        break;
      case 'contact':
        console.log('🟣 CONTACT section active');//contact
        element.classList.add('contact-section');
        break;
    }
  }

  private handleSectionLeave(sectionName: string, element: HTMLElement) {

    const navItem = document.querySelector(`nav li[data-nav="${sectionName}"]`);
    if (navItem) {
      navItem.classList.remove('active');
    }

    switch (sectionName) {
      case 'home':
        this.unanimateTitle(element)
        break
    }
  }

  private animateTitle(element: HTMLElement) {
    const title = element.querySelector('.title')
    const subtitle = element.querySelector('.subtitle')

    if (!title || !subtitle) return

    gsap.set(title, {
      opacity: 0,
      y: -500
    })

    gsap.set(subtitle, {
      opacity: 0,
      y: 500
    })

    gsap.to(title, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out'
    })

    gsap.to(subtitle, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: 0.2,
      ease: 'power2.out',
    })
  }


  private unanimateTitle(element: HTMLElement) {
    const title = element.querySelector('.title')
    const subtitle = element.querySelector('.subtitle')
    if (title) {
      gsap.to(title, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      });
    }

    if (subtitle) {
      gsap.to(subtitle, {
        opacity: 0,
        y: 60,
        duration: 0.5,
        ease: 'power2.inOut'
      });
    }
  }


  scrollToSection(sectionName: string) {
    const targetSection = this.panels.find(ref =>
      ref.nativeElement.dataset.section === sectionName
    )

    if (targetSection) {
      targetSection.nativeElement.scrollIntoView({ behavior: 'smooth', inline: 'start' })
    }
  }


  scrollToNext() {
  const panelsArray = this.panels.toArray();
  const container = this.scrollContainer.nativeElement;

  const currentScroll = container.scrollLeft;
  const screenWidth = window.innerWidth;

  const currentIndex = Math.round(currentScroll / screenWidth);
  const nextPanel = panelsArray[currentIndex + 1];

  if (nextPanel) {
    const offsetLeft = nextPanel.nativeElement.offsetLeft;

    container.scrollTo({
      left: offsetLeft,
      behavior: 'smooth'
    });
  }
}





}
