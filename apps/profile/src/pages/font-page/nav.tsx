

export default function Nav() {
    return (
        <div className="flex justify-between items-center w-full h-16 px-10">
            <div className="text-white text-lg">logo</div>
           <ul className="h-full flex justify-center items-center gap-10">
            <li>
                <a href="#" className="text-white text-lg">关于我</a>
            </li>
            <li>
               <a href="#" className="text-white text-lg">技术标签</a>
            </li>
            <li>
                <a href="#" className="text-white text-lg">项目经历</a>
            </li>
            <li>
                <a href="#" className="text-white text-lg">联系方式</a>
            </li>
           </ul>
        </div>
    )
}