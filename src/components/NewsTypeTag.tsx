import React from "react";

interface NewsTypeTagProps {
  type: string;
}

const NewsTypeTag: React.FC<NewsTypeTagProps> = ({ type }) => {
  // Configuración de estilos para cada tipo de noticia
  const getTypeStyles = (
    newsType: string
  ): {
    bg: string;
    text: string;
    border: string;
    shadow: string;
    icon: string;
  } => {
    const normalizedType = newsType.toLowerCase();

    switch (normalizedType) {
      case "urgente":
        return {
          bg: "bg-gradient-to-r from-red-500 to-red-600",
          text: "text-white",
          border: "border-red-400",
          shadow: "shadow-red-500/25",
          icon: "🚨",
        };
      case "perdido":
        return {
          bg: "bg-gradient-to-r from-amber-500 to-orange-500",
          text: "text-white",
          border: "border-amber-400",
          shadow: "shadow-amber-500/25",
          icon: "🔍",
        };
      case "encontrado":
        return {
          bg: "bg-gradient-to-r from-green-500 to-emerald-500",
          text: "text-white",
          border: "border-green-400",
          shadow: "shadow-green-500/25",
          icon: "✅",
        };
      case "adopción":
        return {
          bg: "bg-gradient-to-r from-purple-500 to-pink-500",
          text: "text-white",
          border: "border-purple-400",
          shadow: "shadow-purple-500/25",
          icon: "💜",
        };
      case "evento":
        return {
          bg: "bg-gradient-to-r from-blue-500 to-cyan-500",
          text: "text-white",
          border: "border-blue-400",
          shadow: "shadow-blue-500/25",
          icon: "📅",
        };
      case "salud":
        return {
          bg: "bg-gradient-to-r from-teal-500 to-green-500",
          text: "text-white",
          border: "border-teal-400",
          shadow: "shadow-teal-500/25",
          icon: "🏥",
        };
      case "noticia":
      default:
        return {
          bg: "bg-gradient-to-r from-gray-600 to-gray-700",
          text: "text-white",
          border: "border-gray-500",
          shadow: "shadow-gray-500/25",
          icon: "📰",
        };
    }
  };

  const styles = getTypeStyles(type);

  return (
    <div
      className={`
      inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
      ${styles.bg} ${styles.text} ${styles.border} border
      shadow-lg ${styles.shadow}
      backdrop-blur-sm
      transform transition-all duration-200 hover:scale-105
      animate-pulse-subtle
      rotate-12
    `}
    >
      <span className="text-sm" role="img" aria-label={`Icono ${type}`}>
        {styles.icon}
      </span>
      <span className="uppercase tracking-wide">{type}</span>
    </div>
  );
};

export default NewsTypeTag;
