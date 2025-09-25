// 使用 jsdelivr CDN 导入 Three.js 和相关模块
// @ts-ignore
import * as THREE from 'three';

// @ts-ignore
import TWEEN from 'three/addons/libs/tween.module.js';
// @ts-ignore
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
// @ts-ignore
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

import renderTypedFromMe from './me';
import { generateEnhancedStars } from './star';
const appItems = [
    {
        index: 1,
        element: 'me',
        name: '我',
        url: '/about',
        row: 1,
        column: 2,
        icon: 'mdi:home',
    },
    {
        index: 2,
        element: 'me',
        name: 'profile',
        url: '/profile',
        row: 1,
        column: 4,
        icon: 'mdi:home',
    },
    {
        index: 3,
        element: 'music',
        name: 'music',
        url: '/music',
        row: 2,
        column: 1,
        icon: 'mdi:home',
    },
    {
        index: 4,
        element: 'record',
        name: 'record',
        url: '/record',
        row: 2,
        column: 3,
        icon: 'mdi:home',
    }, {
        index: 5,
        element: 'footprint',
        name: '足迹',
        url: '/footprint',
        row: 2,
        column: 5,
        icon: 'mdi:home',
    }, {
        index: 6,
        element: 'ai',
        name: 'ai',
        url: '/ai',
        row: 3,
        column: 3,
        icon: 'mdi:home',
    }
]

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: any;
let controls: any;
let appGroup: THREE.Group | null = null;

const objects: any[] = [];
const targets: { table: any[], sphere: any[], helix: any[], grid: any[] } = { table: [], sphere: [], helix: [], grid: [] };

const RenderAppItem = (el: string, name: string, url: string, iconName: string) => {
    const element = document.createElement('div');
    element.className = 'app-item';
    element.classList.add(el);
    element.setAttribute('data-url', url);
    element.setAttribute('data-name', name);
    element.setAttribute('data-el', el);

    const appItemBox = document.createElement('div');
    appItemBox.className = 'app-item-box';
    const appItemIcon = document.createElement('span');
    appItemIcon.className = 'app-item-icon';
    const iconHTML = `<span class="iconify" data-icon="${iconName}"></span>`;
    appItemIcon.innerHTML = iconHTML;
    appItemBox.appendChild(appItemIcon);
    appItemBox.addEventListener('click', () => {
        window.location.href = url;
    });
    // appItemBox.textContent = String((index / 5) + 1);
    element.appendChild(appItemBox);

    const appItemName = document.createElement('div');
    appItemName.className = 'app-item-name';
    appItemName.textContent = name;
    element.appendChild(appItemName);
    return element;

}

init();
animate();
function init() {
    // 初始化相机
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1520;

    scene = new THREE.Scene();

    // table

    for (let i = 0; i < appItems.length; i++) {
        const element = RenderAppItem(appItems[i].element, appItems[i].name, appItems[i].url, appItems[i].icon);
        //  随机位置
        const objectCSS = new CSS3DObject(element);
        objectCSS.position.x = Math.random() * 4000 - 2000;
        objectCSS.position.y = Math.random() * 4000 - 2000;
        objectCSS.position.z = Math.random() * 4000 - 2000;
        scene.add(objectCSS);

        objects.push(objectCSS);

        //

        const object = new THREE.Object3D();
        // 网格居中计算
        const GRID_COLS = 5;  // 网格列数
        const GRID_ROWS = 3;  // 网格行数
        const CELL_WIDTH = 140;  // 每个单元格宽度
        const CELL_HEIGHT = 180; // 每个单元格高度

        // 计算居中位置
        const gridWidth = GRID_COLS * CELL_WIDTH;
        const gridHeight = GRID_ROWS * CELL_HEIGHT;
        const centerOffsetX = -gridWidth / 2 + CELL_WIDTH / 2;  // 水平居中偏移
        const centerOffsetY = gridHeight / 2 - CELL_HEIGHT / 2; // 垂直居中偏移

        object.position.x = (appItems[i].column - 1) * CELL_WIDTH + centerOffsetX;
        object.position.y = -((appItems[i].row - 1) * CELL_HEIGHT - centerOffsetY);

        targets.table.push(object);

    }

    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container')!.appendChild(renderer.domElement);

    //render

    controls = new TrackballControls(camera, renderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener('change', render);

    transform(targets.table, 2000);

    // 生成随机星星背景
    generateEnhancedStars(200); // 生成200颗星星

    window.addEventListener('resize', onWindowResize);

    // 构建全局组，统一管理与旋转
    appGroup = new THREE.Group();
    for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];
        scene.remove(obj);
        appGroup.add(obj);
    }
    scene.add(appGroup);
}

