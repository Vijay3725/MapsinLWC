import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/MapsControllerLWC.getAccounts';

export default class MapsInLWCDemo extends LightningElement {
    @track result;
    @track error;
    mapMarkers=[];
    markersTitle = 'Accounts Location';
    
    @wire(getAccounts)
    accountHandler({data, error}){
        if(data){
            this.result = data;
            this.error = undefined;
            console.log(data);
            this.formatResponse(data);
        }
        else if(error){
            this.result = undefined;
            this.error = error;
            console.error(error);
        }
    }

    formatResponse(data){
        this.mapMarkers = data.map(item => {
            return {
                location: {
                    Street: item.BillingCity || '',
                    City: item.BillingCity || '',
                    PostalCode: item.BillingPostalCode || '',
                    State: item.BillingState || '',
                    Country: item.BillingCountry || ''
                },
                icon: 'utility: salesforce1',
                title: item.Name,
                value: item.Name,
                description: item.description
            };
        })
        this.selectedMarker = this.mapMarkers.length && this.mapMarkers[0].value;
    }

    callMarkerHandler(event){
        this.selectedMarker = event.detail.selectedMarkerValue;
    }
}