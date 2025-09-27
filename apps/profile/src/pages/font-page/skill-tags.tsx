import React, { useEffect, useRef, useState } from "react";
import Matter, { Engine, Render, World, Bodies, Body, Runner } from "matter-js";

export default function SkillTags() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const tags = ["React", "Vue", "Angular", "Node.js", "MongoDB", "MySQL", "Redis", "Docker",
        "Kubernetes", "TypeScript", "TailwindCSS", "Three.js", "JavaScript", "HTML", "CSS", "Git", "GitHub",
        "Docker", "Kubernetes", "TypeScript", "TailwindCSS", "Three.js", "JavaScript", "HTML", "CSS", "Git", "GitHub"];
    const [engine] = useState(() => {
        const engine = Engine.create();
        engine.world.gravity.y = 0.8; // 设置重力
        engine.world.gravity.x = 0; // 水平重力为0
        return engine;
    });
    const renderRef = useRef<any>(null);
    const ballsRef = useRef<any[]>([]);
    const [bodies, setBodies] = useState<any[]>([]);

    useEffect(() => {
        if (!sceneRef.current) return;

        const containerWidth = sceneRef.current.clientWidth || 800;
        const containerHeight = sceneRef.current.clientHeight || 600;

        // 创建渲染器
        const render = Render.create({
            element: sceneRef.current,
            engine,
            options: {
                width: containerWidth,
                height: containerHeight,
                wireframes: false,
                background: "#0a0011",
                showAngleIndicator: false,
                showVelocity: false,
                showCollisions: false,
                showDebug: false,
            },
        });

        renderRef.current = render;

        // 创建边界墙
        const walls = [
            // 地面
            Bodies.rectangle(containerWidth / 2, containerHeight - 10, containerWidth, 20, {
                isStatic: true,
                render: { fillStyle: "#374151" },
            }),
            // 左墙
            Bodies.rectangle(-10, containerHeight / 2, 20, containerHeight, {
                isStatic: true,
                render: { fillStyle: "#374151" },
            }),
            // 右墙
            Bodies.rectangle(containerWidth + 10, containerHeight / 2, 20, containerHeight, {
                isStatic: true,
                render: { fillStyle: "#374151" },
            }),
        ];

        // 创建30个随机小球
        const colors = [
            "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4",
            "#3b82f6", "#8b5cf6", "#ec4899", "#f43f5e", "#84cc16"
        ];

        const renderTags = [];
        for (let i = 0; i < tags.length; i++) {
            const width = Math.random() * 40 + 60; // 60-100px 宽度
            const height = Math.random() * 15 + 25; // 25-40px 高度
            const x = Math.random() * (containerWidth - width) + width / 2; // 避免贴边
            const y = Math.random() * 200 - 100; // 从上方开始，y为负值
            const color = colors[Math.floor(Math.random() * colors.length)];

            const tag = Bodies.rectangle(x, y, width, height, {
                restitution: 0.6 + Math.random() * 0.3, // 0.6-0.9 弹性
                friction: 0.1 + Math.random() * 0.2, // 0.1-0.3 摩擦力
                density: 0.001, // 固定密度
                isStatic: false, // 确保不是静态的
                chamfer: { radius: 8 }, // 圆角
                render: {
                    fillStyle: color,
                    strokeStyle: "#ffffff",
                    lineWidth: 2,
                },
            });

            tag.label = tags[i];
            renderTags.push(tag);
        }

        ballsRef.current = renderTags;

        // 添加到世界
        World.add(engine.world, [...walls, ...renderTags]);

        // 确保引擎设置正确
        engine.enabled = true;
        engine.world.gravity.y = 0.8;
        engine.world.gravity.x = 0;

        // 创建并运行 Runner
        const runner = Runner.create();
        Runner.run(runner, engine);

        // 运行渲染器
        Render.run(render);

        // 立即更新一次文字位置
        // const updateTextPositions = () => {
        //     const bodiesWithLabels = engine.world.bodies.filter(body => body.label);
        //     console.log('Updating text positions, bodies:', bodiesWithLabels.length);
        //     setBodies(bodiesWithLabels);
        // };

        // // 延迟更新，确保引擎已启动
        // setTimeout(updateTextPositions, 100);

        // // 定期更新文字位置
        // const textUpdateInterval = setInterval(updateTextPositions, 16); // 60fps

        // 调试信息
        console.log('Engine enabled:', engine.enabled);
        console.log('Gravity:', engine.world.gravity);
        console.log('Bodies count:', engine.world.bodies.length);
        console.log('Render bodies:', renderTags.length);
        console.log('Walls count:', walls.length);


        return () => {
            // clearInterval(textUpdateInterval);
            Runner.stop(runner);
            Render.stop(render);
            Engine.clear(engine);
            if (render.canvas) {
                render.canvas.remove();
            }
            render.textures = {};
        };
    }, [engine]);

    return (
        <div className="w-full h-full rounded-lg overflow-hidden">
            <div ref={sceneRef} className="w-full h-full" />
        </div>
    );
}
