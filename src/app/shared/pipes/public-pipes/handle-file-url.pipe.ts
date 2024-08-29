import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'handleFileUrl',
})
export class HandleFileUrlPipe implements PipeTransform {
  transform(selectedFileUrl: any): string {
    let serverUrl = 'http://127.0.0.1:8081';
    let baseFile = 'Hiring-Process-Management-System-Backend';
    let newUrl = selectedFileUrl;

    // Handle Image Url
    if (newUrl) {
      // Check if the path contains base file name
      if (newUrl?.indexOf(baseFile) != -1)
        newUrl = newUrl?.slice(newUrl.indexOf(baseFile)).replace(baseFile, '');

      // Replce Salshes
      newUrl = newUrl?.replaceAll('\\', '/');

      if (!newUrl.startsWith('http') && !newUrl.startsWith('https')) {
        if (newUrl?.charAt(0) != '/') newUrl = '/' + newUrl;
        newUrl = serverUrl + newUrl;
      }
    }

    return newUrl;
  }
}
