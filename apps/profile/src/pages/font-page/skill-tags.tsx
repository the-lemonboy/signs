import { useEffect, useRef, useState } from "react";
import { Engine, World, Bodies } from "matter-js";

export default function SkillTags() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [engine] = useState(() => {
    const engine = Engine.create();
    engine.world.gravity.y = 0.8; // 设置重力
    engine.world.gravity.x = 0; // 水平重力为0
    return engine;
  });
  const renderRef = useRef<any>(null);
  const ballsRef = useRef<any[]>([]);

  useEffect(() => {
    if (!sceneRef.current) return;

    const tags = [
      "React",
      "Vue",
      "Angular",
      "Node.js",
      "MongoDB",
      "MySQL",
      "Redis",
      "Docker",
      "Kubernetes",
      "TypeScript",
      "TailwindCSS",
      "Three.js",
      "JavaScript",
      "HTML",
      "CSS",
      "Git",
      "GitHub",
      "Docker",
      "Kubernetes",
      "TypeScript",
      "TailwindCSS",
      "Three.js",
      "JavaScript",
      "HTML",
      "CSS",
      "Git",
      "GitHub",
    ];

    const containerWidth = sceneRef.current.clientWidth || 800;
    const containerHeight = sceneRef.current.clientHeight || 600;

    // 创建自定义 Canvas 渲染
    const canvas = document.createElement("canvas");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(containerWidth * dpr);
    canvas.height = Math.floor(containerHeight * dpr);
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    sceneRef.current.appendChild(canvas);
    renderRef.current = {
      canvas,
      context: ctx,
      width: containerWidth,
      height: containerHeight,
    };

    // 创建边界墙
    const walls = [
      // 地面（将顶部与画布底部对齐，避免视觉上悬空 20px）
      Bodies.rectangle(
        containerWidth / 2,
        containerHeight + 10,
        containerWidth,
        20,
        {
          isStatic: true,
          render: { fillStyle: "#374151" },
        }
      ),
      // 左墙
      Bodies.rectangle(-10, containerHeight / 2, 20, containerHeight + 40, {
        isStatic: true,
        render: { fillStyle: "#374151" },
      }),
      // 右墙
      Bodies.rectangle(
        containerWidth + 10,
        containerHeight / 2,
        20,
        containerHeight + 40,
        {
          isStatic: true,
          render: { fillStyle: "#374151" },
        }
      ),
    ];

    // 创建30个随机小球
    const colors = [
      "#ef4444",
      "#f97316",
      "#eab308",
      "#22c55e",
      "#06b6d4",
      "#3b82f6",
      "#8b5cf6",
      "#ec4899",
      "#f43f5e",
      "#84cc16",
    ];

    const renderTags: any[] = [];
    for (let i = 0; i < tags.length; i++) {
      const width = Math.random() * 40 + 60; // 60-100px 宽度
      const height = Math.random() * 15 + 25; // 25-40px 高度
      const x = Math.random() * (containerWidth - width) + width / 2; // 避免贴边
      const y = Math.random() * 200 - 100; // 从上方开始，y为负值
      const color = colors[Math.floor(Math.random() * colors.length)];

      const tag = Bodies.rectangle(x, y, width, height, {
        restitution: 0.3 + Math.random() * 0.1, // 更低反弹，便于贴地
        friction: 0.25 + Math.random() * 0.15, // 更高摩擦，快些停稳
        frictionStatic: 0.5,
        frictionAir: 0.01,
        density: 0.001, // 固定密度
        isStatic: false, // 确保不是静态的
        render: {
          fillStyle: color,
          strokeStyle: "#ffffff",
          lineWidth: 2,
        },
      });

      tag.label = tags[i];
      // 将矩形尺寸存储到实例上，方便渲染文本时自适应
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (tag as any).boxSize = { width, height };
      renderTags.push(tag);
    }

    ballsRef.current = renderTags;

    // 添加到世界
    World.add(engine.world, [...walls, ...renderTags]);

    // 确保引擎设置正确
    engine.enabled = true;
    engine.enableSleeping = true;
    // 使用引擎默认重力设置
    engine.world.gravity.y = 0.8;
    engine.world.gravity.x = 0;

    // 自定义动画循环：更新物理并绘制
    let rafId = 0;
    let lastTime = performance.now();
    let accumulator = 0;
    const FIXED_TIMESTEP = 1000 / 60; // 60Hz 固定步长，避免切后台回来后超大 dt 导致穿透

    const handleVisibility = () => {
      // 切换标签页时重置计时，防止累积的超大 dt 在恢复时一次性消耗
      lastTime = performance.now();
      accumulator = 0;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const drawBodyPolygon = (context: CanvasRenderingContext2D, body: any) => {
      const vertices = (body as any).vertices as Array<{
        x: number;
        y: number;
      }>;
      if (!vertices || vertices.length === 0) return;
      context.beginPath();
      context.moveTo(vertices[0].x, vertices[0].y);
      for (let i = 1; i < vertices.length; i++) {
        const v = vertices[i];
        context.lineTo(v.x, v.y);
      }
      context.closePath();
    };

    const renderFrame = (time: number) => {
      // 将帧间隔时间限制在 100ms 内以避免极端跳变
      const frameTime = Math.min(100, time - lastTime);
      lastTime = time;
      accumulator += frameTime;

      // 使用固定步长进行多次更新，最多迭代一定次数避免卡顿
      let numSteps = 0;
      const MAX_STEPS_PER_FRAME = 5;
      while (accumulator >= FIXED_TIMESTEP && numSteps < MAX_STEPS_PER_FRAME) {
        Engine.update(engine, FIXED_TIMESTEP);
        accumulator -= FIXED_TIMESTEP;
        numSteps++;
      }

      // 清屏背景
      ctx.clearRect(0, 0, containerWidth, containerHeight);
      ctx.fillStyle = "#0a0011";
      ctx.fillRect(0, 0, containerWidth, containerHeight);
      // 画地面边线（用墙体顶点已经能表现接地，可选保留）

      // 先绘制墙体（用其真实顶点）
      for (const wall of walls as any) {
        drawBodyPolygon(ctx, wall);
        ctx.fillStyle = wall.render?.fillStyle || "#374151";
        ctx.fill(); // 不描边，避免与物体描边叠加产生视觉缝
      }

      // 再绘制每个矩形及其文本
      for (const body of renderTags) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const box = (body as any).boxSize as { width: number; height: number };
        const label = (body.label as string) || "";

        // 1) 真实碰撞多边形（世界坐标）
        drawBodyPolygon(ctx, body);
        ctx.fillStyle = (body as any).render?.fillStyle || "#3b82f6";
        ctx.fill();
        ctx.lineJoin = "round";
        ctx.lineWidth = (body as any).render?.lineWidth ?? 2;
        ctx.strokeStyle = (body as any).render?.strokeStyle || "#ffffff";
        ctx.stroke();

        // 2) 文本（局部坐标）
        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const maxFontByHeight = Math.max(10, Math.floor(box.height * 0.6));
        let fontSize = Math.min(24, maxFontByHeight);
        ctx.font = `${fontSize}px Arial`;
        const padding = 10;
        const maxWidth = Math.max(10, box.width - padding * 2);
        let metrics = ctx.measureText(label);
        while (metrics.width > maxWidth && fontSize > 10) {
          fontSize -= 1;
          ctx.font = `${fontSize}px Arial`;
          metrics = ctx.measureText(label);
        }
        ctx.strokeStyle = "rgba(0,0,0,0.6)";
        ctx.lineWidth = 3;
        ctx.strokeText(label, 0, 0);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(label, 0, 0);
        ctx.restore();
      }

      rafId = requestAnimationFrame(renderFrame);
    };

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      Engine.clear(engine);
      if (renderRef.current?.canvas) {
        renderRef.current.canvas.remove();
      }
      renderRef.current = null;
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [engine]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <div ref={sceneRef} className="w-full h-full" />
    </div>
  );
}
