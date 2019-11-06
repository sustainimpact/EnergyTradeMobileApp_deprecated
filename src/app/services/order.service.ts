import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { IonDatetime } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { INGRESS_URL, CONFIG_URL, TRADE_URL, ORDER_URL } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  createSellOrderUrl = TRADE_URL + '/createSellOrder';
  searchBuyLeadsUrl = TRADE_URL + '/searchBuyLeads';
  createContractUrl = TRADE_URL + '/createContract';
  getAllOrdersAndContractsUrl = TRADE_URL + '/getAllOrdersAndContracts';

  orderList: any;
  sellerList: any;
  nonTradeHoursList: any;


  sellOrderList: Order[] = [{orderId: 1,
    userDeviceId: 1,
    deviceTypeId: 1,
    orderType: "SELL",
    deviceName: "SOLAR",
    powerToSell: 200,
    transferStartTs: "2019-01-01T11:00",
    transferEndTs: "2019-01-01T11:00",
    duration: 1,
    ratePerUnit: 10,
    totalAmount: 2000,
    budgerRange: 0,
    softdeleteflag: false}
  
    ,

  {orderId: 2,
    userDeviceId: 1,
    deviceTypeId: 1,
    orderType: "SELL",
    deviceName: "EV",
    powerToSell: 100,
    transferStartTs: "2019-01-07T10:00",
    transferEndTs: "2019-01-07T11:00",
    duration: 1,
    ratePerUnit: 7,
    totalAmount: 700,
    budgerRange: -1,
    softdeleteflag: false}];

  
  buyOrderList: Order[] = [{orderId: 3,
    userDeviceId: 1,
    deviceTypeId: 1,
    orderType: "BUY",
    deviceName: "SOLAR",
    powerToSell: 200,
    transferStartTs: "2019-01-01T10:00",
    transferEndTs: "2019-01-01T11:00",
    duration: 1,
    ratePerUnit: -1,
    totalAmount: -1,
    budgerRange: 2000,
    softdeleteflag: false}
  
    ,

  {orderId: 4,
    userDeviceId: 1,
    deviceTypeId: 1,
    orderType: "BUY",
    deviceName: "EV",
    powerToSell: 100,
    transferStartTs: "2019-01-07T10:00",
    transferEndTs: "2019-01-07T11:00",
    duration: 1,
    ratePerUnit: -1,
    totalAmount: -1,
    budgerRange: 700,
    softdeleteflag: false}];

  constructor(private httpClient: HttpClient) { 
  }

  createSellOrder(orderDetails) {
    console.log("Sell Order : ", orderDetails);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.createSellOrderUrl
      , orderDetails
      , options
    );
  }

  searchBuyLeads(buyOrderPayload) {
    console.log("Buy Order : ", buyOrderPayload);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.searchBuyLeadsUrl
      , buyOrderPayload
      , options
    );
  }

  createContract(createContractPayload) {
    console.log("Create Contract : ", createContractPayload);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.createContractUrl
      , createContractPayload
      , options
    );
  }

  printSellOrderList() {
    console.log('Sell Order List : ' , this.sellOrderList);
  }

  getAllOrdersAndContracts(userId: any) {
    console.log('getAllOrdersAndContracts user id : ' , userId);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.getAllOrdersAndContractsUrl
      , {"userId": userId}
      , options
    );
  }
}
