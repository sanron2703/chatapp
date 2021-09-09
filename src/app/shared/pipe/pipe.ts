import { Pipe , PipeTransform } from "@angular/core";


@Pipe({
    name:'pipe'
})

export class pipe implements PipeTransform{
    transform(value : string , character : string): string{
        return value.replace(character,'')
    }
}