"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useShiftSchedule } from "../../../hooks/useShiftSchedule";
import { useUser } from "../../../hooks/useUser";
import { useShift } from "../../../hooks/useShift";

const mockShifts = [
  { id: 1, name: "Ca sáng", start: "08:00", end: "12:00", maxSlot: 2 },
  { id: 2, name: "Ca chiều", start: "13:00", end: "18:00", maxSlot: 2 },
];

const mockSchedules = [
  {
    shiftId: 1,
    workDate: "2026-04-20",
    bookSlot: 2,
    users: [
      { id: 1, fullName: "Nguyễn Văn A" },
      { id: 2, fullName: "Trần Thị B" },
    ],
  },
  {
    shiftId: 2,
    workDate: "2026-04-20",
    bookSlot: 1,
    users: [{ id: 1, fullName: "Nguyễn Văn A" }],
  },
];

const mockUsers = [
  { id: 1, fullName: "Nguyễn Văn A" },
  { id: 2, fullName: "Trần Thị B" },
  { id: 3, fullName: "Lê Văn C" },
];

export default function ShiftScheduleCalendar() {
  const [currentWeek, setCurrentWeek] = useState(dayjs());
  const [openModal, setOpenModal] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const { createShiftSchedule, fetchAllShiftSchedule } = useShiftSchedule();
  const {fectAllShifts} = useShift();
  const { fectAllUsers } = useUser();
  const [users, setUsers] = useState([]);

  const startOfWeek = currentWeek.startOf("week").add(1, "day");

  useEffect(() => {
    const fetchData = async () => {
      const resUser = await fectAllUsers();
      const resShift = await fectAllShifts();

      setUsers(resUser);
      setShifts(resShift);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const startWeek = startOfWeek.format("YYYY-MM-DD");
      const endWeek = startOfWeek.add(6, "day").format("YYYY-MM-DD");

      const res = await fetchAllShiftSchedule({
        workDateBefore: startWeek,
        workDateAfter: endWeek,
      });
      console.log("DATA shift schedule :", res);

      const resUser = await fectAllUsers();

      setSchedules(res);
      setUsers(resUser);
    };

    fetchData();
  }, [currentWeek]);

  const days = Array.from({ length: 7 }).map((_, i) =>
    startOfWeek.add(i, "day"),
  );

  const getSchedule = (shiftId, date) => {
    return schedules.find(
      (s) => s.shiftId === shiftId && s.workDate === date.format("YYYY-MM-DD"),
    );
  };

  const getSelectedShift = () => {
    return mockShifts.find((s) => s.id === selectedCell?.shiftId);
  };

  const getCurrentSchedule = () => {
    return schedules.find(
      (s) =>
        s.shiftId === selectedCell?.shiftId &&
        s.workDate === selectedCell?.workDate,
    );
  };

  const handleSubmit = async () => {
    if (selectedUsers.length === 0) {
      alert("Chọn ít nhất 1 nhân viên");
      return;
    }

    const payload = {
      shiftId: selectedCell.shiftId,
      workDate: selectedCell.workDate,
      userIds: selectedUsers,
    };

    console.log("🚀 Payload gửi backend:", payload);

    // 👉 gọi API ở đây
    await createShiftSchedule(payload);

    // --- mock update UI ---
    const newUsers = users.filter((u) => selectedUsers.includes(u.id));

    let updatedSchedules = [...schedules];

    const index = updatedSchedules.findIndex(
      (s) =>
        s.shiftId === selectedCell.shiftId &&
        s.workDate === selectedCell.workDate,
    );

    if (index !== -1) {
      updatedSchedules[index] = {
        ...updatedSchedules[index],
        users: [...updatedSchedules[index].users, ...newUsers],
      };
    } else {
      updatedSchedules.push({
        shiftId: selectedCell.shiftId,
        workDate: selectedCell.workDate,
        users: newUsers,
      });
    }

    setSchedules(updatedSchedules);

    setSelectedUsers([]);
    setSelectedUser("");
    setOpenModal(false);
  };

  const handleRemoveUser = (userId) => {
    const confirmDelete = confirm("Xoá nhân viên khỏi ca này?");
    if (!confirmDelete) return;

    const payload = {
      userId,
      shiftId: selectedCell.shiftId,
      workDate: selectedCell.workDate,
    };

    console.log("🗑️ Remove:", payload);

    // await createShiftSchedule()

    // 🔥 mock update UI
    let updatedSchedules = [...schedules];

    const index = updatedSchedules.findIndex(
      (s) =>
        s.shiftId === selectedCell.shiftId &&
        s.workDate === selectedCell.workDate,
    );

    if (index !== -1) {
      updatedSchedules[index].users = updatedSchedules[index].users.filter(
        (u) => u.id !== userId,
      );
    }

    setSchedules(updatedSchedules);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f5] flex">
      <Sidebar />

      <div className="flex-1 flex justify-center">
        <div className="w-full bg-white rounded-2xl shadow-lg">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h1 className="text-lg font-bold text-[#038a42]">
              Lịch ca (Calendar)
            </h1>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentWeek(currentWeek.subtract(1, "week"))}
                className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                ◀
              </button>

              <input
                type="date"
                value={currentWeek.format("YYYY-MM-DD")}
                onChange={(e) => setCurrentWeek(dayjs(e.target.value))}
                className="border px-3 py-1 rounded-lg text-sm focus:ring-2 focus:ring-[#038a42]"
              />

              <button
                onClick={() => setCurrentWeek(currentWeek.add(1, "week"))}
                className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                ▶
              </button>
            </div>
          </div>

          {/* Days */}
          <div className="grid grid-cols-8 border-b bg-gray-50">
            <div></div>
            {days.map((d) => (
              <div key={d} className="p-2 text-center text-sm font-medium">
                {d.format("dd")}
                <div className="text-xs text-gray-400">{d.format("DD/MM")}</div>
              </div>
            ))}
          </div>

          {/* Body */}
          {shifts.map((shift) => (
            <div key={shift.id} className="grid grid-cols-8 border-b">
              {/* Shift */}
              <div className="p-2 border-r text-sm bg-gray-50">
                <div className="font-semibold">{shift.name}</div>
                <div className="text-xs text-gray-400">
                  {shift.startTime} - {shift.endTime}
                </div>
              </div>

              {days.map((d) => {
                const schedule = getSchedule(shift.id, d);
                const booked = schedule?.users?.length || 0;
                const isFull = booked >= shift.maxSlot;

                return (
                  <div
                    key={d}
                    className="relative p-2 border-r h-[80px] flex items-center justify-center cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      // if (isFull) return;
                      setSelectedCell({
                        shiftId: shift.id,
                        workDate: d.format("YYYY-MM-DD"),
                      });
                      setOpenModal(true);
                    }}
                  >
                    {schedule ? (
                      <div className="relative group">
                        {/* Slot */}
                        <div
                          className={`
                            text-xs px-2 py-1 rounded-lg
                            ${
                              isFull
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-[#038a42]"
                            }
                          `}
                        >
                          {isFull ? "FULL" : `${booked}/${shift.maxSlot}`}
                        </div>

                        {/* Tooltip */}
                        {schedule.users?.length > 0 && (
                          <div
                            className="
                              absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                              hidden group-hover:block
                              bg-black text-white text-xs
                              px-3 py-2 rounded-lg shadow-lg
                              z-50 min-w-[120px]
                            "
                          >
                            {schedule.users.map((u) => (
                              <div key={u.id}>{u.fullName}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-300 text-xs">+</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="bg-white w-[380px] rounded-2xl p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-bold text-lg text-[#038a42] mb-2">
              Đăng ký ca
            </h2>

            <p className="text-sm text-gray-500 mb-3">
              Ngày: {selectedCell?.workDate}
            </p>

            {(() => {
              const selectedShift = shifts.find(
                (s) => s.id === selectedCell?.shiftId,
              );

              const schedule = schedules.find(
                (s) =>
                  s.shiftId === selectedCell?.shiftId &&
                  s.workDate === selectedCell?.workDate,
              );

              const booked = schedule?.users?.length || 0;
              const remainingSlot = selectedShift.maxSlot - booked;
              const bookedUserIds = schedule?.users?.map((u) => u.id) || [];

              return (
                <>
                  {/* SLOT INFO */}
                  <div className="mb-3 text-xs text-gray-400">
                    Còn <b>{remainingSlot}</b> / {selectedShift.maxSlot} slot
                  </div>

                  {/* 👥 ĐÃ ĐĂNG KÝ */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-1">Đã đăng ký:</p>

                    <div className="flex flex-wrap gap-2">
                      {schedule?.users?.length > 0 ? (
                        schedule.users.map((u) => (
                          <div
                            key={u.id}
                            className="flex items-center gap-1 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                          >
                            {u.fullName}

                            {/* ❌ REMOVE */}
                            <button
                              onClick={() => handleRemoveUser(u.id)}
                              className="ml-1 text-xs hover:text-red-500"
                            >
                              ✕
                            </button>
                          </div>
                        ))
                      ) : (
                        <span className="text-xs text-gray-300">
                          Chưa có ai
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 🟢 ĐANG CHỌN */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-1">Đang chọn:</p>

                    <div className="flex flex-wrap gap-2 min-h-[30px]">
                      {selectedUsers.length > 0 ? (
                        selectedUsers.map((id) => {
                          const user = users.find((u) => u.id === id);

                          return (
                            <div
                              key={id}
                              className="flex items-center gap-1 bg-green-100 text-[#038a42] px-2 py-1 rounded-full text-sm"
                            >
                              {user?.fullName}

                              <button
                                onClick={() =>
                                  setSelectedUsers((prev) =>
                                    prev.filter((u) => u !== id),
                                  )
                                }
                                className="ml-1 text-xs hover:text-red-500"
                              >
                                ✕
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <span className="text-xs text-gray-300">
                          Chưa chọn ai
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 🔽 SELECT */}
                  <select
                    disabled={remainingSlot === 0}
                    className="w-full border rounded-xl px-3 py-2 mb-4 focus:ring-2 focus:ring-[#038a42]"
                    value={selectedUser}
                    onChange={(e) => {
                      const userId = Number(e.target.value);
                      if (!userId) return;

                      if (bookedUserIds.includes(userId)) {
                        alert("User đã đăng ký ca này");
                        return;
                      }

                      if (selectedUsers.includes(userId)) {
                        alert("User đã được chọn");
                        return;
                      }

                      if (selectedUsers.length >= remainingSlot) {
                        alert(`Chỉ còn ${remainingSlot} slot`);
                        return;
                      }

                      setSelectedUsers([...selectedUsers, userId]);
                      setSelectedUser("");
                    }}
                  >
                    <option value="">-- Chọn nhân viên --</option>

                    {users
                      .filter(
                        (u) =>
                          !bookedUserIds.includes(u.id) &&
                          !selectedUsers.includes(u.id),
                      )
                      .map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.fullName}
                        </option>
                      ))}
                  </select>

                  {/* 🔘 ACTION */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedUsers([]);
                        setSelectedUser("");
                      }}
                      className="flex-1 border border-gray-300 py-2 rounded-xl hover:bg-gray-50"
                    >
                      Chọn lại
                    </button>

                    <button
                      onClick={handleSubmit}
                      className="flex-1 bg-[#038a42] text-white py-2 rounded-xl hover:bg-green-700"
                    >
                      Xác nhận
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
