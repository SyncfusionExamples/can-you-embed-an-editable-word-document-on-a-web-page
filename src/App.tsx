import React, { useEffect, useRef } from 'react';
import './App.css';
import { DocumentEditorContainerComponent, Ribbon } from '@syncfusion/ej2-react-documenteditor';
import { registerLicense } from '@syncfusion/ej2-base';
// Register the Syncfusion license
registerLicense("NxYtGyMROh0gHDMgDk1jXU9FaF5JXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxWdk1gWH5dc3FVRWNaV0R9XEM=");
DocumentEditorContainerComponent.Inject(Ribbon);

function App() {
  const containerRef = useRef<DocumentEditorContainerComponent | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const form = new FormData();
    form.append('DocumentName', 'Getting Started.docx');
    const url = container.serviceUrl + 'LoadDocument';
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
        container.documentEditor?.open(xhr.responseText);
      }
    };
    xhr.send(form);
  }, []);

  return (
    <>
      <header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        </div>
        <img src="/AdventureCycle.jpg" alt="Adventure Works Cycles Logo" className="logo">
        </img>
      </header>

      <main>
        <h2>Welcome to Our Site!</h2>
        <div className="editor-box">
          <DocumentEditorContainerComponent
            id="doc-editor"
            ref={containerRef}
            height={'90vh'}
            serviceUrl="http://localhost:62869/api/documenteditor/"
            toolbarMode="Ribbon"
          />
        </div>
      </main>

      <footer>
        © {new Date().getFullYear()} Adventure Works Cycles. All rights reserved.
      </footer>
    </>
  );
}

export default App;