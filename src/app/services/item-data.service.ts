import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemDataService {

  private messageSourceForParent = new BehaviorSubject('Default parent message');
  currentMessageForParent = this.messageSourceForParent.asObservable();

  private messageSourceForTopParent = new BehaviorSubject('Default topparent message');
  currentMessageForTopParent = this.messageSourceForTopParent.asObservable();

  private messageSourceForDepth = new BehaviorSubject('Default depth message');
  currentMessageForDepth = this.messageSourceForDepth.asObservable();

  private messageSourceForSubhead = new BehaviorSubject('false');
  currentMessageForSubhead = this.messageSourceForSubhead.asObservable();

  private messageSourceForItemIdForLeafToRoot = new BehaviorSubject('Default lead to root message');
  currentMessageForItemIdForLeafToRoot = this.messageSourceForItemIdForLeafToRoot.asObservable();

  constructor() { }

  changeMessageForParent(message: string) {
    this.messageSourceForParent.next(message)
  }

  changeMessageForTopParent(message: string) {
    this.messageSourceForTopParent.next(message)
  }

  changeMessageForDepth(message: string) {
    this.messageSourceForDepth.next(message)
  }

  changeMessageForSubhead(message: string) {
    this.messageSourceForSubhead.next(message)
  }

  changeMessageForItemIdForLeafToRoot(message: string) {
    this.messageSourceForItemIdForLeafToRoot.next(message)
  }
}
