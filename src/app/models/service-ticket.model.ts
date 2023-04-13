import { ServiceCar } from "./service-car.model";

export class ServiceTicket{

    constructor(
        public lastServiceMileage: number,
        public lastServiceDate: string,
        public serviceDescription: string,
        public serviceCost: number,
        public upcomingServiceDate: string,
        public serviceEngineerName: string,
        public serviceCar: ServiceCar
    ) {}
}
