import {ObjectSchema} from "joi";
import {Request} from "express";
import {BadRequestError} from "@services/utils/errorHandler";

export function joiValidation(schema: ObjectSchema){
    return (target:any,key:string | symbol,descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args:any[]) {
            const req:Request = args[0];
            const {error} = schema.validate(req.body);
            if(error?.details){
                throw new BadRequestError(error.details[0].message,400)
            }

            return originalMethod.apply(this, args);
        }
        return descriptor;
    }
}