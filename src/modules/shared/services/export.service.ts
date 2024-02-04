import { Injectable } from '@angular/core';
import { writeFile } from 'xlsx';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor() {}
  printTable(tableId: string, title: string) {
    const printWindow = window.open('', '_blank');

    const tableElement = document.getElementById(tableId);

    if (printWindow && tableElement) {
      printWindow.document.write('<html><head><title>Table Print</title>');
      const styles = Array.from(document.styleSheets).map(
        (styleSheet) =>
          styleSheet.href ||
          Array.from(styleSheet.rules)
            .map((rule) => rule.cssText)
            .join('\n')
      );
      printWindow.document.write(`<style>${styles.join('\n')}</style>`);

      printWindow.document.write('</head><body>');
      printWindow.document.write(`<h1>${title}</h1>`);
      printWindow.document.write(tableElement.outerHTML);
      printWindow.document.write('</body></html>');
      printWindow.print();
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    }
  }
  exportToExcel(tableId: string, fileName: string) {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      document.getElementById(tableId)
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    writeFile(wb, fileName);
  }
}
