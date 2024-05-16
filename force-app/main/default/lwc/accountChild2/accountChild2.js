import { LightningElement,api, wire } from 'lwc';
import getAcc from '@salesforce/apex/accountData.getAcc';
import getAccounts from '@salesforce/apex/accountData.getAccounts';
import { MessageContext, publish } from 'lightning/messageService';
import Comrevo from '@salesforce/messageChannel/Comrevo__c'

export default class AccountChild2 extends LightningElement {
    @api searchWordChild2
    @wire(MessageContext) messageContext;

    @wire(getAcc,{selectedWord : '$searchWordChild2'})
    accDetails;

     @wire(getAccounts)
     acccDetails;

    currentId
    currentName
    currentPhone
    columns = [
        {label:'Id', fieldName :'Id'},
        {label:'Name', fieldName:'Name'},
        {label:'Phone', fieldName:'Phone'},
        {label:'Actions',fieldName:'Actions', type:'button', typeAttributes: 
        {
            label : 'Get Contacts', value:'Get_Contacts'
        }}
    ]

    rowHandler(event)
    {
        if(event.detail.action.value == 'Get_Contacts')
        {
            this.currentId = event.detail.row.Id
            this.currentName = event.detail.row.Name
            this.currentPhone = event.detail.row.Phone

            const payload = 
            {
                accountId : event.detail.row.Id,
                accountPhone : event.detail.row.Phone,
                accountName : event.detail.row.Name
            };

        publish(this.messageContext, Comrevo, payload);    
        }   
    }  
}