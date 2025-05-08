import React from "react";

type DiversityIndexGaugeProps = {
    domainDiversity: number;
    maxStudents: number;
    studentCount: number;
};

const DiversityIndexGauge: React.FC<DiversityIndexGaugeProps> = ({
    domainDiversity,
    maxStudents,
    studentCount,
}) => {
    // Función para determinar el color del círculo según el porcentaje
    const getGaugeColor = () => {
        if (domainDiversity < 50) return "#f87171"; // Rojo para menor al 50%
        if (domainDiversity < 75) return "#fbbf24"; // Amarillo para entre 50% y 75%
        return "#34d399"; // Verde para mayor o igual al 75%
    };

    // Cálculo para el porcentaje de llenado del círculo
    const strokeDasharray = `${(domainDiversity / 100) * 440} 440`; // 440 es el perímetro del círculo con radio 70

    return (
        <div className="relative flex flex-col items-center justify-center">
            {/* Círculo de fondo */}
            <svg width="150" height="150" className="transform rotate-90">
                <circle
                    cx="75"
                    cy="75"
                    r="70"
                    stroke="lightgray"
                    strokeWidth="10"
                    fill="none"
                />
                {/* Círculo que se llena según el índice de diversidad */}
                <circle
                    cx="75"
                    cy="75"
                    r="70"
                    stroke={getGaugeColor()} // Aplicar color dinámico
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    style={{ transition: "stroke-dasharray 0.5s ease" }} // Agregar transición para animación suave
                />
            </svg>

            {/* Texto central que muestra el porcentaje */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-semibold text-gray-800">
                    {domainDiversity}%
                </span>
            </div>

            {/* Tooltip con detalle de dominios únicos y total de estudiantes */}
            <div className="absolute bottom-[-30px] mt-2 text-sm text-gray-500">
                <div className="group relative inline-block">
                    <span className="underline">Ver detalle</span>
                    <div className="group-hover:block hidden absolute bottom-full mb-2 p-2 bg-gray-800 text-white text-xs rounded-md">
                        <p>{`Máx. estudiantes: ${maxStudents}`}</p>
                        <p>{`Estudiantes totales: ${studentCount}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiversityIndexGauge;
