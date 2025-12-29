
import { PixelWindow, FreePixelWindow } from '../../src/PixelWindow';

function App() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <PixelWindow
        pixel={24}
        stroke="#000"
        frame="#F0F0F0"
        background="#F0F0F0"
      >
        <div>Pixel Window</div>
      </PixelWindow>
      <FreePixelWindow
        name="free-pixel-window"
        pixel={24}
        stroke="#000"
        frame="#F0F0F0"
        background="#F0F0F0"
      >
        <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
          <div>Free Pixel Window</div>
          <ul>
            <li>item1</li>
            <li>item2</li>
            <li>item3</li>
          </ul>
        </div>
      </FreePixelWindow>
    </div>
  );
}

export default App;
