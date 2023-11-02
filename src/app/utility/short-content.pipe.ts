import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'shortContent'
})
export class ShortContentPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string, length:number) {
    const sanitized = this.sanitizer.sanitize(SecurityContext.HTML,value);
    if(sanitized){
      let shortText = sanitized.slice(0,length);
      shortText = shortText+'...';
      return this.sanitizer.bypassSecurityTrustHtml(shortText);
    } else {
      return null;
    }
}

}
