import  Container  from "./container";
import styles from "../styles/onboard.module.css";
import fetch, { Headers } from "node-fetch";

export default function OnboardForm() {

    const launchWorkflow = async (event) => {
        event.preventDefault();
        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const contactpref = event.target.contactpref.value;

        let patientinfo = {
            name: `${firstName} ${lastName}`,
            email: email,
            phone: phone,
            contactPref: contactpref
        };

        // use a relative URL to call the API
        const res = await fetch('/api/run-workflow', {
            body: JSON.stringify(patientinfo),
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
        });

        let msgclone = res.clone();
        let cloneReader = msgclone.body.getReader();

        let td = new TextDecoder();
        let codedArr = await cloneReader.read();
        let jsontxt = td.decode(codedArr.value);
        
        let ret = JSON.parse(jsontxt);

        if (res.status == 200) {
            
            alert(`Workflow started workflow id: ${ret.workflowId}`);
        }
        else if (res.status == 500)
        {
            
            alert(ret.message);
        }
        else {
            alert(`Unknown error status ${res.status}`);
        }

    }

    return (
        <Container>
        <form onSubmit={launchWorkflow} >
            <div>
                <input className={styles.formInput} type="text" id="firstName" />
            </div>
            <div className={styles.formLabel}>
                <label htmlFor="firstName">First Name</label>
            </div>
            <div>
                <input className={styles.formInput} type='text' id="lastName" />
            </div>
            <div className={styles.formLabel}>
                <label htmlFor="lastName">Last Name</label>
            </div>
            <div>
                <input className={styles.formInput} type='text' id='email' />
            </div>
            <div className={styles.formLabel}>
                <label htmlFor="email">Email</label>
            </div>
            <div>
                <input className={styles.formInput} type='text' id='phone' />
            </div>
            <div className={styles.formLabel}>
                <label htmlFor="phone">Phone</label>
            </div>
            <div className={styles.formRowCenter}>
                <div className={styles.formLabel}>
                    <label htmlFor="contactpref">Preferred Contact Method</label>
                </div>
                <div>
                    <label htmlFor="emailpref">Email</label>
                    <input type="radio" name="contactpref" id="emailpref" value="Email" />
                    <span className={styles.formLabelNoBold}></span>
                    <label htmlFor="emailpref">Phone</label>
                    <input type="radio" name="contactpref" id="phonepref" value="Phone" />
                </div>
            </div>
            <div  className={styles.formRowCenter}>
                <button className={styles.onboardSubmitButton} type="submit"><span className="buttonText">Submit</span></button>
            </div>
        </form>
        </Container>

    )
};

