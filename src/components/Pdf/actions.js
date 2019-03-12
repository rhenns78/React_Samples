import html2canvas from "html2canvas";
import JsPDF from "jspdf";

export const LoadDataPDF = (data) => ({
  type: "LOAD_DATA_PDF",
  data,
});

export const createPDF = (idFormulario, data) => async (dispatch) => {
  try {
    dispatch(LoadDataPDF(data));
    const pagina1 = document.getElementById("formularioPagina1");
    const canvas1 = await html2canvas(pagina1);

    const pagina2 = document.getElementById("formularioPagina2");
    const canvas2 = await html2canvas(pagina2);

    const pagina3 = document.getElementById("formularioPagina3");
    const canvas3 = await html2canvas(pagina3);

    const position = 0;

    const imgDataPage1 = canvas1.toDataURL("image/jpeg", 1.0);
    const imgDataPage2 = canvas2.toDataURL("image/jpeg", 1.0);
    const imgDataPage3 = canvas3.toDataURL("image/jpeg", 1.0);

    const doc = new JsPDF("p", "mm");
    doc.addImage(imgDataPage1, "JPEG", 0, position);
    doc.addPage();
    doc.addImage(imgDataPage2, "JPEG", 0, position);
    doc.addPage();
    doc.addImage(imgDataPage3, "JPEG", 0, position);

    window.open(doc.output("bloburl"));
  } catch (e) {
    console.error(e);
  }
};

