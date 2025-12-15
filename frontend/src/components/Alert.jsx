import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import { hideAlert } from "../store/alertSlice";



export default function Alert() {
  const dispatch = useDispatch();
  const { visible, type, message, duration } = useSelector((s) => s.alert);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => dispatch(hideAlert()), duration ?? 3000);
    return () => clearTimeout(t);
  }, [visible, duration, dispatch]);

  const styles = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-400 text-black",
    info: "bg-blue-400 text-black",
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  return (
    <div
      aria-live="assertive"
      className={`
        fixed left-0  w-full z-40
        top-20
        transform transition-all duration-300 ease-out
        ${visible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}
        ${styles[type]}
      `}
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-center gap-4">
        <div className="flex justify-center items-center gap-3 text-white">
          {icons[type]}
          <span className="text-sm">{message}</span>
        </div>
        <button
          onClick={() => dispatch(hideAlert())}
          className="text-white text-lg font-bold"
        >
          ✖
        </button>
      </div>
    </div>
  );
}


