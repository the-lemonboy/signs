// 使用 jsdelivr CDN 导入 Three.js 和相关模块
// @ts-ignore
import * as THREE from 'three';

// @ts-ignore
import TWEEN from 'three/addons/libs/tween.module.js';
// @ts-ignore
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
// @ts-ignore
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

const appItems = [
    {
        index: 1,
        name:'我',
        url:'/about',
        row:1,
        column:2,
        // img

    },
    {
        index: 2,
        name:'profile',
        url:'/profile',
        row:1,
        column:4,
        // img

    },
    {
        index: 3,
        name:'music',
        url:'/music',
        row:2,
        column:1,
        // img

    },
    {
        index: 4,
        name:'record',
        url:'/record',
        row:2,
        column:3,
        // img

    },{
        index: 5,
        name:'足迹',
        url:'/footprint',
        row:2,
        column:5,
        // img

    },{
        index: 6,
        name:'ai',
        url:'/ai',
        row:3,
        column:3,
        // img

    }
]

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: any;
let controls: any;

const objects: any[] = [];
const targets: { table: any[], sphere: any[], helix: any[], grid: any[] } = { table: [], sphere: [], helix: [], grid: [] };

const RenderAppItem = (name: string, url: string)=>{
    const element = document.createElement('div');
    element.className = 'app-item';

    const appItemBox = document.createElement('div');
    appItemBox.className = 'app-item-box';
    appItemBox.addEventListener('click', ()=>{
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
    camera.position.z = 3000;

    scene = new THREE.Scene();

    // table

    for (let i = 0; i < appItems.length; i++) {
        const element = RenderAppItem(appItems[i].name, appItems[i].url);
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

    // sphere

    // const vector = new THREE.Vector3();

    // for (let i = 0, l = objects.length; i < l; i++) {

    //     const phi = Math.acos(- 1 + (2 * i) / l);
    //     const theta = Math.sqrt(l * Math.PI) * phi;

    //     const object = new THREE.Object3D();

    //     object.position.setFromSphericalCoords(800, phi, theta);

    //     vector.copy(object.position).multiplyScalar(2);

    //     object.lookAt(vector);

    //     targets.sphere.push(object);

    // }

    // // helix

    // for (let i = 0, l = objects.length; i < l; i++) {

    //     const theta = i * 0.175 + Math.PI;
    //     const y = - (i * 8) + 450;

    //     const object = new THREE.Object3D();

    //     object.position.setFromCylindricalCoords(900, theta, y);

    //     vector.x = object.position.x * 2;
    //     vector.y = object.position.y;
    //     vector.z = object.position.z * 2;

    //     object.lookAt(vector);

    //     targets.helix.push(object);

    // }

    // // grid

    // for (let i = 0; i < objects.length; i++) {

    //     const object = new THREE.Object3D();

    //     object.position.x = ((i % 5) * 400) - 800;
    //     object.position.y = (- (Math.floor(i / 5) % 5) * 400) + 800;
    //     object.position.z = (Math.floor(i / 25)) * 1000 - 2000;

    //     targets.grid.push(object);

    // }

    //

    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container')!.appendChild(renderer.domElement);

    //render

    controls = new TrackballControls(camera, renderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener('change', render);

    // const buttonTable = document.getElementById('table');
    // buttonTable!.addEventListener('click', function () {
    //     setActiveButton('table');
    //     transform(targets.table, 2000);
    // });

    // const buttonSphere = document.getElementById('sphere');
    // buttonSphere!.addEventListener('click', function () {
    //     setActiveButton('sphere');
    //     transform(targets.sphere, 2000);
    // });

    // const buttonHelix = document.getElementById('helix');
    // buttonHelix!.addEventListener('click', function () {
    //     setActiveButton('helix');
    //     transform(targets.helix, 2000);
    // });

    // const buttonGrid = document.getElementById('grid');
    // buttonGrid!.addEventListener('click', function () {
    //     setActiveButton('grid');
    //     transform(targets.grid, 2000);
    // });

    transform(targets.table, 2000);

    // 生成随机星星背景
    generateEnhancedStars(200); // 生成200颗星星

    //

    window.addEventListener('resize', onWindowResize);

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


// 页面随机添加star - 增强版星空背景

// 创建闪烁动画的CSS
function createTwinkleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0.3; transform: scale(0.8); }
        }
        
        .star {
            pointer-events: none;
            z-index: -1;
            box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
        }
        
        /* 不同大小的星星有不同的闪烁效果 */
        .star-small {
            animation-duration: 2s !important;
        }
        
        .star-medium {
            animation-duration: 3s !important;
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
        }
        
        .star-large {
            animation-duration: 4s !important;
            box-shadow: 0 0 10px rgba(255, 255, 255, 1);
        }
    `;
    document.head.appendChild(style);
}

// 增强版星星生成函数
function generateEnhancedStars(count: number) {
    // 先创建CSS动画
    createTwinkleAnimation();
    
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // 随机大小分类
        const sizeType = Math.random();
        let size, sizeClass;
        
        if (sizeType < 0.6) {
            // 60% 小星星
            size = Math.random() * 1 + 0.5; // 0.5-1.5px
            sizeClass = 'star-small';
        } else if (sizeType < 0.9) {
            // 30% 中等星星
            size = Math.random() * 1.5 + 1.5; // 1.5-3px
            sizeClass = 'star-medium';
        } else {
            // 10% 大星星
            size = Math.random() * 2 + 3; // 3-5px
            sizeClass = 'star-large';
        }
        
        star.classList.add(sizeClass);
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.backgroundColor = '#ffffff';
        star.style.borderRadius = '50%';
        star.style.position = 'fixed';
        
        // 随机位置
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        
        // 根据大小设置透明度 (大的更亮，模拟近处)
        let opacity;
        if (sizeClass === 'star-small') {
            opacity = Math.random() * 0.4 + 0.2; // 0.2-0.6 (远处，暗)
        } else if (sizeClass === 'star-medium') {
            opacity = Math.random() * 0.4 + 0.5; // 0.5-0.9 (中距离)
        } else {
            opacity = Math.random() * 0.3 + 0.7; // 0.7-1.0 (近处，亮)
        }
        star.style.opacity = opacity.toString();
        
        // 随机颜色变化 (模拟不同类型的星星)
        const colorVariation = Math.random();
        if (colorVariation < 0.1) {
            star.style.backgroundColor = '#ffffcc'; // 淡黄色
        } else if (colorVariation < 0.2) {
            star.style.backgroundColor = '#ccddff'; // 淡蓝色
        } else if (colorVariation < 0.25) {
            star.style.backgroundColor = '#ffccdd'; // 淡粉色
        }
        
        // 随机闪烁延迟
        const twinkleDelay = Math.random() * 5;
        star.style.animationDelay = `${twinkleDelay}s`;
        
        document.body.appendChild(star);
    }
}