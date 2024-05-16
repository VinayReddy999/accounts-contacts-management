public with sharing class accountData {
    @AuraEnabled(cacheable = true)
    public static list<Account> getAcc(String selectedWord) {
        try
        {
            if(String.isEmpty(selectedWord))
        {
            return [select Id, Name, Phone from Account];
        }
        else {
            selectedWord='%'+selectedWord+'%';
            return [select Id, Name, Phone from Account where Name like :selectedWord];
        }
        } catch(Exception e)
        {
            throw new AuraHandledException(e.getMessage());
        }   
    }

    @AuraEnabled(cacheable = true)
    public static list<Contact> getAccountContacts(String accId){
        try {
            return [select Id, Name from Contact where accountId = :accId];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Account> getAccounts(String searchTextClass){
        try {
            if(String.isEmpty(searchTextClass))
            {
                return [SELECT Id, Name, Phone from Account];
            }
            else 
            {
                searchTextClass = '%'+searchTextClass+'%';
                return [SELECT Id, Name, Phone from Account WHERE Name Like :searchTextClass];
            }
            
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}