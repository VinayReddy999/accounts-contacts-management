import { LightningElement } from 'lwc';

export default class AccountParent extends LightningElement {
    searchWordParent;
    handleEvent(event)
    {
        this.searchWordParent = event.detail;
    }
}