function renderTyped() {
    if (appGroup) {
        const duration = 1200;
        const easing = TWEEN.Easing.Exponential.InOut;

        new TWEEN.Tween(appGroup.rotation)
            .to({ 
                x: appGroup.rotation.x,
                y: appGroup.rotation.y - Math.PI / 4,
                z: appGroup.rotation.z
            }, duration)
            .easing(easing)
            .start();

        // 计算将左侧对齐到屏幕中线所需的世界坐标位移
        let minScreenX = Infinity;
        for (let i = 0; i < appGroup.children.length; i++) {
            const child = appGroup.children[i] as THREE.Object3D;
            const worldPos = new THREE.Vector3();
            child.getWorldPosition(worldPos);
            const ndc = worldPos.clone().project(camera);
            const screenX = (ndc.x + 1) / 2 * window.innerWidth;
            if (screenX < minScreenX) minScreenX = screenX;
        }
        const desiredLeftPx = window.innerWidth / 2;
        const deltaPx = desiredLeftPx - minScreenX;
        // 估算像素到世界单位的比例（在组原点附近取样）
        const gp = new THREE.Vector3();
        appGroup.getWorldPosition(gp);
        const gp2 = gp.clone().add(new THREE.Vector3(1, 0, 0));
        const s1 = gp.clone().project(camera);
        const s2 = gp2.clone().project(camera);
        const pxPerWorld = ((s2.x - s1.x) * 0.5 + 0.5) * window.innerWidth - ((s1.x) * 0.5 + 0.5) * window.innerWidth; // 简化为差值*屏宽
        const worldDeltaX = pxPerWorld !== 0 ? (deltaPx / pxPerWorld) : 0;
        const targetX = appGroup.position.x + worldDeltaX;

        // 将整体在 x 轴平移到目标位置，使左沿位于屏幕中线
        new TWEEN.Tween(appGroup.position)
            .to({ x: targetX }, duration)
            .easing(easing)
            .start();

        // 统一驱动渲染，确保两段补间同步且顺滑
        new TWEEN.Tween({})
            .to({}, duration)
            .onUpdate(render)
            .start();
    }
    
    // 调用导入的函数
    renderTypedFromMe();
}

function transform(targets: any[], duration: number) {

    TWEEN.removeAll();

    for (let i = 0; i < objects.length; i++) {

        const object = objects[i];
        const target = targets[i];

        new TWEEN.Tween(object.position)
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

    }
    new TWEEN.Tween({})
        .to({}, duration * 2)
        .onUpdate(render)
        .start();

}


//监听点击事件
window.addEventListener("click", onClick, false);

//事件函数
function onClick(event: MouseEvent) {
    // debugger;
    console.log("点击了", event);
    
    // 对于 CSS3DObject，我们需要使用不同的检测方法
    // 首先尝试直接检测 DOM 元素
    const element = document.elementFromPoint(event.clientX, event.clientY);
    console.log("点击的元素:", element);
    
    if (element && element.closest('.app-item')) {
        // 找到了应用元素
        const appItem = element.closest('.app-item') as HTMLElement;
        const data = (appItem as any).dataset || {};
        const isMe = appItem.classList.contains('me') || data.el === 'me';
        const url = data.url as string | undefined;

        if (isMe) {
            console.log("执行 '我' 应用的特殊功能");
            renderTyped();
            return;
        }
        if (url) {
            console.log(`跳转到应用: ${url}`);
            window.location.href = url;
            return;
        }
    }
    
    // // 如果直接检测失败，尝试使用 Raycaster
    // console.log("尝试使用 Raycaster 检测...");
    // const raycaster = new THREE.Raycaster();
    // const mouse = new THREE.Vector2();
    
    // // 计算鼠标或触摸点的位置
    // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // // 更新射线
    // raycaster.setFromCamera(mouse, camera);
    
    // // 计算与所有对象的交点
    // const intersects = raycaster.intersectObjects(objects, true);
    // console.log("Raycaster 检测结果:", intersects);
    
    // if (intersects.length > 0) {
    //     // 处理点击事件
    //     const clickedObject = intersects[0].object as any;
        
    //     // 检查是否是我们的应用对象
    //     if (clickedObject.appData) {
    //         const appData = clickedObject.appData;
            
    //         // 详细的点击信息
    //         console.log("=== 点击检测结果 (Raycaster) ===");
    //         console.log("应用名称:", appData.name);
    //         console.log("应用元素类型:", appData.element);
    //         console.log("应用索引:", appData.index);
    //         console.log("应用位置:", `行${appData.row}, 列${appData.column}`);
    //         console.log("应用URL:", appData.url);
    //         console.log("应用图标:", appData.icon);
    //         console.log("==================");
            
    //         // 显示视觉反馈
    //         showClickFeedback(appData);
            
    //         // 根据不同的应用执行不同的操作
    //         if (appData.element === 'me') {
    //             console.log("执行 '我' 应用的特殊功能");
    //             renderTyped();
    //         } else {
    //             console.log(`跳转到 ${appData.name} 应用: ${appData.url}`);
    //             window.location.href = appData.url;
    //         }
    //     } else {
    //         console.log("点击了其他对象:", clickedObject);
    //     }
    // } else {
    //     console.log("没有点击到任何应用对象");
    //     console.log("objects 数组长度:", objects.length);
    //     console.log("objects 内容:", objects);
    // }
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();

}

function animate() {

    requestAnimationFrame(animate);

    TWEEN.update();

    controls.update();

}

function render() {

    renderer.render(scene, camera);

}

