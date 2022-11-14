
interface DoctorResponse {
    name: string
};


export default class DoctorController{
    public async assignDoctor() : Promise<DoctorResponse> {
        const doctors: DoctorResponse[] = [
            { name: "Mary Adams" },
            { name: "Donald Burke" },
            { name: "Mordecai Matthews" },
            { name: "Frank Dracman" }
        ];
    
        let index = Math.floor(Math.random() * (doctors.length-1))
        index = (index >= 0) ? index : 0;
        await new Promise( f => setTimeout(f, 5000));
        return doctors[index];
    }
}
