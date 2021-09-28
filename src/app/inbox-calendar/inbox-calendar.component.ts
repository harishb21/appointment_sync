import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { L10n } from '@syncfusion/ej2-base';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import {
  PopupOpenEventArgs,
  EventRenderedArgs,
  ScheduleComponent,
  MonthService,
  DayService,
  WeekService,
  WorkWeekService,
  EventSettingsModel,
  ResizeService,
  DragAndDropService,
  WorkHoursModel,
  EJ2Instance,
  Schedule,
  RenderCellEventArgs,
} from '@syncfusion/ej2-angular-schedule';
import { FormValidator } from '@syncfusion/ej2-angular-inputs';
import { InboxService } from './inbox.service';
import { Data } from '@syncfusion/ej2-schedule/src/schedule/actions/data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DataManager,
  ODataV4Adaptor,
  WebApiAdaptor,
} from '@syncfusion/ej2-data';
import { InboxData } from './inbox.model';
L10n.load({
  'en-US': {
    schedule: {
      newEvent: 'Add Appointment',
      editEvent: 'Edit Appointment',
    },
  },
});
@Component({
  selector: 'app-inbox-calendar',
  templateUrl: './inbox-calendar.component.html',
  styleUrls: ['./inbox-calendar.component.css'],
  providers: [
    MonthService,
    DayService,
    WeekService,
    WorkWeekService,
    ResizeService,
    DragAndDropService,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class InboxCalendarComponent implements OnInit {
  validator: FormValidator;

  constructor(private inboxService: InboxService) {
    this.loadUser();
    // console.log(this.inboxList);
  }

  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public selectedDate: Date = new Date(2021, 9, 25);
  public showQuickInfo: boolean = false;
  public workHours: WorkHoursModel = { highlight: false };
  public startdate: Object = new Date(2021, 9, 22, 9);
  public enddate: Object = new Date(2021, 12, 22, 20);
  public startHour: string = '09:00';
  public endHour: string = '20:00';
  public statusFields: Object = { text: 'StatusText', value: 'StatusText' };
  public StatusData: Object[] = [
    { StatusText: 'phisician1', Id: 1 },
    { StatusText: 'Requested', Id: 2 },
    { StatusText: 'Confirmed', Id: 3 },
  ];
  inboxList: InboxData[] = [];
  physicianValue: number = 212;
  form: FormGroup = new FormGroup({});
  dropDownValue: string = '';
  eventSettings: EventSettingsModel;

  loadUser() {
    this.inboxService.getAllAppointmentData().subscribe((data) => {
      this.eventSettings = {
        dataSource: <InboxData[]>extend([], data, null, true),
        fields: {
          subject: { name: 'title' },
          description: { name: 'description' },
          startTime: { name: 'startTime' },
          endTime: { name: 'endTime' },
        },
      };
    });
  }

  public dateParser(data: string) {
    return new Date(data);
  }
  ngOnInit(): void {}

  public onChange(args: any) {}
  public onActionBegin(args: { [key: string]: Object }): void {
    if (
      args.requestType === 'eventCreate' ||
      args.requestType === 'eventChange'
    ) {
      let data: any;
      if (args.requestType === 'eventCreate') {
        data = <any>args.data[0];

        const objData: InboxData = this.getAppointmentData(data);
        this.inboxService.addAppointment(objData).subscribe((data:any)=>{
         console.log('Sucess'); 
        },erorror=>{
          console.log(erorror);
        });
      } else if (args.requestType === 'eventChange') {
        data = <any>args.data;

        const objData1 :InboxData= this.getAppointmentData(data);
        this.inboxService.updateAppointment(objData1);
      } else if (args.requestType === 'eventRemove') {
        data = <any>args.data;
      }

      if (
        !this.scheduleObj.isSlotAvailable(
          data.startTime as Date,
          data.endTime as Date
        )
      ) {
        args.cancel = true;
      }
    }
  }

  getAppointmentData(data: any) {
    let appointmentId: number = data.Id;
    let title: string = data.title;
    let description: string = data.description;
    let physicianId: number = data.PhysicianId;
    let endTime: String = data.endTime;
    let startTime: String = data.startTime;
    let reason: string = data.reason;
    let patientId:number= 2;
    // const obj =
    //  news InboxData(appointmentId,title,StartTime,EndTime,Description,PhysicianId,6);

    const obj = {
      id: appointmentId,
      title: title,
      startTime: startTime,
      endTime: endTime,
      description: description,
      physicianId: 112,
      patientId: 2,
      reason: 'no reason',
    };
    return obj;
  }
  // console.log('appointmentId-------' + appointmentId);
  // console.log('title-------' + title);
  // console.log('Description-------' + Description);
  // console.log('PhysicianId-------' + PhysicianId);
  // console.log('EndTime-------' + EndTime);
  // console.log('StartTime-------' + StartTime);
  changeWebsite(e: any) {
    // console.log(e.value);
    //  console.log(e.itemData.Id);
    //  this.physicianValue=e.itemData.Id;
  }

  public onEventRendered(args: EventRenderedArgs): void {
    //     switch (args.data.EventType) {
    //         case 'Requested':
    //             (args.element as HTMLElement).style.backgroundColor = '#F57F17';
    //             break;
    //         case 'Confirmed':
    //             (args.element as HTMLElement).style.backgroundColor = '#7fa900';
    //             break;
    //         case 'New':
    //             (args.element as HTMLElement).style.backgroundColor = '#8e24aa';
    //             break;
    //     }
    //console.log('onEventRendered--' + args);
  }
  public onPopupOpen(args: PopupOpenEventArgs): void {
    // console.log(args);
    // if (args.type === "Editor") {
    //   const formElement: HTMLElement = args.element.querySelector(
    //     ".e-schedule-form"
    //   ) as HTMLElement;
    //   this.validator = (formElement as EJ2Instance)
    //     .ej2_instances[0] as FormValidator;
    //   this.validator.addRules("EventType", {
    //     required: [true, "This field is required."]
    //   });
    // }else{
    // }
    //console.log('on open');
    //console.log( this.inboxService.getAllAppointmentData());
  }
  // ngOnInit(): void {
  // this.form = new FormGroup({
  //   status:new FormControl("", [Validators.required]),
  //   PhysicianId:new FormControl("", [Validators.required]),
  //   patientId:new FormControl("", [Validators.required]),
  // });
  //}
  //dataSource: <Object[]>extend([], this.dataManger, null,true) ,
  // dataSource : this.inboxService.getAllAppointmentData(),

  //-----------
  // private dataManger: DataManager = new DataManager({
  //   url: 'http://localhost:8072/api/appointments',
  //   adaptor: new WebApiAdaptor,

  //   //crossDomain: false
  // });
}
