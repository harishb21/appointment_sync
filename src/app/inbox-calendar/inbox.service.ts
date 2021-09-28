import { Appointment, InboxData } from './inbox.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InboxService {
  constructor(private http: HttpClient) {}
  objectList: Object[] = [];
  HOST_URL = 'http://localhost:8072';

  listOfInboxData: InboxData[] = [];

  getAllAppointmentData(): Observable<InboxData[]> {
    return this.http.get<InboxData[]>(`${this.HOST_URL}/api/appointments`);
  }

  addAppointment(inbox: InboxData) {

      const localInbox =   this.http.post(`${this.HOST_URL}/api/appointments`,inbox);
      console.log(localInbox);
    
    // this.listOfInboxData.push(inbox);
    // console.log(inbox);
    
  }

  updateAppointment(appointmentNum: InboxData) {
    let count: number = 0;
    this.listOfInboxData.forEach((element) => {
      count++;
      if (element.id === appointmentNum.id) {
        this.listOfInboxData[count - 1] = appointmentNum;
      }
    });
  }

  getAppointment(index: number) {
    return this.listOfInboxData[index];
  }

  // deleteAppointment(appointment: InboxData){

  //         let count:number=0;
  //         this.listOfInboxData.forEach(element => {
  //             count++;
  //             if(element.Id === appointment.Id){
  //                 this.listOfInboxData.splice(count-1, 1);
  //             }
  //         });

  //     }
  //==================================service data========DB Data===============================================
  // listOfInboxData: InboxData[] = [
  //     {
  //         id: 4,
  //         title: 'Surgery - Andrew5',
  //         startTime:  'Tue Oct 26 2021 12:30:00 GMT+0530 (India Standard Time)',
  //         endTime:  'Tue Oct 26 2021 13:00:00 GMT+0530 (India Standard Time)',
  //         description: 'Surgery - Andrew description',
  //         physicianId:223,
  //         patientId:36,
  //         reason:'no reason'

  //     },
  //     {
  //         id: 5,
  //         title: 'Consulting - John4',
  //         startTime: 'Tue Oct 26 2021 14:30:00 GMT+0530 (India Standard Time)',
  //         endTime: 'Tue Oct 26 2021 15:00:00 GMT+0530 (India Standard Time)',
  //         description: 'Consulting - John description',
  //         physicianId:224,
  //         patientId:37,
  //         reason:'no reason'
  //     },
  //     {
  //         description: "Therapy - Robert description",
  //         endTime: "Tue Oct 26 2021 13:00:00 GMT+0530 (India Standard Time)",
  //         id: 3,
  //         patientId: 3,
  //         physicianId: 112,
  //         reason: "no reason",
  //         startTime: "Tue Oct 26 2021 12:30:00 GMT+0530 (India Standard Time)",
  //         title: "Observation - Steven2",
  //     }, {
  //         description: "Surgery - Andrew description",
  //         endTime: "Tue Oct 26 2021 13:00:00 GMT+0530 (India Standard Time)",
  //         id: 1,
  //         patientId: 2,
  //         physicianId: 112,
  //         reason: "no reason",
  //         startTime: "Tue Oct 26 2021 12:30:00 GMT+0530 (India Standard Time)",
  //         title: "Surgery - Andrew5"
  //     }, {
  //         id: 2,
  //         title: 'Extraction - Nancy11',
  //         startTime: 'Mon Oct 25 2021 14:00:00 GMT+0530 (India Standard Time)',
  //         endTime: 'Mon Oct 25 2021 14:30:00 GMT+0530 (India Standard Time)',
  //         description: 'Extraction - Nancy description',
  //         physicianId:225,
  //         patientId:32,
  //         reason:'no reason'
  //     }
  // ];

  // loadData() {
  //     this.http
  //         .get<InboxData[]>(`${this.HOST_URL}/api/appointments`)
  //           .subscribe((res) => {
  //             this.listOfInboxData.splice(0, this.listOfInboxData.length);
  //             this.listOfInboxData.push(...res);
  //           });
  //       }
}
