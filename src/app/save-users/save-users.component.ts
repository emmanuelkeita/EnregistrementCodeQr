// import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employers } from '../models/models.employer';
declare var window: any;

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore, } from '@angular/fire/compat/firestore';
import { map, observable } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-save-users',
  templateUrl: './save-users.component.html',
  styleUrls: ['./save-users.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class SaveUsersComponent implements OnInit {

  formUsers!: FormGroup;
  tableInformationUser!: Observable<any[]>;
  tab!:any;
  editUsersFormModal!: any;
  modalUserindex!: any;
  modalUserindexInit!: any;

  myQrCode!: string;

  constructor(private formBuilder: FormBuilder,
    private fireAuth: AngularFireAuth,
    private route: Router,
    private firestore: AngularFirestore) {
    // this.myQrCode = "this.formUsers.value.firstName";
    this.recupInformationUser();
  }

  createdUserForm() {
    this.formUsers = this.formBuilder.group({
      id: [],
      firstName: [],
      lastName: [],
      job: []

    })
  }

  printQrCode(){
    window.print();
  }
  saveNewEditUser() {

    //   this.createdUserForm()
    // }else{
    //   this.tableInformationUser.indexOf(this.formUsers.value.id)
    //   console.log(this.tableInformationUser.indexOf(this.formUsers.value.id));

    // // }
    // this.tableInformationUser[this.modalUserindex] = this.formUsers.value;
    
    this.firestore.collection('Employer').doc(this.modalUserindex.id).set(this.modalUserindex.info).then(() => {
      this.editUsersFormModal.hide();
    })
    


  }
  sendInformationUser() {
    // this.tableInformationUser.push(this.formUsers.value),
    console.log(this.tableInformationUser),
      this.firestore.collection('Employer').add({
        firstName: this.formUsers.value.firstName,
        lastName: this.formUsers.value.lastName,
        job: this.formUsers.value.job,
        //  QR:this.myQrCode
      }

      )
    //  console.log(this.myQrCode);
  }

  recupInformationUser() {
    // this.tableInformationUser = this.firestore.collection('Employer').valueChanges();
    // this.tableInformationUser.subscribe(datas => {
    //   datas.forEach(data => {
    //     this.myQrCode = data.qrCode;
    //     console.log(this.myQrCode);
    //   })
    // });

    this.firestore.collection('Employer').snapshotChanges(["added","modified","removed"]).subscribe(data => {
      this.tab=[];
      data.forEach(d => {
        this.tab.push({
          id: d.payload.doc.id,
          info: d.payload.doc.data()
        })
      });
    })
    console.log(this.tab);
    
  }


  deleteInformationUser(index:number) {
    // this.tableInformationUser.splice(index, 1),
      // this.firestore.collection('Employer').valueChanges()
      
      this.firestore.collection('Employer').doc(this.tab[index].id).delete().then(()=>{console.log("element sup " ,this.tab[index].id);})
      
      
      
  
  }

  editInformationUser(index: any) {
    console.log(index);
    this.modalUserindexInit = this.tab[index];
    this.modalUserindex = this.tab[index];
    console.log('this.modalUser', this.modalUserindex);

    this.editUsersFormModal.show();

    // console.log(this.tableInformationUser[index].firstName);


    // this.formUsers.value.lastName;
    // this.formUsers.value.job;

  }

  closeInformationUser() {
    console.log( "init",this.modalUserindexInit);
    
    this.modalUserindex=this.modalUserindexInit;
    this.editUsersFormModal.hide();
  }


  ngOnInit() {
    this.createdUserForm();

    this.editUsersFormModal = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    )
  }

}
