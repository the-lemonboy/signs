import LightRays from '@/components/light-rays.tsx';

export default function Me() {
    return (
        <div className="w-full h-[800px] relative pt-30">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#00ffff"
                    raysSpeed={1.5}
                    lightSpread={0.8}
                    rayLength={1.2}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.1}
                    distortion={0.05}
                    className="custom-rays"
                />
            </div>
            <div className="w-full h-full flex flex-col justify-start items-center text-white">
                <h2>你好啊, 我是一名前端工程师</h2>
                <p>我是一名前端工程师, 我擅长React, Vue, Angular, Node.js, MongoDB, MySQL, Redis, Docker, Kubernetes, etc.</p>
                <p>我是一名前端工程师, 我擅长React, Vue, Angular, Node.js, MongoDB, MySQL, Redis, Docker, Kubernetes, etc.</p>
                <p>我是一名前端工程师, 我擅长React, Vue, Angular, Node.js, MongoDB, MySQL, Redis, Docker, Kubernetes, etc.</p>
                <p>我是一名前端工程师, 我擅长React, Vue, Angular, Node.js, MongoDB, MySQL, Redis, Docker, Kubernetes, etc.</p>
            </div>
        </div>
    )
}