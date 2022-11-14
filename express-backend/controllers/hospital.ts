
interface HospitalResponse {
    name: string
};


export default class HospitalController{
    public async assignHospital() : Promise<HospitalResponse> {
        const hospitals: HospitalResponse[] = [
            { name: "Massachusetts General" },
            { name: "Brigham & Women's Hospital" },
            { name: "Boston Medical Center" },
            { name: "Tufts Medical Center" },
            { name: "Beth Israel Deaconess" },
            { name: "UTMB Medical Center" },
            { name: "Cedars Sinai Hospital" }
        ];
    
        let index = Math.floor(Math.random() * (hospitals.length-1))
        index = (index >= 0) ? index : 0;
        await new Promise( f => setTimeout(f, 5000));
        return hospitals[index];
    }
}