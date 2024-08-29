import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ParentChildService {

    private showAddDocPropertySource = new BehaviorSubject<boolean>(false);
    showAddDocProperty = this.showAddDocPropertySource.asObservable();

    private showAddCommentPropertySource = new BehaviorSubject<boolean>(false);
    showAddCommentProperty = this.showAddCommentPropertySource.asObservable();

    private offerIdSource = new BehaviorSubject<string>('');
    offerIdProperty = this.offerIdSource.asObservable();

    changeShowAddDocProperty(property: boolean) {
        this.showAddDocPropertySource.next(property);
    }

    changeShowAddCommentProperty(property: boolean) {
        this.showAddCommentPropertySource.next(property);
    }

    changeOfferId(property: string) {
        this.offerIdSource.next(property);
    }
}