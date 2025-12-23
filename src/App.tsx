import './App.css'
import { PixelWindow, FreePixelWindow} from './components/PixelWindow/index';

function App() {

  return (
    <>
      <PixelWindow
        pixel={24}
        stroke="#000"
        frame="#F0F0F0"
        background="#F0F0F0"
      >
        <div>test</div>
      </PixelWindow>
      <FreePixelWindow
        name="123"
        pixel={24}
        stroke="#000"
        frame="#F0F0F0"
        background="#F0F0F0"
      >
        <div>123</div>
      </FreePixelWindow>
    </>
  )
}

export default App
