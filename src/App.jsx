import { useEffect, useState } from 'react';
import { Document, Page,pdfjs } from 'react-pdf/dist/esm/entry.vite';
import Test from './components/test';

export default function App() {
   pdfjs.GlobalWorkerOptions.workerSrc =`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
   const [documentFields, setDocumentFields] = useState([]);

   useEffect(() => {
      fetch('https://639335b5ab513e12c50722ff.mockapi.io/job')
         .then((res) => res.json())
         .then((json) => {
            setDocumentFields(json[0].documentField);
         });
   }, []);

   return (
      <div style={{background: 'grey'}}>
         {documentFields.map((field, index) => {
            const { comboboxExtras } = field.options;
            const { fieldType } = field;
            let { width, height, borderWidth, borderColor, fontSize, borderStyle, fontStyle, fontColor, padding, } = field.options.visualisation;
            let { x, y } = field.options.visualisation.location;

            switch (borderStyle) {
               case 'DOT':
                  borderStyle = 'dotted';
                  break;
               case 'DASH':
                  borderStyle = 'dashed';
                  break;
               default:
                  borderStyle = 'solid';
                  break;
            }

            switch (fontStyle) {
               case 'PLAIN':
                  fontStyle = 'normal';
                  break;
               case 'BOLD':
                  fontStyle = 'bold';
                  break;
               default:
                  fontStyle = 'normal';
                  break;
            }

            if (fieldType === 'COMBOBOX')
               return (
                  <select
                     name="itemLines"
                     id="itemLines"
                     key={index}
                     style={{
                        position: 'absolute',
                        zIndex: '999',
                        bottom: `${y * 100}%`,
                        left: `${x * 100}%`,

                        width: `${width * 100}%`,
                        height: `${height * 100}%`,
                        border: `${borderWidth}px ${borderStyle} rgba(${borderColor})`,
                        padding: padding,
                        fontSize: fontSize,
                        color: `rgba(${fontColor})`,
                        fontWeight: fontStyle,
                     }}
                     defaultValue={comboboxExtras.defaultOptionKey}
                  >
                     {Object.entries(comboboxExtras.options).map((option, index) => (
                        <option key={index} value={option[0]}>
                           {option[1]}
                        </option>
                     ))}
                  </select>
               );
         })}
         <Document file="./pdf-test.pdf">
            <Page  pageNumber={1}></Page>
         </Document>
      </div>
   );
}
