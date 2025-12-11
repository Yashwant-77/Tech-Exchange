// src/components/AlertBar.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "../store/alertSlice";
import { XCircle, CheckCircle, AlertTriangle, Info } from "lucide-react";

export default function Alert() {
  const dispatch = useDispatch();
  const { visible, type, message, duration } = useSelector((s) => s.alert);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => dispatch(hideAlert()), duration ?? 3000);
    return () => clearTimeout(t);
  }, [visible, duration, dispatch]);

  if (!visible) return null;

  const styles = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-400 text-black",
    info: "bg-blue-600",
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
      className={`fixed top-0 left-0 w-full z-50 transform transition-transform duration-300 ${styles[type]}`}
      style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.12)" }}
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-white">
          <div className="opacity-90">{icons[type]}</div>
          <div className="text-sm">{message}</div>
        </div>
        <button
          onClick={() => dispatch(hideAlert())}
          className="text-white text-lg font-bold leading-none"
          aria-label="Close alert"
        >
          ✖
        </button>
      </div>
    </div>
  );
}
