import Iconify from '@component/Iconify'

export default function SmartTableEmpty(){
    return (
      <div className="flex items-center justify-center bg-gray-50 p-20 rounded-lg">
          <div className="bg-slate-500 border border-gray-200 text-white  shadow-md p-6 text-center flex flex-col items-center justify-center gap-2">
              <Iconify type="businessman" width={40} height={40} />
              <p className="text-md">No data available</p>
              <p className="text-xs">I&apos;m just as confused as you are.</p>
          </div>
      </div>
    )
}
