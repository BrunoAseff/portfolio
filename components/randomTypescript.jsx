import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

function CodeHightlighter({ children }) {
  return (
    <SyntaxHighlighter
      customStyle={{
        borderRadius: "10px",
        padding: "15px",
        maxHeight: "80vh",
        width: "550px",
        overflow: "auto",
        whiteSpace: "pre-wrap",
        fontSize: "0.9rem",
      }}
      language="javascript"
      style={atomOneDark}
    >
      {children}
    </SyntaxHighlighter>
  );
}

export default function RandomTypescriptCode() {
  return (
    <CodeHightlighter>
      {`
import { generatePassword } from "random-password-typescript";

const password = generatePassword(1);
console.log(password); 


const passwords = generatePassword(5, {
  length: 12,
  useNumbers: true,
  useSymbols: true,
  mustHave: ["@", "1"],
  startsWith: "MyP@ss",
  endsWith: "!",
});
console.log(passwords); // Array of 5 passwords



`}
    </CodeHightlighter>
  );
}
