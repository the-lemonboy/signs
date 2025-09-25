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


export { generateEnhancedStars };