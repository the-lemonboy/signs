import { useEffect, useState } from "react";

export default function Nav() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [scrolledToTop, setScrolledToTop] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolledToTop(y < 10);
      if (Math.abs(y - lastY) < 5) return; // 忽略微小抖动
      setScrollDirection(y > lastY ? "down" : "up");
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHidden = scrollDirection === "down" && !scrolledToTop;
  // const isCondensed = !scrolledToTop;

  return (
    <header
      className={[
        "fixed top-0 z-50 w-full h-18",
        "backdrop-blur", // 模糊背景
        "bg-[rgba(10,25,47,0.85)]",
        "transition-all duration-300 ease-in-out",
        // 高度：顶部时较高，离顶时收缩
        // isCondensed ? "h-20" : "h-20",
        // 平移隐藏：下滚隐藏，上滚展示
        isHidden ? "-translate-y-18" : "translate-y-0",
        // 阴影：离顶时显示阴影
        !scrolledToTop ? "shadow-[0_10px_30px_-10px_rgba(2,12,27,0.7)]" : "",
        // 响应式内边距（接近你的示例 50/40/25）
        "px-[25px] md:px-[40px] xl:px-[50px]",
      ].join(" ")}
    >
      <div className="flex justify-between items-center w-full h-full">
        <div className="text-white text-base">logo</div>
        <ul className="h-full flex justify-center items-center gap-10">
          <li>
            <a href="#about" className="text-white text-base">
              关于我
            </a>
          </li>
          <li>
            <a href="#skills" className="text-white text-base">
              技术标签
            </a>
          </li>
          <li>
            <a href="#projects" className="text-white text-base">
              项目经历
            </a>
          </li>
          <li>
            <a href="#contact" className="text-white text-base">
              联系方式
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
