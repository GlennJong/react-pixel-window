# @glennjong/pixel-window

像素風格的 React 視窗元件庫，支援可自訂邊框、顏色與拖曳、縮放。

## 安裝

```bash
yarn add @glennjong/pixel-window
# 或
npm install @glennjong/pixel-window
```

## 使用方式

```tsx
import { PixelWindow, FreePixelWindow } from '@glennjong/pixel-window';

function App() {
  return (
    <>
      <PixelWindow pixel={24} stroke="#000" frame="#F0F0F0" background="#F0F0F0">
        <div>內容</div>
      </PixelWindow>
      <FreePixelWindow name="demo" pixel={24} stroke="#000" frame="#F0F0F0" background="#F0F0F0">
        <div>可拖曳視窗</div>
      </FreePixelWindow>
    </>
  );
}
```

## API

### `<PixelWindow />`
| Prop         | Type     | Default   | 說明         |
|--------------|----------|-----------|--------------|
| pixel        | number   | 160       | 邊框像素大小 |
| stroke       | string   | #000      | 邊框顏色     |
| frame        | string   | #333      | 框色         |
| background   | string   | #DDD      | 背景色       |
| style        | object   |           | 內容區樣式   |
| children     | ReactNode|           | 內容         |

### `<FreePixelWindow />`
| Prop         | Type     | Default   | 說明             |
|--------------|----------|-----------|------------------|
| name         | string   |           | 唯一名稱(儲存位置/大小) |
| pixel        | number   | 16        | 邊框像素大小     |
| stroke       | string   | #000      | 邊框顏色         |
| frame        | string   | #333      | 框色             |
| background   | string   | #DDD      | 背景色           |
| position     | object   | {x:100,y:100}| 初始位置      |
| minWidth     | number   | 120       | 最小寬度         |
| minHeight    | number   | 100       | 最小高度         |
| style        | object   |           | 內容區樣式       |
| children     | ReactNode|           | 內容             |

## 授權

MIT License
