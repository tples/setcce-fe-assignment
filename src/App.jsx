import './App.css';
import { useEffect, useState, useRef } from 'react';

export default function App() {
   const [documentFields, setDocumentFields] = useState([]);

   useEffect(() => {
      fetch('https://639335b5ab513e12c50722ff.mockapi.io/job')
         .then((res) => res.json())
         .then((json) => {
            setDocumentFields(json[0].documentField);
         });
   }, []);

   return (
      <>
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

         <object
            style={{ height: '100vh', width: '100vw', position: 'relative' }}
            data="./pdf-test.pdf#view=fit"
            type="application/pdf"
         ></object>
      </>
   );
}
