import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Select } from '@ngxs/store';
import { UserDataState } from '../state/user.state';
import { Observable } from 'rxjs';
import { UserData } from '../Models/userData';
import { Router } from '@angular/router';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  BASE_URL = environment.BASE_URL;
  @Select(UserDataState.getUserData) userData$!: Observable<UserData[]>;
  userData: any;

  constructor(private https: HttpClient) {
    this.userData$.subscribe((res: any) => {
      if (res && res.length > 0) {
        this.userData = res[0];
      }
    });
  }
  onCreateUser(req: any) {
    return this.https.post(
      this.BASE_URL + 'createUser?isEmailVerified=true',
      req
    );
  }
  onCreateProfile(req: any) {
    return this.https.post(
      this.BASE_URL + 'createUserProfile' + '?token=' + this.userData.token,
      req
    );
  }
  onSendOTP(req: any) {
    return this.https.post(this.BASE_URL + 'sendOtp', req);
  }
  onVerifyOtp(req: any) {
    return this.https.post(
      this.BASE_URL + 'verifyOtp?isEmailVerified=true',
      req
    );
  }
  onUserLogin(req: any) {
    return this.https.post(this.BASE_URL + 'userLogin', req);
  }
  forgotPasswordUpdate(req: any) {
    return this.https.post(this.BASE_URL + 'forgotPasswordUpdate', req);
  }
  changePassword(req: any) {
    return this.https.post(this.BASE_URL + 'changePassword', req);
  }
  getCountries() {
    return this.https.get('https://restcountries.com/v2/all');
  }
  createTask(req: any) {
    return this.https.post(
      this.BASE_URL + 'createTaskDetails' + '?token=' + this.userData.token,
      req
    );
  }
  getAllTasks() {
    if (this.userData != null) {
      return this.https.get(
        this.BASE_URL +
          'findAllTaskDetails?' +
          // '?token=' +
          // this.userData.token +
          'userId=' +
          this.userData._id
      );
    } else {
      return this.https.get(this.BASE_URL + 'findAllTaskDetails');
    }
  }

  AllTasks(status: any) {
    return this.https.get(
      this.BASE_URL +
        'findAllTaskDetails?' +
        // '?token=' +
        // this.userData.token +
        'status=' +
        status
    );
  }

  getTasksByCatg(catgId: any) {
    return this.https.get(
      this.BASE_URL +
        'findAllTaskDetails' +
        // '?token=' +
        // this.userData.token +
        // '&userId=' +
        // this.userData._id +
        '?categoryId=' +
        catgId
    );
  }
  getParticularTasks(taskId: any) {
    return this.https.get(
      this.BASE_URL +
        'findParticularTaskDetails' +
        // '?token=' +
        // this.userData.token +
        // '&userId=' +
        // this.userData._id
        '?taskId=' +
        taskId
    );
  }
  getAllMyTasks() {
    return this.https.get(
      this.BASE_URL +
        'myTask' +
        '?token=' +
        this.userData.token +
        '&userId=' +
        this.userData._id
    );
  }
  getAllMyTasksByStatus(status: any) {
    return this.https.get(
      this.BASE_URL +
        'myTask' +
        '?token=' +
        this.userData.token +
        '&userId=' +
        this.userData._id +
        '&filterBy=' +
        status
    );
  }

  deleteTask(body: any) {
    return this.https.delete(
      this.BASE_URL + 'deleteTaskDetails' + '?token=' + this.userData.token,
      {
        body,
      }
    );
  }

  getAllMyJob(status: string) {
    return this.https.get(
      this.BASE_URL +
        'myJob' +
        '?token=' +
        this.userData.token +
        '&userId=' +
        this.userData._id +
        '&filterBy=' +
        status
    );
  }
  getAllCategories() {
    return this.https.get(
      this.BASE_URL +
        'findAllcategorySubCategory' +
        /* '?token=' +
      this.userData.token + */
        '?masterType=category'
    );
  }
  getSubCategories(catgId: any) {
    return this.https.get(
      this.BASE_URL +
        'findAllcategorySubCategory' +
        // '?token=' +
        // this.userData.token +
        '?categoryId=' +
        catgId +
        '&masterType=subCategory'
    );
  }
  makeOffer(req: any) {
    return this.https.post(
      this.BASE_URL + 'createTaskOffer' + '?token=' + this.userData.token,
      req
    );
  }
  updateOffer(req: any) {
    return this.https.put(
      this.BASE_URL + 'updateTaskOffer' + '?token=' + this.userData.token,
      req
    );
  }
  getCategorySubCategory(value: any) {
    return this.https.get(this.BASE_URL + 'findAllcategorySubCategory', {
      params: {
        masterType: value,
      },
    });
  }
  getAllCategorySubCategory() {
    return this.https.get(
      this.BASE_URL + 'findAllcategorySubCategory?' + '&masterType=Category'
    );
  }
  getAllSubCategory() {
    return this.https.get(
      this.BASE_URL + 'findAllcategorySubCategory?' + '&masterType=Sub_Category'
    );
  }
  postCategory(data: any) {
    return this.https.post(
      this.BASE_URL +
        'createcategorySubCategory' +
        '?token=' +
        this.userData.token,
      data
    );
  }
  putCategory(data: any) {
    return this.https.post(
      this.BASE_URL +
        'updatecategorySubCategory' +
        '?token=' +
        this.userData.token,
      data
    );
  }
  deleteCategory(masterId: any) {
    return this.https.delete(
      this.BASE_URL +
        'deleteCategoryOrSubCategory' +
        '?token=' +
        this.userData.token,
      masterId
    );
  }
  findCategory(masterId: any) {
    return this.https.get(
      this.BASE_URL +
        'findParticularcategorySubCategory' +
        '?token=' +
        this.userData.token,
      masterId
    );
  }
  // subCategory
  getAllData() {
    return this.https.get(this.BASE_URL + 'findAllcategorySubCategory', {
      params: {
        token: this.userData.token,
        masterType: 'Category',
      },
    });
  }
  createMandatoryCompliance(data: any) {
    return this.https.post(
      this.BASE_URL +
        'createMandatoryCompliances' +
        '?token=' +
        this.userData.token,
      data
    );
  }
  getDataByField(query: any, fieldname: String, value: any) {
    return this.https.get(this.BASE_URL + 'findParticular' + query, {
      params: {
        token: this.userData.token,
        businessInfoId: value,
      },
    });
  }
  createData(query: string, body: any) {
    return this.https.post(this.BASE_URL + 'create' + query, body, {
      params: {
        token: this.userData.token,
      },
    });
  }
  updateData(query: string, body: any) {
    return this.https.put(this.BASE_URL + 'update' + query, body, {
      params: {
        token: this.userData.token,
      },
    });
  }
  deleteData(query: string) {
    return this.https.delete(this.BASE_URL + 'delete' + query, {
      params: {
        token: this.userData.token,
      },
    });
  }
  getAllCompliance(value: any) {
    return this.https.get(this.BASE_URL + 'findAllServiceComplainces', {
      params: {
        token: this.userData.token,
        userId: value,
      },
    });
  }
  getAllBusinessInfo() {
    return this.https.get(this.BASE_URL + 'findAllBusinessInformation', {
      params: {
        token: this.userData.token,
        userId: this.userData._id,
      },
    });
  }
  getFindBusinessInfo(value: any) {
    return this.https.get(this.BASE_URL + 'findParticularBusinessInformation', {
      params: {
        token: this.userData.token,
        businessInfoId: value,
      },
    });
  }
  createBusiness(body: any) {
    return this.https.post(
      this.BASE_URL +
        'createBusinessInformation' +
        '?token=' +
        this.userData.token,
      body
    );
  }
  updateBusinessData(body: any) {
    console.log('body', body);
    return this.https.put(
      this.BASE_URL +
        'updateBusinessInformation' +
        '?token=' +
        this.userData.token,
      body
    );
  }
  public deleteBusinessData(body: any) {
    return this.https.delete(
      this.BASE_URL +
        'deleteBusinessInformation' +
        '?token=' +
        this.userData.token,
      {
        body,
      }
    );
  }
  getAllServiceProvider() {
    return this.https.get(this.BASE_URL + 'findAllServiceProvided', {
      params: {
        token: this.userData.token,
      },
    });
  }
  getServiceProvider(value: any) {
    return this.https.get(this.BASE_URL + 'findParticularServiceProvided', {
      params: {
        token: this.userData.token,
        serviceId: value,
      },
    });
  }
  getAllPaymentHistory(value: any) {
    return this.https.get(this.BASE_URL + 'findAllPaymentHistory', {
      params: {
        token: this.userData.token,
        userId: value,
      },
    });
  }
  updatePaymentData(body: any) {
    console.log('body', body);
    return this.https.put(
      this.BASE_URL + 'updatePaymentHistory' + '?token=' + this.userData.token,
      body
    );
  }
  createPayment(body: any) {
    return this.https.post(
      this.BASE_URL + 'createPaymentHistory' + '?token=' + this.userData.token,
      body
    );
  }
  getParticularPayment(paymentHistoryId: any) {
    return this.https.get(
      this.BASE_URL +
        'findParticularPaymentHistory' +
        '?token=' +
        this.userData.token +
        '?paymentHistoryId=' +
        paymentHistoryId
    );
  }
  public deletePaymentData(body: any) {
    return this.https.delete(
      this.BASE_URL + 'deletePaymentHistory' + '?token=' + this.userData.token,
      {
        body,
      }
    );
  }
  getAllNotification(value: any) {
    return this.https.get(this.BASE_URL + 'findAllAppNotificationDetails', {
      params: {
        token: this.userData.token,
        userId: value,
      },
    });
  }
  getAllUserProfile() {
    return this.https.get(this.BASE_URL + 'findAllUserProfile', {
      params: {
        token: this.userData.token,
      },
    });
  }
  updateTaskOffer(taskOfferId: any, status: any) {
    return this.https.put(
      this.BASE_URL + 'updateTaskOffer' + '?token=' + this.userData.token,
      {
        // token: this.userData.token,
        taskOfferId: taskOfferId,
        status: status,
      }
    );
  }
  findParticularUserProfile(userID: any) {
    return this.https.get(
      this.BASE_URL +
        'findParticularUserProfile' +
        '?token=' +
        this.userData.token +
        '&userId=' +
        userID
    );
  }

  updateParticularUserProfile(value: any) {
    return this.https.put(
      this.BASE_URL +
        'updateParticularUserProfile' +
        '?token=' +
        this.userData.token,
      value
    );
  }
  createMessage(body: any) {
    return this.https.post(
      this.BASE_URL + 'createMessage' + '?token=' + this.userData.token,
      body
    );
  }
  findAllMessage(taskId: any, recipientId: any) {
    return this.https.get(this.BASE_URL + 'findAllMessage', {
      params: {
        token: this.userData.token,
        taskId: taskId,
      },
    });
  }
  findAllTaskReview(sortBy: any) {
    return this.https.get(this.BASE_URL + 'findAllTaskReview', {
      params: {
        token: this.userData.token,
        userId: this.userData._id,
        sortBy: sortBy,
      },
    });
  }

  updateProfile(req: any) {
    return this.https.put(
      this.BASE_URL +
        'updateParticularUserProfile' +
        '?token=' +
        this.userData.token,
      req
    );
  }

  getUser(userId: any) {
    return this.https.get(this.BASE_URL + 'findParticularUserProfile', {
      params: {
        token: this.userData.token,
        userId: userId,
      },
    });
  }

  getPostcoderAddress(searchCode: any) {
    return this.https.get(
      'https://ws.postcoder.com/pcw/' +
        environment.postCoder.apiKey +
        '/address/au/' +
        searchCode +
        '?format=json&lines=2&addtags=latitude,longitude,posttown,state,country'
    );
  }

  uploadImage(req: any) {
    return this.https.post(
      this.BASE_URL + 'upload' + '?token=' + this.userData.token,
      req
    );
  }
  raiseInvoice(req: any) {
    console.log('req', req);
    return this.https.post(
      this.BASE_URL + 'raiseInvoice' + '?token=' + this.userData.token,
      req
    );
  }
  deleteUser(body: any) {
    return this.https.delete(
      this.BASE_URL +
        'deleteParticularUserProfile?' +
        'token=' +
        this.userData.token,
      { body }
    );
  }
}
