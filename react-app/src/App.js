import React, { useRef, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';

const ComponentToRepeat = ({ message }) => {
  return <div style={{ color: 'blue', padding: '10px', border: '1px solid blue', backgroundColor: 'lightblue' }}>
    Hello from React! Message: {message}
  </div>;
};

function App() {
  const customElementRef = useRef(null);
  const [webComponentReady, setWebComponentReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('=== React App useEffect running ===');
    
    const setupWebComponent = () => {
      const customElement = customElementRef.current;

      if (!customElement) {
        console.log('❌ Custom element not found');
        setError('Custom element not found. Make sure Angular app is running and scripts are loaded.');
        return;
      }

      // Check if the web component is properly registered
      if (customElement.tagName !== 'REPEATED-CONTENT-ELEMENT') {
        console.log('❌ Web component not properly registered');
        console.log('Expected: REPEATED-CONTENT-ELEMENT, Got:', customElement.tagName);
        setError(`Web component not properly registered. Expected REPEATED-CONTENT-ELEMENT, got ${customElement.tagName}`);
        return;
      }

      // This function tells the web component how to render the React component
      const renderer = (container) => {
        try {
          let root = container._reactRoot;
          if (!root) {
            root = createRoot(container);
            container._reactRoot = root;
          }
          root.render(
            <div style={{ padding: '15px', margin: '10px', backgroundColor: '#e8f4fd', border: '2px solid #2196f3', borderRadius: '8px' }}>
              <h4 style={{ color: '#1976d2', margin: '0 0 10px 0' }}>React Component Rendered</h4>
              {/* <ComponentToRepeat message="From React App!" /> */}
              <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#666' }}>
                Container: {container.tagName} | Id: {Math.random()}
              </p>
            </div>
          );
        } catch (error) {
          console.error('❌ Error rendering React component:', error);
        }
      };

      customElement.renderer = renderer;
      
      // Manually trigger rendering
      if (customElement.triggerRender) {
        customElement.triggerRender();
      } else {
        console.log('❌ triggerRender method not found');
      }
      
      setWebComponentReady(true);
    };

    // Wait for Angular scripts to load and initialize
    const checkAngularReady = () => {
      console.log('🔍 Checking if Angular is ready...');
      console.log('Angular window object:', window.angular);
      console.log('Custom elements registry:', customElements);
      
      const registeredElement = customElements.get('repeated-content-element');
      console.log('repeated-content-element available:', registeredElement);
      
      if (registeredElement) {
        console.log('✅ Angular web component is ready!');
        setupWebComponent();
      } else {
        console.log('⏳ Angular not ready yet, retrying in 500ms...');
        // setTimeout(checkAngularReady, 500);
      }
    };

    // Start checking for Angular readiness
    setTimeout(checkAngularReady, 1000);
    
    return () => {
      console.log('Cleaning up React component');
    };
  }, []);

  if (error) {
    return (
      <div className="App">
        <h1>React App</h1>
        <div style={{ color: 'red', padding: '20px', border: '2px solid red', margin: '20px' }}>
          <h3>Error Loading Angular Component:</h3>
          <p>{error}</p>
          <p>Make sure the Angular app is running on localhost:4200</p>
          <p>Check the browser console for more details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>React App</h1>
      <p>This React app is using an Angular web component that repeats content:</p>
      
      {!webComponentReady && (
        <div style={{ padding: '20px', border: '2px dashed orange', margin: '20px' }}>
          <h3>Loading Angular Component...</h3>
          <p>Please wait while the Angular web component is initializing...</p>
          <p>Check the browser console for progress.</p>
        </div>
      )}
      
      <div style={{ border: '2px dashed red', padding: '10px', margin: '10px 0' }}>
        <p>Web component should appear below:</p>
        <repeated-content-element ref={customElementRef}></repeated-content-element>
      </div>
    </div>
  );
}

export default App;
