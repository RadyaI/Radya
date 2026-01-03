import { PDFDocument } from 'pdf-lib-plus-encrypt'; 

export interface SignatureData {
  id: string;
  image: string;
  x: number;
  y: number;
  width: number;
  height: number;
  pageIndex: number;
}

export async function embedSignatureAndSave(
  pdfFile: File,
  signatures: SignatureData[],
  scale: number,
  password?: string
) {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  for (const sig of signatures) {
    const imageBytes = await fetch(sig.image).then((res) => res.arrayBuffer());
    const pngImage = await pdfDoc.embedPng(imageBytes);
    
    const { width: originalWidth, height: originalHeight } = pngImage;
    const pdfSigWidth = sig.width / scale;
    const pdfSigHeight = (pdfSigWidth / originalWidth) * originalHeight;

    const page = pdfDoc.getPages()[sig.pageIndex];
    const { height } = page.getSize();
    const pdfX = sig.x / scale;
    const pdfY = height - (sig.y / scale) - pdfSigHeight;

    page.drawImage(pngImage, {
      x: pdfX,
      y: pdfY,
      width: pdfSigWidth,
      height: pdfSigHeight,
    });
  }

  if (password && password.trim().length > 0) {
    console.log("🔒 Encrypting PDF...");
    
    await pdfDoc.encrypt({
      userPassword: password,
      ownerPassword: password,
      permissions: {
        printing: 'highResolution',
        modifying: false,
        copying: false,
        annotating: false,
        fillingForms: false,
        contentAccessibility: true,
        documentAssembly: false,
      },
    });
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
}