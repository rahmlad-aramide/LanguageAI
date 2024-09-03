import poster from '@/public/og.png'
export function Video() {
    return (
      <div className="w-[90%] lg:w-[80%] max-w-4xl my-12 mx-auto p-2 sm:p-3 md:p-4 border border-black rounded-xl bg-black/80">
        <div className="flex mx-auto justify-center items-center h-1.5 sm:h-2 md:h-3 w-1.5 sm:w-2 md:w-3 border border-black p-1 sm:p-1.5 md:p-2 rounded-full bg-black/60"><div className="flex rounded-full w-1 border border-gray-600"></div></div>
        <video poster={`${poster}`} className="w-full my-2 mx-auto bg-lightPrimary border border-black" width="1360" height="768" controls preload="metadata">
          <source src="/demo1.mp4" type="video/mp4" />
          <source src="https://res.cloudinary.com/dh4rm7b7b/video/upload/v1725357227/Language-AI/demo1_latmat.mp4" type="video/mp4" />
          <source src="/demo.mp4" type="video/mp4" />
          Your browser does not support the video player.
        </video>
      </div>
    )
  }

