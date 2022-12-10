import { useEffect, useState } from 'react';
import './App.css';

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
      <div>
         {documentFields.map((field, index) => {
            const { comboboxExtras } = field.options;
            const { fieldType } = field;
            let { width, height, borderWidth, borderColor, fontSize, borderStyle, fontStyle, fontColor, padding } = field.options.visualisation;

            width = width * 1000;
            height = height * 1000;

            switch (borderStyle) {
               case 'DOT':
                  borderStyle = 'dotted';
                  break;
               case 'DASH':
                  borderStyle = 'dashed';
                  break;
               default:
                  borderStyle = 'solid';
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
                  <div key={index}>
                     <label htmlFor="itemLines">Choose Item line </label>
                     <select
                        name="itemLines"
                        id="itemLines"
                        style={{
                           width: width,
                           height: height,
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
                              {' '}
                              {option[1]}
                           </option>
                        ))}
                     </select>
                  </div>
               );
         })}

         <object
            style={{ height: '700px', width: '500px' }}
            data="src/assets/pdf-test.pdf"
            type="application/pdf"
         ></object>
      </div>
   );
}
