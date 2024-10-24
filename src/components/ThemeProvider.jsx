import { useSelector } from "react-redux";

export const ThemeProvider=({children})=>{
  const themeMode=useSelector(state=>state.theme.mode);

  return (
    <div className={themeMode}>
        <div className="flex flex-col min-h-screen bg-slate-200 text-gray-900 dark:text-darkText dark:bg-[#0f1b27]">
            {children}
        </div>
    </div>
  )
}
