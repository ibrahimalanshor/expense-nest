import { ValidationArguments, ValidationOptions, registerDecorator } from "class-validator"

export function IsConfirmed(property: string, options?: ValidationOptions) {
    return (obj: Object, propertyName: string) => {
        registerDecorator({
            name: 'isConfirmed',
            target: obj.constructor,
            propertyName,
            constraints: [property],
            options,
            validator: {
                validate: (value: any, args: ValidationArguments) => {
                    const [relatedPropertyName] = args.constraints
                    const relatedValue = (args.object as any)[relatedPropertyName];

                    return value === relatedValue;
                }
            }
        })
    }
}