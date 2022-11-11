// This file holds the main code for the plugin. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).
// navigator.clipboard.d.ts

// // Type declarations for Clipboard API
// // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
// interface Clipboard {
//   writeText(newClipText: string): Promise<void>;
//   // Add any other methods you need here.
// }
// readText
// interface NavigatorClipboard {
//   // Only available in a secure context.
//   readonly clipboard?: Clipboard;
// }

// interface Navigator extends NavigatorClipboard {}


  
let np1s=["公元前","前","BC"]
let np2s=["公元","AC"]


// 奥古斯都（前63年9月23日－14年8月19日）
// 白居易（772年2月28日－846年9月8日）
// 白居易（772年2月28日－846年9月8日）


// let sampleRegEx: RegExp = /(?<name>.*)（(?<start>[0-9]{1,4}).{0,1}[0-9]{0,2}.{0,1}[0-9]{0,2}..{0,1}(?<end>[0-9]{1,4}).{0,1}[0-9]{0,2}.{0,1}[0-9]{0,2}..{0,1}/;
let sampleRegEx: RegExp = /(?<name>.*)（(?<np1>[\u4e00-\u9fa5]{0,3})(?<start>[0-9]{1,5})[\u4e00-\u9fa5]{0,1}[0-9]{0,2}[\u4e00-\u9fa5]{0,1}[0-9]{0,2}.[\u4e00-\u9fa5]{0,1}[－|-|—|-]{1}(?<np2>[\u4e00-\u9fa5]{0,3})(?<end>[0-9]{1,5})[\u4e00-\u9fa5]{0,1}[0-9]{0,2}[\u4e00-\u9fa5]{0,1}[0-9]{0,2}.[\u4e00-\u9fa5]{0,1}/;
// Runs this code if the plugin is run in Figma
if (figma.editorType === 'figma') {
  // This plugin will open a window to prompt the user to enter a number, and
  // it will then create that many rectangles on the screen.

  // This shows the HTML page in "ui.html".
  figma.showUI(__html__);
  // Calls to "parent.postMessage" from within the HTML page will trigger this
  // callback. The callback will be passed the "pluginMessage" property of the
  // posted message.
  (async () => {
    await figma.loadFontAsync({ family: "Inter", style: "Bold"})
  })()
  // position: absolute;
  // width: 70.75px;
  // height: 7.83px;
  
  // font-family: 'Work Sans';
  // font-style: normal;
  // font-weight: 700;
  // font-size: 35px;
  // line-height: 41px;
  // display: flex;
  // align-items: center;
  // text-align: center;
  // letter-spacing: -0.02em;
  
  // color: #000000;
  

function createBox(test1:any) {
  const nodes: SceneNode[] = [];
  const box = figma.createRectangle();
  const text = figma.createText ();
  
  const matches = test1.match(sampleRegEx);
  const name = matches.groups.name;
  const start = matches.groups.start;
  const end = matches.groups.end;
  const np1 = matches.groups.np1;
  const np2 = matches.groups.np2;

  let np1n=1;
  let np2n=1;
  if (np1s.indexOf(np1)>-1){
    np1n=-1;
  }
  if (np1s.indexOf(np2)>-1){
    np2n=-1;
  }


  box.y=np1n*parseInt(start, 10);
  box.x=-3600
  box.resize(60,np2n*parseInt(end, 10)-box.y);
  
  text.y=box.y;
  text.x=-3600

  text.resize(box.width,box.height);

  text.name=name;
  
  text.characters = name;
  text.fontSize = 18;
  text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }]

  text.characters=name;
  box.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
  figma.currentPage.appendChild(box);
  nodes.push(text);
  nodes.push(box);
  const g= figma.group([box], figma.currentPage);
   g.appendChild(text)
  

  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);

  // figma.closePlugin();
}
  
  figma.ui.onmessage = msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === 'create-shapes') {
      const nodes: SceneNode[] = [];
      for (let i = 0; i < msg.count; i++) {
        const rect = figma.createRectangle();
        rect.x = i * 150;
        rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
        figma.currentPage.appendChild(rect);
        nodes.push(rect);
      }
      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);
    }else if(msg.type === 'createyear'){
      (async () => {
        await createBox(msg.yearstr);
      })()

    }



    
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
  };

// If the plugins isn't run in Figma, run this code
} else {
  // This plugin will open a window to prompt the user to enter a number, and
  // it will then create that many shapes and connectors on the screen.

  // This shows the HTML page in "ui.html".
  figma.showUI(__html__);

  // Calls to "parent.postMessage" from within the HTML page will trigger this
  // callback. The callback will be passed the "pluginMessage" property of the
  // posted message.
  figma.ui.onmessage = msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === 'create-shapes') {
      const numberOfShapes = msg.count;
      const nodes: SceneNode[] = [];
      for (let i = 0; i < numberOfShapes; i++) {
        const shape = figma.createShapeWithText();
        // You can set shapeType to one of: 'SQUARE' | 'ELLIPSE' | 'ROUNDED_RECTANGLE' | 'DIAMOND' | 'TRIANGLE_UP' | 'TRIANGLE_DOWN' | 'PARALLELOGRAM_RIGHT' | 'PARALLELOGRAM_LEFT'
        shape.shapeType = 'ROUNDED_RECTANGLE'
        shape.x = i * (shape.width + 200);
        shape.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
        figma.currentPage.appendChild(shape);
        nodes.push(shape);
      };

      for (let i = 0; i < (numberOfShapes - 1); i++) {
        const connector = figma.createConnector();
        connector.strokeWeight = 8

        connector.connectorStart = {
          endpointNodeId: nodes[i].id,
          magnet: 'AUTO',
        };

        connector.connectorEnd = {
          endpointNodeId: nodes[i+1].id,
          magnet: 'AUTO',
        };
      };

      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);
    }

    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
  };
};
