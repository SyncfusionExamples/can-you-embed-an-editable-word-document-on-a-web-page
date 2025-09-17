import React, { useRef, useEffect } from 'react';
import './App.css';
import { DocumentEditorContainerComponent, Ribbon } from '@syncfusion/ej2-react-documenteditor';
DocumentEditorContainerComponent.Inject(Ribbon);

function App() {
  const containerRef = useRef<DocumentEditorContainerComponent | null>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const uploadDocument = new FormData();
      uploadDocument.append('DocumentName', 'Getting Started.docx');
      const loadDocumentUrl = container.serviceUrl + 'LoadDocument';
      const httpRequest = new XMLHttpRequest();
      httpRequest.open('POST', loadDocumentUrl, true);
      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200 || httpRequest.status === 304) {
            if (container.documentEditor) {
              container.documentEditor.open(httpRequest.responseText);
            }
          }
        }
      };
      httpRequest.send(uploadDocument);
    }
  }, []);

  return (
    <div>
      <DocumentEditorContainerComponent
        id="container"
        ref={containerRef}
        height={'100vh'}
        serviceUrl="http://localhost:62869/api/documenteditor/"
        toolbarMode="Ribbon"
      />
    </div>
  );
}

export default App;