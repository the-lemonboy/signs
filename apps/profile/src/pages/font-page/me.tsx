export default function Me() {
  const avatar = new URL("@/assets/avatar.png", import.meta.url).href;
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-5xl flex justify-center items-center gap-2">
        {/* left */}
        <div className="flex-1">
          <div className="w-full flex items-center space-x-2">
            <h2 className="text-4xl font-bold text-primary text-nowrap">
              关于我
            </h2>
            <div className="w-full h-[1px] bg-primary" />
          </div>
          <div className="mt-4 mb-2">
            <p className="text-primary text-sm">
              hi,
              我是一名前端工程师,喜欢折腾新鲜的技术,我的主要技术栈是React和Vue,
              工作以及平时折腾过低代码、可视化、富文本编辑器等相关技术,目前在深入学习Web音视频相关技术,
            </p>
          </div>
          {/* main tags */}
          <ul className="grid grid-cols-2 space-y-1 text-white">
            <li className="before:content-['▹'] before:mr-1 before:text-green-500">
              TypeScript
            </li>
            <li className="before:content-['▹'] before:mr-1 before:text-green-500">
              React
            </li>
            <li className="before:content-['▹'] before:mr-1 before:text-green-500">
              Vue
            </li>
            <li className="before:content-['▹'] before:mr-1 before:text-green-500">
              WordPress
            </li>
            <li className="before:content-['▹'] before:mr-1 before:text-green-500">
              Node.js
            </li>
          </ul>
        </div>
        {/* right */}
        <div className="grow-0 shrink-0">
          <img src={avatar} alt="avatar" className="w-xs" />
        </div>
      </div>
    </div>
  );
}
