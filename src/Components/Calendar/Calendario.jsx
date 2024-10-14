import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from './Util/calendar';

import cn from "./Util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function Calendario() {
	const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState(currentDate);

	return (
		<div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
			<div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-xl font-semibold">
						{months[today.month()]}, {today.year()}
					</h1>
					<div className="flex gap-4 items-center">
						<GrFormPrevious
							className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
							onClick={() => setToday(today.subtract(1, 'month'))}
						/>
						<h1
							className="text-lg cursor-pointer hover:text-gray-800 transition-colors"
							onClick={() => setToday(currentDate)}
						>
							Hoy
						</h1>
						<GrFormNext
							className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
							onClick={() => setToday(today.add(1, 'month'))}
						/>
					</div>
				</div>
				<div className="grid grid-cols-7 gap-1 mb-4">
					{days.map((day, index) => (
						<h1
							key={index}
							className="text-sm font-medium text-center py-2 px-1 bg-gray-200 rounded-md"
						>
							{day}
						</h1>
					))}
				</div>
				<div className="grid grid-cols-7 gap-1">
					{generateDate(today.month(), today.year()).map(
						({ date, currentMonth, today: isToday }, index) => (
							<div
								key={index}
								className="flex items-center justify-center p-2"
							>
								<button
									className={cn(
										currentMonth ? "text-black" : "text-gray-400",
										isToday ? "bg-red-500 text-white" : "",
										selectDate.toDate().toDateString() ===
										date.toDate().toDateString()
											? "bg-black text-white"
											: "",
										"w-10 h-10 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
									)}
									onClick={() => setSelectDate(date)}
								>
									{date.date()}
								</button>
							</div>
						)
					)}
				</div>
			</div>
			<div className="mt-6 w-full max-w-md bg-white rounded-lg shadow-md p-4">
				<h1 className="text-xl font-semibold mb-2">
					Agenda para {selectDate.toDate().toDateString()}
				</h1>
				<p className="text-gray-500">No hay reuniones para hoy.</p>
			</div>
		</div>
	);
}
