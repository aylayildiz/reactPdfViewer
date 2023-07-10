
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Viewer } from '@react-pdf-viewer/core';
import { useState } from 'react';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfGoruntuleyici = () => {
    const [pdfDosyasi, setPdfDosyasi] = useState('');
    const [base64Dosyasi, setBase64Dosyasi] = useState('');
    const fileType = ['application/pdf'];
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const pdfToBase64 = (file, cb) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            cb(null, reader.result)
        }
        reader.onerror = () => {
            cb(error, null)
        }
    }

    const base64toBlob = (data) => {
        // Cut the prefix `data:application/pdf;base64` from the raw base 64
        const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

        const bytes = atob(base64WithoutPrefix);
        let length = bytes.length;
        let out = new Uint8Array(length);

        while (length--) {
            out[length] = bytes.charCodeAt(length);
        }

        return new Blob([out], { type: 'application/pdf' });
    };

    const blob = base64toBlob(base64Dosyasi);
    const url = URL.createObjectURL(blob);

    const onChangeDosyaSec = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onload = (e) => {
                    setPdfDosyasi(e.target.result)
                }
                pdfToBase64(e.target.files[0], (err, result) => {
                    if (result) {
                        setBase64Dosyasi(result);
                    }
                })
            }
            else {
                setPdfDosyasi(null)
            }
        }
        else {
            console.log("lütfen dosya seçiniz");
        }
    }
    var x=10;
    var y=5;
    var z= x++%4*--y;
    console.log(z);
    return (
        <div>
            <div>
                <input
                    type="file"
                    name="file"
                    onChange={onChangeDosyaSec}
                /* accept=".pdf" */
                />
            </div>
            <br />
            <div>
                <Worker
                    workerUrl="https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js"    // versiyon bilgisi package.json dosyası ile eşleşmeli
                >
                   
                                {pdfDosyasi &&
                                    < Viewer
                                        fileUrl={pdfDosyasi}
                                        plugins={[defaultLayoutPluginInstance]}
                                    />
                                }
                            
                                {!pdfDosyasi && 'GÖSTERİELECEK PDF BULUNAMADI'}
                           
                                {base64Dosyasi ? console.log("base64:", base64Dosyasi) : console.log("kayıt yok:")}
                            
                              {/*   {pdfDosyasi &&
                                    < Viewer
                                        fileUrl={url}
                                        plugins={[defaultLayoutPluginInstance]}
                                    />
                                } */}
                           
                        
                </Worker>
            </div>
        </div>
    );
}

export default PdfGoruntuleyici;


