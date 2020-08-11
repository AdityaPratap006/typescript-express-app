import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';

export function bodyValidator(...properties: string[]) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        Reflect.defineMetadata(MetadataKeys.validator, properties, target, key);
    };
}