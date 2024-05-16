import { APPLICATION_SCOPE, MessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import { LightningElement, api, wire } from 'lwc';
import Comrevo from '@salesforce/messageChannel/Comrevo__c'
import getAccountContacts from '@salesforce/apex/accountData.getAccountContacts';
import LightningConfirm from 'lightning/confirm';
import { deleteRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class ShowAccountsContact extends LightningElement {
    subscription = null
    title='Contacts'
    isAccountSelected = false
    isAddContactSelected = false
    isEditContactSelected = false
    editableContactId
    addFirstCon
    disableAddContact
    @api recordId

    contacts
    hasContacts 

    @wire(MessageContext) 
    messageContext;

    accountId;
    accountName;
    connectedCallback()
    {
        this.handleSubscribe();
    }
    
    handleSubscribe()
    {
        if(!this.subscription)
        {
           this.subscription = subscribe(this.messageContext, Comrevo,
                (parameter)=>{
                    this.accountId = parameter.accountId;
                    this.accountName = parameter.accountName;
                    this.accountPhone = parameter.accountPhone
                    this.title=this.accountName+"'s Contacts"
                    this.getContacts();
                });         
        }
    }

    async getContacts()
    {
        this.contacts = await getAccountContacts({accId : this.accountId})
        this.hasContacts = this.contacts.length > 0 ? true : false 
        this.isAccountSelected = true
    }

    addContactHamdler(event)
    {
        this.isAddContactSelected = true
    }
    addContactCancel(event)
    {
        this.isAddContactSelected = false
    }

    editContactHandler(event)
    {
        this.isEditContactSelected = true
        this.editableContactId = event.target.dataset.contactId
    }
    editContactCancel(event)
    {
        this.isEditContactSelected = false
    }

    successHandler(event)
    {
        this.isAddContactSelected = false;
        this.isEditContactSelected = false; 
        this.getContacts();
    }

    async deleteHandler(event) {
        this.editableContactId = event.target.dataset.contactId;
        const result = await LightningConfirm.open({
            message: 'Are you sure want to delete the contact',
            variant: 'headerless',
            label: 'this is the aria-label value',
            // setting theme would have no effect
        });

        if (result) {
            let deleteRec = await deleteRecord(this.editableContactId);
            this.getContacts();
            this.ShowToast();

        }
    }

    ShowToast()
    {
        const toastEvent = new ShowToastEvent({
            title : 'Delete Contact',
            message : 'Contact is Deleted successfully'

        });
        this.dispatchEvent(toastEvent)
    }

    addFirstContact()
    {
        this.addFirstCon = true
        this.disableAddContact = true
    }


}