import { proxyActivities, sleep } from '@temporalio/workflow';
import { ActivationHandler } from '@temporalio/workflow/lib/internals';
// Only import the activity types
import type * as activities from './activities';

export interface PatientInfo {
    name: string,
    address1: string,
    address2: string,
    email: string,
    phone: string

}

const { assignDoctor } = proxyActivities<typeof activities>({
    startToCloseTimeout: '1 minute',
  });

const { assignHospital } = proxyActivities<typeof activities>({
    startToCloseTimeout: '1 minute',
  });

const { notifyPatient } = proxyActivities<typeof activities>({
    startToCloseTimeout: '1 minute',
  });

export async function onboard(patientInfo: PatientInfo) : Promise<string> {
    let hospitalName = await  assignHospital() ;
    sleep(5000);
    console.log(`Patient onboarded to hospital: ${hospitalName}`);

    let doctorName = await assignDoctor() ;
    sleep(5000);
    console.log(`Patient assigned to doctor: ${doctorName}`);

    let contactMethod = ((Math.random() * 2) % 2 === 0 ) ? 'phone' : 'email';
    let msg = '';
    if (contactMethod === 'phone') {
      msg = await notifyPatient(patientInfo.phone);
    }
    else {
      msg = await notifyPatient(patientInfo.email);
    }
    console.log(msg);

    return `Patient ${patientInfo.name} successfully onboarded`;

}