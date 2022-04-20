import { Injectable, OnDestroy } from "@angular/core";
import { forEach } from 'lodash';
import { Subscription } from "rxjs";

@Injectable()
export abstract class abstractSubscribeHandler implements OnDestroy {
  public subscriptions: Subscription[] = [];

  public set registerSubscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  public ngOnDestroy(): void {
    forEach(this.subscriptions, (subscription: Subscription): void => {
      subscription.unsubscribe();
    });
  }
}
