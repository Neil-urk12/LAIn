// Type declaration for html2pdf.js
// This provides basic typing to avoid TypeScript errors.
// It might not cover all options and methods accurately.
declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | [number, number] | [number, number, number, number]; // top, left, bottom, right or [v, h] or single value
    filename?: string;
    image?: { type?: 'jpeg' | 'png' | 'webp'; quality?: number };
    html2canvas?: { scale?: number; useCORS?: boolean; logging?: boolean; [key: string]: unknown };
    jsPDF?: { unit?: 'pt' | 'mm' | 'cm' | 'in'; format?: string | [number, number]; orientation?: 'portrait' | 'landscape' };
    enableLinks?: boolean;
    pagebreak?: { mode?: string | string[]; before?: string; after?: string; avoid?: string };
    // [key: string]: unknown; // Keep this if truly unknown properties are common, or remove
  }

  interface Html2Pdf {
    from(element: HTMLElement | string): this;
    set(options: Html2PdfOptions): this;
    toPdf(): this;
    get(type: 'pdf' | 'canvas' | 'img' | 'blob'): Promise<unknown>;
    save(filename?: string): Promise<void>;
    outputPdf(type?: string, filename?: string): Promise<string | Blob | ArrayBuffer | unknown>;
    // Add other methods if you use them
  }

  const html2pdf: () => Html2Pdf;
  export default html2pdf;
} 