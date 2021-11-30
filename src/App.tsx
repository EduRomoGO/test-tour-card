/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Tours from "components/Tours";

function App() {
  return (
    <div
      css={css`
        padding: 16px;
        display: flex;
        justify-content: center;
      `}
    >
      <Tours
        css={css`
          flex-grow: 1;
          max-width: 800px;
        `}
      />
    </div>
  );
}

export default App;
