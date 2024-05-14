import { LightningElement } from 'lwc';

export default class AccountChild1 extends LightningElement {
    searchWordChild1;
    inputHandler(event)
    {
        this.searchWordChild1 = event.target.value;
    }
    searchHandler()
    {
        const myEvent = new CustomEvent('getsearchword',{detail:this.searchWordChild1})
        this.dispatchEvent(myEvent);
    }
}