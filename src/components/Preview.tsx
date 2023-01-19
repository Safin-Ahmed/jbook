import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
}

const html = `
    <html>
        <head></head>
        <body>
            <div id="root"></div>
            <script>
                window.addEventListener('message', (event) => {
                    try {
                        eval(event.data)
                    }
                    catch (err) {
                        const root = document.querySelector("#root");

                        root.innerHTML = '<div style="color: red"> <h4>Runtime Error</h4>' + err + '</div>'

                        console.error(err);
                    }
                })
            </script>
        </body>
    </html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    console.log("Running Preview UseEffect", code);
    iframe.current.srcdoc = html;
    const timeout = setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);

    return () => clearTimeout(timeout);
  }, [code]);

  return (
    <iframe
      title="preview"
      ref={iframe}
      sandbox="allow-scripts"
      srcDoc={html}
    />
  );
};

export default Preview;
