import { Get, Post, Route } from "tsoa";

interface OnboardDoctorResponse {
    name: string
}


@Route("/doctor")
export default class DoctorController {
    @Post("/")
    public async onboardDoctor() : Promise<string> {
        const doctors: string[] = [
            "Mary Adams",
            "Donald Burke",
            "Mordecai Matthews",
            "Frank Dracman"
        ];

        let index = Math.floor(Math.random() * (doctors.length + 1))
        return doctors[index];
    }
}