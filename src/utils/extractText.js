/** @format */

const extractTextFromPDF = async (filePath) => {
    const loadingTask = getDocument(filePath);
    const pdfDoc = await loadingTask.promise;

    let fullText = "";

    for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n";
    }

    return fullText;
};

export default extractTextFromPDF;
