export default function Project() {
  return (
    <div className="w-5xl mx-auto flex flex-col justify-center items-center gap-4">
      <div className="w-full flex items-center space-x-2">
        <h2 className="text-2xl font-bold text-white text-nowrap">我的项目</h2>
        <div className="w-xl h-[1px] bg-primary" />
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-10">
        {/* project1 */}
        <div className="w-full font-bold text-white grid grid-cols-12 items-center">
          <div className="w-xl aspect-video rounded-md bg-gray-800 place-items-start" />
          <div className="col-span-6 col-start-7">
            <h4 className="text-nowrap mb-2">项目名称</h4>
            <p className="text-sm text-gray-400 mb-2">time</p>
            <div className="p-2 bg-gray-700 mb-2">
              <p>项目描述...</p>
            </div>
            <ul className="flex space-x-2 text-sm text-gray-400">
              <li>Vue2</li>
              <li>Element-UI</li>
              <li>vue Drag</li>
            </ul>
          </div>
        </div>
        {/* project2 */}
        <div className="w-full font-bold text-white grid grid-cols-12 items-center">
          <div className="w-xl aspect-video rounded-md bg-gray-800  col-start-6 row-start-1" />
          <div className="col-span-6 col-start-1 row-start-1">
            <h4 className="text-nowrap mb-2">项目名称</h4>
            <p className="text-sm text-gray-400 mb-2">time</p>
            <div className="p-2 bg-gray-700 mb-2">
              <p>项目描述...</p>
            </div>
            <ul className="flex space-x-2 text-sm text-gray-400">
              <li>Vue2</li>
              <li>Element-UI</li>
              <li>vue Drag</li>
            </ul>
          </div>
        </div>
        {/* project3 */}
        <div className="w-full font-bold text-white grid grid-cols-12 items-center">
          <div className="w-xl aspect-video rounded-md bg-gray-800 place-items-start" />
          <div className="col-span-6 col-start-7 mb-4">
            <h4 className="text-nowrap mb-2">项目名称</h4>
            <p className="text-sm text-gray-400 mb-2">time</p>
            <div className="p-2 bg-gray-700 mb-2">
              <p>
                项目描述...项目2222222222222222222222222222222222222222222阿斯顿发送到发送地方啊时代峰啊时代峰啊时代峰安德森发水淀粉啊到发送
              </p>
            </div>
            <ul className="flex space-x-2 text-sm text-gray-400">
              <li>Vue2</li>
              <li>Element-UI</li>
              <li>vue Drag</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
