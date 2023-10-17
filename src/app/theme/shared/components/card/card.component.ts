import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardTitle: string;
  @Input() cardClass: string;
  @Input() blockClass: string;
  @Input() headerClass: string;
  @Input() options: boolean;
  @Input() hidHeader: boolean;
  @Input() customHeader: boolean;
  @Input() cardCaption: string;
  @Input() captionClass: string;
  @Input() isCardFooter: boolean;
  @Input() footerClass: string;

  public animation: string;
  public fullIcon: string;
  public isAnimating: boolean;
  // public animator: AnimationBuilder;
  // public animators: AnimationBuilder;

  // public collapsedCard: string;
  public collapsedIcon: string;

  public loadCard: boolean;

  public cardRemove: string;
  
  constructor() {
    // config.placement = 'bottom-right';
    this.customHeader = false;
    this.options = true;
    this.hidHeader = false;
    this.isCardFooter = false;
    this.cardTitle = '';

    // this.animator = animationService.builder();
    // this.animators = animationService.builder();
    // this.animator.useVisibility = true;
    this.fullIcon = 'icon-maximize';
    this.isAnimating = false;

    // this.collapsedCard = 'expanded';
    this.collapsedIcon = 'icon-minus';

    this.loadCard = false;

    this.cardRemove = 'open';
  }

  ngOnInit(): void {
    if (this.hidHeader) {
      this.options = false;
    }

    if (!this.options || this.hidHeader || this.customHeader) {
      // this.collapsedCard = 'false';
    }
  }

  public fullCardToggle(element: HTMLElement, animation: string, status: boolean) {
    animation = this.cardClass === 'full-card' ? 'zoomOut' : 'zoomIn';
    this.fullIcon = this.cardClass === 'full-card' ? 'icon-maximize' : 'icon-minimize';
    // const duration = this.cardClass === 'full-card' ? 300 : 600;
    this.cardClass = this.cardClass === 'full-card' ? this.cardClass : 'full-card';
    if (status) {
      this.animation = animation;
    }
    this.isAnimating = true;

    // this.animators
    //   .setType(this.animation)
    //   .setDuration(500)
    //   .setDirection('alternate')
    //   .setTimingFunction('cubic-bezier(0.1, -0.6, 0.2, 0)')
    //   .animate(element)
    //   .then(() => {
    //     this.isAnimating = false;
    //   })
    //   .catch(() => {
    //     this.isAnimating = false;
    //   });
    setTimeout(() => {
      this.cardClass = animation === 'zoomOut' ? '' : this.cardClass;
      if (this.cardClass === 'full-card') {
        document.querySelector('body').style.overflow = 'hidden';
      } else {
        document.querySelector('body').removeAttribute('style');
      }
    }, 500);
  }

  // collapsedCardToggle() {
  //   this.collapsedCard = this.collapsedCard === 'collapsed' ? 'expanded' : 'collapsed';
  //   this.collapsedIcon = this.collapsedCard === 'collapsed' ? 'icon-plus' : 'icon-minus';
  // }

  cardRefresh() {
    this.loadCard = true;
    this.cardClass = 'card-load';
    setTimeout( () => {
      this.loadCard = false;
      this.cardClass = 'expanded';
    }, 3000);
  }

  cardRemoveAction() {
    this.cardRemove = this.cardRemove === 'closed' ? 'open' : 'closed';
  }

}
