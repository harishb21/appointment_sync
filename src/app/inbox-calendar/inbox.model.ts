
export class InboxData {    
    
    public id: number;
        public title: String;
        public startTime: String;
        public endTime: String;
        public description: String;
        public physicianId:number;
        public patientId:number;
        public reason:String;
    constructor(
        
    ){}
}
export class Staff{
    constructor(
        public id:number,
        public firstName:String,
        public lastName:string
    ){}
}
//==========================================================================================
export class Appointment {    
    constructor(
        public id: number,
        public title: String,
        public description: String,
        public physicianId:number,
        public patientId:number,
        public startTime: string,
        public endTime: string,
        public reason:String
    ){}
}

