
import { PixelWindow, FreePixelWindow } from '../../src/components/PixelWindow';

function App() {
  return (
    <>
      <PixelWindow
        pixel={24}
        stroke="#000"
        frame="#F0F0F0"
        background="#F0F0F0"
      >
        <div>Pixel Window</div>
      </PixelWindow>
      <FreePixelWindow
        name="123"
        pixel={24}
        stroke="#000"
        frame="#F0F0F0"
        background="#F0F0F0"
      >
        <div>Free Pixel Window</div>
      </FreePixelWindow>
    </>
  );
}

export default App;
