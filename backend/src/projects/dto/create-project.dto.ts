import {IsMongoId} from "class-validator";

export class CreateProjectDto {
    name: string;
    description?: string;

    ownerId: string;
}
