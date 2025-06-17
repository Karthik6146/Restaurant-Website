import React from "react";

const timeSlots = [
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
];

function TimeSlotPicker({ selectedTime, onTimeSelect }) {
  return (
    <select
      value={selectedTime}
      onChange={(e) => onTimeSelect(e.target.value)}
      className="w-full p-2 border rounded"
    >
      <option value="">Select a Time</option>
      {timeSlots.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
}

export default TimeSlotPicker; 