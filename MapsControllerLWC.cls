public with sharing class MapsControllerLWC {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [select Id, Name, description, BillingStreet, BillingCountry, BillingCity, BillingState, BillingPostalCode FROM Account ORDER BY Name LIMIT 10];

    }
}